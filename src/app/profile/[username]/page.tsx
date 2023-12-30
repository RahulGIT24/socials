"use client";

import Spinner from "@/components/Spinner";
import { isSameUser } from "@/helpers/sameuser";
import {
  faCalendarDays,
  faLink,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Profile = ({ params }: any) => {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const userName = params.username;
  const [button, setButton] = useState<string>("Sign in");
  const [user, setUser] = useState<{
    id: string;
    backgroundImage: string;
    name: string;
    username: string;
    profilePic: string;
    bio: string;
    followers: any;
    following: any;
    joined: string;
    location: string;
    webLink: string;
  }>({
    id: "",
    backgroundImage: "",
    name: "",
    username: "",
    profilePic:
      "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
    bio: "",
    joined: "",
    location: "",
    webLink: "",
    followers: [],
    following: [],
  });

  const getUserByName = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/fetch/profile", { userName });
      setUser({
        id: res.data.user._id,
        backgroundImage: res.data.user.backgroundImage,
        name: res.data.user.name,
        username: "@" + res.data.user.userName,
        profilePic: res.data.user.profilePic,
        bio: res.data.user.bio,
        followers: res.data.user.followers,
        joined: res.data.user.createdAt,
        location: res.data.user.location,
        webLink: res.data.user.weblink,
        following: res.data.user.following,
      });
      const { loggedIn, sameUser }: any = await isSameUser(userName);
      if (loggedIn === true && sameUser === true) {
        setButton("Edit Profile");
      } else if (loggedIn === true && sameUser === false) {
        setButton("Follow");
      }
    } catch (e: any) {
      toast.error(e.response.data.error);
      return;
    } finally {
      setLoading(false);
    }
  };

  const handleControl = () => {
    if (button === "Sign in") {
      router.push("/login");
      return;
    }
    if(button === 'Edit Profile'){
      router.push("/editprofile")
      return;
    }
  };

  useEffect(() => {
    getUserByName();
  }, [userName || user]);

  function getMonthName(monthNumber: number) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Check if the monthNumber is within a valid range (1 to 12)
    if (monthNumber >= 1 && monthNumber <= 12) {
      return months[monthNumber - 1];
    } else {
      return "Invalid month number";
    }
  }

  return (
    <>
      {loading === true ? (
        <Spinner />
      ) : (
        <section className="w-full">
          <div className="cover-image flex justify-start items-start flex-col ml-10">
            <Image
              className="rounded-full mt-12 mb-6"
              alt="profile-pic"
              src={user.profilePic}
              width={100}
              height={100}
            />
            <p className="text-3xl text-center">{user.name}</p>
            <p className="font-extralight text-gray-500 font-serif text-center">
              {user.username}
            </p>
            {user.bio && `<p className="mt-5 font-mono">{user.bio}</p>`}
            <div className="flex justify-center items-center mb-12 mt-5">
              {user.location &&
                `<p className="mr-4">
            <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
            ${user.location}
          </p>`}

              {user.webLink &&
                ` <p className="mr-4">
            <FontAwesomeIcon icon={faLink} className="mr-2" />
            <Link href=${user.webLink} className="text-blue-500">
              Visit My Website
            </Link>
          </p>`}

              <p>
                <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />
                Joined {getMonthName(
                  Number(user.joined[5] + user.joined[6])
                )}{" "}
                {user.joined[0]}
                {user.joined[1]}
                {user.joined[2]}
                {user.joined[3]}
              </p>
            </div>
            <div className="flex justify-center items-center mb-12">
              <p className="mr-4">{user.followers.length} Followers</p>
              <p className="mr-4">{user.following.length} Following</p>
              <button
                className="bg-white border text-black px-12 py-2.5 rounded-full hover:bg-black hover:text-white hover:border hover:transition-transform hover:transform hover:scale-110 duration-300 ease-in-out"
                onClick={handleControl}
              >
                {button}
              </button>
            </div>
          </div>
          <hr />
        </section>
      )}
    </>
  );
};

export default Profile;
