"use client";
import { postImage } from "@/helpers/cloudinary";
import { upload } from "@/helpers/upload";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LoadingBar from "react-top-loading-bar";

const EditProfile = () => {
  const [imageSrc, setImageSrc] = useState<any>(null);
  const [uploadData, setUploadData] = useState<any>(null);
  const [disabled, setDisabled] = useState(true);
  const [progress, setProgress] = useState<number>(0);
  const [userInfo, setUserInfo] = useState<{
    name: string;
    email: string;
    dateofbirth: string;
    weblink: string;
    bio: string;
    profilepic: string;
    userName: string;
    backgroundImage: string;
    gender: string;
    location: string;
  }>({
    name: "",
    email: "",
    dateofbirth: "",
    weblink: "",
    bio: "",
    profilepic:
      "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
    userName: "",
    backgroundImage: "",
    gender: "",
    location: "",
  });

  const fetchUser = async () => {
    try {
      const res = await axios.post("/api/users/fetch/profile", {
        userName: "",
      });
      const data = res.data.user;
      setUserInfo({
        name: data.name,
        userName: data.userName,
        email: data.email,
        profilepic: data.profilePic,
        backgroundImage: data.backgroundImage,
        dateofbirth: data.dateOfBirth,
        gender: data.gender,
        weblink: data.webLink,
        location: data.location,
        bio: data.bio,
      });
      return;
    } catch (e) {
      toast.error("Error occured");
      return;
    }
  };

  const handleOnChange = async (changeEvent: any) => {
    try {
      const reader = new FileReader();
      reader.onload = function (onLoadEvent) {
        setImageSrc(onLoadEvent.target?.result);
        setUploadData(undefined);
      };
      reader.readAsDataURL(changeEvent.target.files[0]);
      await upload({
        event: changeEvent,
        setDisabled,
        setProgress,
        postImage,
        setUploadData,
        setImageSrc,
      });
      await fetchUser();
      toast.success("Image Updated Successfully!");
    } catch (e) {
      console.log(e);
      return;
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Destructuring
  const {
    name,
    email,
    dateofbirth,
    weblink,
    bio,
    profilepic,
    userName,
    backgroundImage,
    gender,
    location,
  } = userInfo;

  return (
    <>
      <LoadingBar
        color="blue"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <section>
        <h1 className="text-center py-12 text-4xl font-medium">
          Edit Your Profile
        </h1>

        <div className="flex justify-center items-center mb-5 flex-col">
          <Image
            alt="profilepic"
            className="rounded-full mb-5"
            src={profilepic}
            width={200}
            height={300}
          />
        </div>

        <div className="flex justify-evenly mb-6 w-full items-center">
          <form method="post" onChange={handleOnChange}>
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
          </form>
        </div>

        <form className="max-w-sm mx-auto ">
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Name*
            </label>
            <input
              type="name"
              id="name"
              className="bg-transparent border text-white border-white  text-sm rounded-lg block w-full p-2.5 outline-none"
              required
              defaultValue={name}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="bio"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Bio
            </label>
            <textarea
              rows={6}
              id="bio"
              className="bg-transparent border text-white border-white  text-sm rounded-lg block w-full p-2.5 outline-none"
              required
              defaultValue={bio}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Username*
            </label>
            <input
              type="text"
              id="link"
              className="bg-transparent border text-white border-white  text-sm rounded-lg block w-full p-2.5 outline-none"
              required
              defaultValue={userName}
              disabled
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="link"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Website Link*
            </label>
            <input
              type="text"
              id="link"
              className="bg-transparent border text-blue-800 border-white  text-sm rounded-lg block w-full p-2.5 outline-none"
              required
              defaultValue={weblink}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="gender-entry">Update Your Gender*</label>
            <div className="flex items-center justify-center mb-4 mt-3">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                className="hidden"
                checked={gender === "male"}
                onChange={(e: any) => {
                  setUserInfo({
                    ...userInfo,
                    gender: e.target.value,
                  });
                }}
              />
              <label
                htmlFor="male"
                className={`cursor-pointer flex items-center justify-center h-10 w-10 border border-gray-400 rounded-full mr-2 ${
                  gender === "male" && "bg-white text-black"
                }`}
              >
                <span className="text-xl">&#9794;</span>
              </label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                className="hidden"
                checked={gender === "female"}
                onChange={(e: any) => {
                  setUserInfo({
                    ...userInfo,
                    gender: e.target.value,
                  });
                }}
              />
              <label
                htmlFor="female"
                className={`cursor-pointer flex items-center justify-center h-10 w-10 border border-gray-400 rounded-full mr-2 ${
                  gender === "female" && "bg-white text-black"
                }`}
              >
                <span className="text-xl">&#9792;</span>
              </label>
              <input
                type="radio"
                id="other"
                name="gender"
                value="other"
                className="hidden"
                checked={gender === "other"}
                onChange={(e: any) => {
                  setUserInfo({
                    ...userInfo,
                    gender: e.target.value,
                  });
                }}
              />
              <label
                htmlFor="other"
                className={`cursor-pointer flex items-center justify-center h-10 w-10 border border-gray-400 rounded-full mr-2 ${
                  gender === "other" && "bg-white text-black"
                }`}
              >
                <span className="text-xl">&#9893;</span>
              </label>
            </div>
            <div className="mb-6 flex justify-center items-center">
              <label htmlFor="male" className="text-sm m-2">
                Male
              </label>
              <label htmlFor="female" className="text-sm m-2">
                Female
              </label>
              <label htmlFor="other" className="text-sm m-2">
                Others
              </label>
            </div>
          </div>
          <div className="mb-5">
            <label
              htmlFor="location"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Location
            </label>
            <input
              type="text"
              id="location"
              className="bg-transparent border text-white border-white  text-sm rounded-lg block w-full p-2.5 outline-none"
              required
              defaultValue={location}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="dob"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Date of Birth (yyyy/mm/dd)
            </label>
            <input
              type="text"
              id="link"
              className="bg-transparent border text border-white  text-sm rounded-lg block w-full p-2.5 outline-none"
              required
              defaultValue={dateofbirth}
              disabled
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Email
            </label>
            <input
              type="text"
              id="email"
              className="bg-transparent border text-white border-white  text-sm rounded-lg block w-full p-2.5 outline-none"
              required
              defaultValue={email}
              disabled
            />
          </div>
          <div className="flex justify-center items-center mt-11">
            <button className="bg-white border text-black px-12 py-2.5 rounded-full hover:bg-black hover:text-white hover:border hover:transition-transform hover:transform hover:scale-110 duration-300 ease-in-out mb-72">
              Update Profile
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditProfile;
