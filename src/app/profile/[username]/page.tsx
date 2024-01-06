"use client";

import PostList from "@/components/PostList";
import Spinner from "@/components/Spinner";
import { useUserContext } from "@/context/usercontext";
import { isFollowed } from "@/helpers/isFollowed";
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
import LoadingBar from "react-top-loading-bar";

const Profile = ({ params }: any) => {
  const { getUser, userState, setuserState } = useUserContext();
  const userName = params.username;
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const [deletePost, setDeletePost] = useState<boolean>(false);
  const [followBtn, setFollowBtn] = useState<string>("Follow");
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [sameUser, setSameUser] = useState<boolean | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [followState, setFollowState] = useState<boolean | null>(false);

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
    followersCount,
  } = userState;

  const getUserByName = async () => {
    try {
      setLoading(true);
      getUser(params.username);
      const { loggedIn, sameUser }: any = await isSameUser(userName);
      setLoggedIn(loggedIn);
      setSameUser(sameUser);
      if (loggedIn === true && sameUser === true) {
        setDeletePost(true);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserByName();
  }, []);

  async function check() {
    const checkforfollow = await isFollowed(userName);
    if (checkforfollow) {
      setFollowState(true);
      setFollowBtn("Unfollow");
    }
  }

  useEffect(() => {
    check();
  }, []);

  // Buttons functionality
  const editProfile = () => {
    router.push(`/editprofile`);
  };
  const signin = () => {
    router.push(`/login`);
  };

  // function to follow
  async function follow() {
    try {
      setProgress(50);
      await axios.put("/api/users/update/follow", {
        targetUserid: id,
      });
      setFollowState(true);
      setFollowBtn("Unfollow");
      toast.success("Followed");
      setuserState((prevUserState: any) => ({
        ...prevUserState,
        followersCount: followersCount + 1,
      }));
      return;
    } catch (error: any) {
      toast.error(error.response.data.error);
      return;
    } finally {
      setProgress(100);
    }
  }

  // function to unfollow
  async function unFollow() {
    try {
      setProgress(60);
      await axios.put("/api/users/update/unfollow", {
        targetUserid: id,
      });
      setFollowState(false);
      setFollowBtn("Follow");
      toast.success("Unfollowed");
      if (followersCount > 0) {
        setuserState((prevUserState: any) => ({
          ...prevUserState,
          followersCount: followersCount - 1,
        }));
      }
      return;
    } catch (error: any) {
      toast.error(error.response.data.error);
      return;
    } finally {
      setProgress(100);
    }
  }

  const handleFollow = async () => {
    if (followState === false || null) {
      await follow();
    }
    if (followState === true) {
      await unFollow();
    }
  };

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
          <LoadingBar
            color="blue"
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
          />
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
              <p className="mr-4">{followersCount} Followers</p>
              <p className="mr-4">{following.length} Following</p>
              {loggedIn === true && sameUser === true && (
                <button
                  className="bg-white border text-black px-6 md:px-12 py-2 md:py-2.5 rounded-full 
                hover:bg-black hover:text-white hover:border 
                hover:transition-transform hover:transform hover:scale-110 
                duration-300 ease-in-out"
                  onClick={editProfile}
                >
                  Edit Profile
                </button>
              )}
              {loggedIn === false && (
                <button
                  className="bg-white border text-black px-6 md:px-12 py-2 md:py-2.5 rounded-full 
                hover:bg-black hover:text-white hover:border 
                hover:transition-transform hover:transform hover:scale-110 
                duration-300 ease-in-out"
                  onClick={signin}
                >
                  Sign In
                </button>
              )}
              {loggedIn === true && sameUser === false && (
                <button
                  className={`border 
                hover:transition-transform hover:transform hover:scale-110 
                px-6 md:px-12 py-2 md:py-2.5 rounded-full 
                duration-300 ease-in-out ${
                  followState === true
                    ? "text-white bg-black hover:bg-white hover:text-black"
                    : "text-black bg-white hover:text-white hover:bg-black"
                } `}
                  onClick={handleFollow}
                >
                  {followBtn}
                </button>
              )}
            </div>
            <div className="w-full h-2 bg-white mb-12"></div>
          </div>
          <div className="flex justify-start items-start flex-col ml-10 w-4/5">
            <PostList deletePost={deletePost} id={id} />
          </div>
        </section>
      )}
    </>
  );
};

export default Profile;
