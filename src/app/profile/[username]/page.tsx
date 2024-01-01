"use client";

import PostCard from "@/components/PostCard";
import Spinner from "@/components/Spinner";
import { useUserContext } from "@/context/usercontext";
import { isSameUser } from "@/helpers/sameuser";
import {
  faCalendarDays,
  faLink,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Profile = ({ params }: any) => {
  const { getUser, userState } = useUserContext();
  const userName = params.username;
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const [button, setButton] = useState<string>("Sign in");

  const {
    id,
    name,
    username,
    backgroundImage,
    profilePic,
    followers,
    following,
    joined,
    location,
    webLink,
    bio,
  } = userState;

  const getUserByName = async () => {
    try {
      if (username === "" || name === "" || profilePic === "") {
        setLoading(true);
        getUser(params.username);
      }
      const { loggedIn, sameUser }: any = await isSameUser(userName);
      if (loggedIn === true && sameUser === true) {
        setButton("Edit Profile");
      } else if (loggedIn === true && sameUser === false) {
        setButton("Follow");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleControl = () => {
    if (button === "Sign in") {
      router.push("/login");
      return;
    }
    if (button === "Edit Profile") {
      router.push("/editprofile");
      return;
    }
  };

  useEffect(() => {
    getUserByName();
  }, []);

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
        <section className="w-full flex justify-center items-center flex-col">
          <div className="cover-image flex justify-start items-start flex-col ml-10 w-4/5">
            <Image
              className="rounded-full mt-12 mb-6"
              alt="profile-pic"
              src={profilePic}
              width={100}
              height={100}
            />
            <p className="text-3xl text-center">{name}</p>
            <p className="font-extralight text-gray-500 font-serif text-center mb-5">
              {username}
            </p>
            {bio && <p className="font-mono text-lg w-3/4 mb-9">{bio}</p>}

            <div className="flex justify-center items-center mb-6 mt-5">
              {location && (
                <p className="mr-4">
                  <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                  {location}
                </p>
              )}

              {/* {webLink && (
                <p className="mr-4">
                  <FontAwesomeIcon icon={faLink} className="mr-2" />
                  <a
                    href={`https://${webLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    Visit My Website
                  </a>
                </p>
              )} */}

              <p>
                <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />
                Joined {getMonthName(Number(joined[5] + joined[6]))} {joined[0]}
                {joined[1]}
                {joined[2]}
                {joined[3]}
              </p>
            </div>
            <div className="flex justify-center items-center mb-12">
              <p className="mr-4">{followers.length} Followers</p>
              <p className="mr-4">{following.length} Following</p>
              <button
                className="bg-white border text-black px-6 md:px-12 py-2 md:py-2.5 rounded-full 
                hover:bg-black hover:text-white hover:border 
                hover:transition-transform hover:transform hover:scale-110 
                duration-300 ease-in-out"
                onClick={handleControl}
              >
                {button}
              </button>
            </div>
          <div className="w-full h-2 bg-white mb-12"></div>
          </div>
          <div className="flex justify-start items-start flex-col ml-10 w-4/5">
          <PostCard/>
          </div>
        </section>
      )}
    </>
  );
};

export default Profile;
