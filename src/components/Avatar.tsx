"use client";

import { postImage } from "@/helpers/cloudinary";
import { upload } from "@/helpers/upload";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import LoadingBar from "react-top-loading-bar";

type ChildProps = {
  setProfilePic: React.Dispatch<React.SetStateAction<Boolean>>;
};

const Avatar = ({ setProfilePic }: ChildProps) => {
  const [disabled, setDisabled] = useState(true);
  const [progress, setProgress] = useState<number>(0);
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState<any>(null);
  const [uploadData, setUploadData] = useState<any>(null);

  function handleOnChange(changeEvent: any) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target?.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  async function handleOnSubmit(event: any) {
    try {
      await upload({
        event,
        setDisabled,
        setProgress,
        postImage,
        setUploadData,
        setImageSrc,
      });
      setProfilePic(false);
      toast.success("Profile Pic set successfully!");
      router.push("/");
      return;
    } catch (e) {
      toast.error("Internal server error");
      return;
    }
  }

  const handleSkip = () => {
    router.push("/");
    setProfilePic(false);
  };

  return (
    <>
      <LoadingBar
        color="blue"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <section>
        <main className="flex justify-center items-center flex-col">
          <Image
            priority
            className="rounded-full my-12"
            alt="profile-image"
            src={
              imageSrc
                ? imageSrc
                : "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
            }
            width={200}
            height={10}
          />
          <p className="text-2xl font-semibold mb-6">
            Upload Your Profile Picture
          </p>
          <div className="flex justify-evenly mb-6 w-full items-center">
            <form
              method="post"
              onChange={handleOnChange}
              onSubmit={handleOnSubmit}
            >
              <label
                htmlFor="file-input"
                className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Upload Picture
              </label>
              <input
                id="file-input"
                accept="image/"
                type="file"
                className="hidden"
                name="file"
              />

              {imageSrc && !uploadData && (
                <button className="rounded-3xl border border-black bg-white text-black py-3 font-semibold hover:bg-black hover:text-white hover:transition-all duration-200 ease-in-out hover:scale-95 px-12 hover:border-white">
                  Set Profile Pic
                </button>
              )}
            </form>
          </div>
          <div className="flex justify-center mb-6 w-96 items-center">
            <button
              className="rounded-3xl border border-white py-3 font-semibold hover:bg-white hover:text-black hover:transition-all duration-200 ease-in-out hover:scale-95 px-16"
              onClick={handleSkip}
              disabled={disabled}
            >
              Skip
            </button>
          </div>
        </main>
        <p className="text-center mt-24">
          <b>TIP - </b> Please crop your image to square for good experience
        </p>
      </section>
    </>
  );
};

export default Avatar;
