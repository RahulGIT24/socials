"use client";

import Followers from "@/components/Followers";
import { useUserContext } from "@/context/usercontext";
import { isSameUser } from "@/helpers/sameuser";
import Link from "next/link";

import React, { useEffect, useState } from "react";

const followers = ({ params }: any) => {
  const userName = params.username;
  const { getUser, userState } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);

  const getUserByName = async () => {
    try {
      setLoading(true);
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
  }, [followers]);

  return (
    <div className="w-full flex justify-center items-center flex-col max-h-screen">
      <div className="w-3/4 h-16 bg-transparent text-white border-y flex justify-start items-center sticky">
        <p className="text-2xl ml-2">@{params.username}</p>
      </div>
      {followers.map((item: any, index: number) => {
        return (
          <Link
            href={`/profile/${item.userName}`}
            className="w-full flex justify-center items-center"
            key={index}
          >
            <Followers remove={remove} item={item} />
          </Link>
        );
      })}
    </div>
  );
};

export default followers;
