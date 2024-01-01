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
  const [post, setPost] = useState<{
    desc: string;
    tags: string;
  }>({
    desc: "",
    tags: "",
  });
  const { desc, tags } = post;

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
    if (desc.length > 200) {
      toast.error("Caption length is limited to 200 words only!");
      return;
    }
    // if(tags.length )
    try {
      setDisabled(true);
      setProgress(30);
      const link = await uploadImage();
      setProgress(70);
      const res = await axios.post("/api/posts/create", {
        desc: desc,
        tags: tags,
        pic: link,
      });
      toast.success(res.data.message);
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
              onChange={(e) => {
                setPost({
                  ...post,
                  desc: e.target.value,
                });
                setCount(e.target.value.length);
              }}
              placeholder="Caption"
              className="text-white bg-transparent border border-gray-700 rounded-xl px-5 pt-4 font-mono text-xl outline-none w-full"
            ></textarea>
            <div className="count">
              <p className={`${count > 200 && "text-red-500"}`}>{count}</p>
            </div>
          </div>
          <div className="tags px-12 mt-3">
            <textarea
              name="tags"
              id="tag-input"
              cols={92}
              rows={2}
              placeholder="Tags for your post (#)"
              onChange={(e) => {
                setPost({
                  ...post,
                  tags: e.target.value,
                });
              }}
              className="text-gray-300 bg-transparent border border-gray-700 rounded-xl px-5 pt-2 mt-4 mb-7 italic outline-none w-full"
            ></textarea>
          </div>
          <div className="functions w-full mb-6 px-12">
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
