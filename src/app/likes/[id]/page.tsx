"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Like = ({ params }: any) => {
  const [likes, setLikes] = useState<[]>([]);
  const getPost = async () => {
    try {
      const id = params.id;
      const res = await axios.post(`/api/posts/fetch/${0}`, {
        type: "POSTID",
        postId: id,
        userId: "",
      });
      setLikes(res.data.post.likes);
      return;
    } catch (error: any) {
      toast.error(error.response.data.error);
      return;
    }
  };
  useEffect(() => {
    getPost();
  }, []);
  return (
    <>
      <div className="flex justify-center items-center flex-col">
        <div className="w-3/4 flex items-center py-6 border-y">
          <p className="font-bold text-2xl">Likes</p>
        </div>

        {likes &&
          likes.map((like: any, index: number) => {
            return (
              <Link
                key={index}
                className="w-full flex justify-center "
                href={`/profile/${like.userName}`}
              >
                <div className="card w-3/4 py-8 flex items-center hover:bg-gray-900 px-2 rounded-sm hover:transition-all duration-100">
                  <Image
                    width={50}
                    alt="profile-pic"
                    height={50}
                    src={like.profilePic}
                    className="rounded-full"
                  />
                  <p className="text-xl font-bold ml-2">{like.name}</p>
                  <p className="text-xl font-extralight ml-2 italic">
                    @{like.userName}
                  </p>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default Like;
