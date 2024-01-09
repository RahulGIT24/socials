"use client";

import FollowersComp from "@/components/FollowersComp";
import { useUserContext } from "@/context/usercontext";
import { isSameUser } from "@/helpers/sameuser";
import Link from "next/link";

import React, { useEffect, useState } from "react";

const Followers = ({ params }: any) => {
  const userName = params.username;
  const { getUser, userState } = useUserContext();
  const [loading, setLoading] = useState(true);
  const [remove, setRemove] = useState(false);

  const getUserByName = async () => {
    try {
      getUser(userName);
      const { loggedIn, sameUser }: any = await isSameUser(userName);
      if (loggedIn === true && sameUser === true) {
        setRemove(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const { followers } = userState;

  useEffect(() => {
    getUserByName();
  }, []);

  return (
    <div className="w-full flex justify-center items-center flex-col max-h-screen">
      <div className="w-3/4 h-16 bg-transparent text-white border-y flex justify-start items-center sticky">
        <Link href={`/profile/${params.username}`}>
          <p className="text-2xl ml-2">@{params.username}</p>
        </Link>
      </div>
      {loading === false && (
        <>
          {followers.map((item: any, index: number) => {
            return (
              <Link
                href={`/profile/${item.userName}`}
                className="w-full flex justify-center items-center"
                key={index}
              >
                <FollowersComp remove={remove} item={item} getUser= {getUserByName}/>
              </Link>
            );
          })}
        </>
      )}
      {loading === false && followers.length === 0 && (
        <>
          <div className="flex justify-center items-center h-screen">
            <p className="text-4xl font-bold">No Followers</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Followers;
