"use client";

import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { useUserContext } from "@/context/usercontext";
import { InfinitySpin } from "react-loader-spinner";

const PostList = ({ deletePost, id }: any) => {
  const [posts, setPosts] = useState([]);
  const { fetchPost } = useUserContext();
  const [loading, setLoading] = useState(false);

  async function getPost() {
    try {
      if (posts.length == 0) {
        setLoading(true);
        const res = await fetchPost("USERID", "", id);
        setPosts(res.data.posts);
        return;
      }
    } finally {
      setLoading(false);
      return;
    }
  }

  useEffect(() => {
    getPost();
  }, []);

  if (loading === true) {
    return (
      <>
        <div className="text-center mt-4 text-5xl flex justify-center items-center w-full font-bold">
          <InfinitySpin width="200" color="white" />
        </div>
      </>
    );
  }

  return (
    <>
      {!posts ||
        (posts.length == 0 && (
          <div className="text-center mt-4 text-5xl flex justify-center items-center w-full font-bold">
            No Posts
          </div>
        ))}
      {posts &&
        posts.map((post: any, index: number) => {
          return <PostCard deletePost={deletePost} key={index} post={post} />;
        })}
    </>
  );
};

export default PostList;
