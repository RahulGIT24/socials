"use client";

import Following from "@/components/Following";
import { useUserContext } from "@/context/usercontext";
import { isSameUser } from "@/helpers/sameuser";
import Link from "next/link";

import React, { useEffect, useState } from "react";

const following = ({ params }: any) => {
  const username = params.username;
  const { getUser, userState } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);

  const getUserByName = async () => {
    try {
      setLoading(true);
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
  }, [following]);

  return (
    <div className="w-full flex justify-center items-center flex-col max-h-screen">
      <div className="w-3/4 h-16 bg-transparent text-white border-y flex justify-start items-center sticky">
        <p className="text-2xl ml-2 font-serif">@{params.username}</p>
      </div>
      {following.map((item: any, index: number) => {
        return (
          <Link
            href={`/profile/${item.userName}`}
            className="w-full flex justify-center items-center"
            key={index}
          >
            <Following remove={remove} item={item} />
          </Link>
        );
      })}
    </div>
  );
};

export default following;
