"use client";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";
import { useUserContext } from "@/context/usercontext";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState<[]>([]);
  const { fetchPost } = useUserContext();

  const getAllPosts = async () => {
    try {
      const res = await fetchPost("ALL", "", "", 0);
      const post = res.data.posts;
      setPosts(post);
      return;
    } catch (e) {
      return;
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, [posts]);

  return (
    <>
      <Sidebar />
      <div className="flex justify-center items-center flex-col sticky top-0 bg-black">
        <div className="w-3/4 flex items-center py-6 border-y">
          <p className="font-bold text-2xl">Feed</p>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col w-full">
        <div className="w-3/4">
          {posts &&
            posts.map((post: any, index: number) => {
              return (
                <PostCard
                  deletePost={false}
                  key={index}
                  post={post}
                  delPost={() => {}}
                  loggedIn={true}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};
export default Home;
