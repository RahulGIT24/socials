"use client";

import { postImage } from "@/helpers/cloudinary";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import LoadingBar from "react-top-loading-bar";

const CreatePost = () => {
  const router = useRouter();
  const [count, setCount] = useState<number>(0);
  const [disabled, setDisabled] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [imageSrc, setImageSrc] = useState<any>(null);
  const [uploadData, setUploadData] = useState<any>(null);
  const [file, setFile]: any = useState(null);
  const [desc, setDesc] = useState<string>("");
  const [hashtags, setHashtags] = useState<string[]>([]);

  function handleOnChange(changeEvent: any) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target?.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
    setFile(changeEvent.currentTarget);
  }

  const uploadImage = async () => {
    try {
      if (file === null) {
        return;
      }
      const Imagelink = await postImage(file);
      return Imagelink;
    } catch (e) {
      toast.error("Image can't be uploaded. Try Again");
      return;
    }
  };

  const handleSubmit = async () => {
    if (desc == "" && !imageSrc && !uploadData) {
      toast.error("Gave atleast pic or description of post");
      return;
    }
    if (desc.length > 300) {
      toast.error("Caption length is limited to 300 words only!");
      return;
    }
    try {
      setDisabled(true);
      setProgress(30);
      const link = await uploadImage();
      setProgress(70);
      const res = await axios.post("/api/posts/create", {
        desc: desc,
        pic: link,
      });
      setDesc("");
      setCount(0);
      setImageSrc(null);
      setUploadData(null);
      setFile(null);
      toast.success(res.data.message);
      setHashtags([]);
      router.push(`/`);
      return;
    } catch (e: any) {
      console.log(e);
      toast.error(e.response.data.error);
      return;
    } finally {
      setProgress(100);
      setDisabled(false);
    }
  };

  const handledescChange = (
    changeEvent: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const inputValue = changeEvent.target.value;
    setDesc(inputValue);
    setCount(inputValue.length);

    const hashtagMatches = inputValue.match(/#\w+/g);

    const spacedHashtags = hashtagMatches?.map((tag) => tag + " ") || [];
    setHashtags(spacedHashtags);
  };

  return (
    <>
      <LoadingBar
        color="blue"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="w-full flex justify-center">
        <div className="lg:w-2/3 md:w-3/4 sm:w-11/12 xs:w-full flex justify-center items-center flex-col mt-10">
          <div className="heading w-full mb-6 md:mb-8">
            <h1 className="text-left text-4xl md:text-5xl font-bold font-serif">
              Create a new Post
            </h1>
          </div>
          <div className="px-12">
            <textarea
              required
              name="post"
              id="post"
              cols={80}
              rows={5}
              onChange={handledescChange}
              value={desc}
              placeholder="Caption"
              className="text-white bg-transparent border border-gray-700 rounded-xl px-5 pt-4 font-mono text-xl outline-none w-full"
            />
            <div className="hashtags mt-2 px-12 h-2">
              {hashtags.map((tag, index) => (
                <span key={index} className="text-blue-500">
                  {tag}
                </span>
              ))}
            </div>
            <div className="count">
              <p className={`${count > 300 && "text-red-500"}`}>{count}</p>
            </div>
          </div>
          <div className="functions w-full mb-6 px-12 mt-12">
            <form method="post" onChange={handleOnChange}>
              <label
                htmlFor="file-input"
                className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                <FontAwesomeIcon icon={faImage} />
              </label>
              <input
                id="file-input"
                accept="image/"
                type="file"
                className="hidden"
                name="file"
              />
            </form>
          </div>
          {imageSrc && !uploadData && (
            <Image
              priority
              className="rounded-xl my-12 px-12"
              alt="profile-image"
              src={imageSrc}
              width={600}
              height={100}
            />
          )}
          <div className="button w-full px-12 mt-5">
            <button
              className="bg-white border text-black px-8 md:px-12 py-2.5 rounded-full hover:bg-black hover:text-white hover:border hover:transition-transform hover:transform hover:scale-110 duration-300 ease-in-out mb-8 md:mb-28"
              disabled={disabled}
              onClick={handleSubmit}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
