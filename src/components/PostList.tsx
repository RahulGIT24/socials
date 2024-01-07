"use client";

import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { useUserContext } from "@/context/usercontext";
import { InfinitySpin } from "react-loader-spinner";
import axios from "axios";
import toast from "react-hot-toast";

const PostList = ({ deletePost, id,loggedIn}: any) => {
  const [posts, setPosts] = useState([]);
  const { fetchPost } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(1);

  async function getPost() {
    try {
      setLoading(true);
      const res = await fetchPost("USERID", "", id, page);
      const post = res.data.posts;
      setPosts(post);
      // setPage(page + 1);
      return;
    } catch (e) {
      return;
    } finally {
      setLoading(false);
    }
  }

  const delPost = async (id: string) => {
    try {
      const res = await axios.delete(`/api/posts/delete/${id}`);
      getPost();
      toast.success(res.data.message);
      return;
    } catch (e: any) {
      toast.error(e.response.data.error);
      return;
    }
  };

  useEffect(() => {
    if (posts.length === 0 && !loading) {
      getPost();
    }
  }, []);

  // const handleScroll = () => {
  //   const windowHeight = window.innerHeight;
  //   const documentHeight = document.documentElement.offsetHeight;
  //   const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  //   const scrollBottom = scrollTop + windowHeight;

  //   if (scrollBottom >= documentHeight - 200 && !loading) {
  //     getPost();
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [loading, page]);

  return (
    <>
      {!posts ||
        (posts.length == 0 && !loading && (
          <div className="text-center mt-4 text-5xl flex justify-center items-center w-full font-bold">
            No Posts
          </div>
        ))}
      {posts.map((post: any, index: number) => {
        return (
          <PostCard
            deletePost={deletePost}
            key={index}
            post={post}
            delPost={delPost}
            loggedIn={loggedIn}
          />
        );
      })}
      {loading && (
        <div className="flex justify-center items-center w-full">
          <InfinitySpin width="200" color="white" />
        </div>
      )}
    </>
  );
};

export default PostList;
