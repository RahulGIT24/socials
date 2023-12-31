"use client";

import FollowingComp from "@/components/FollowingComp";
import { useUserContext } from "@/context/usercontext";
import { isSameUser } from "@/helpers/sameuser";
import Link from "next/link";

import React, { useEffect, useState } from "react";

const Following = ({ params }: any) => {
  const username = params.username;
  const { getUser, userState } = useUserContext();
  const [loading, setLoading] = useState(true);
  const [remove, setRemove] = useState(false);

  const getUserByName = async () => {
    try {
      getUser(username);
      const { loggedIn, sameUser }: any = await isSameUser(username);
      if (loggedIn === true && sameUser === true) {
        setRemove(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const { following } = userState;

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
          {following.map((item: any, index: number) => {
            return (
              <Link
                href={`/profile/${item.userName}`}
                className="w-full flex justify-center items-center"
                key={index}
              >
                <FollowingComp
                  remove={remove}
                  item={item}
                  getUser={getUserByName}
                />
              </Link>
            );
          })}
        </>
      )}
      {loading === false && following.length === 0 && (
        <>
          <div className="flex justify-center items-center h-screen">
            <p className="text-4xl font-bold">No Following</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Following;
