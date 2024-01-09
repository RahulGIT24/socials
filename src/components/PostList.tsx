"use client";

import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { useUserContext } from "@/context/usercontext";
import axios from "axios";
import toast from "react-hot-toast";
import getLikedPosts from "@/helpers/likedPosts";
import { isSameUser } from "@/helpers/sameuser";

const PostList = ({ deletePost, id}: any) => {
  const [posts, setPosts] = useState<[]>([]);
  const { fetchPost } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [loggedIn,setLoggedIn] = useState<boolean>(false);
  // const [page, setPage] = useState<number>(1);
  const [likedPosts,setLikedPosts] = useState<[]>([]);

  async function getPost() {
    try {
      setLoading(true);
      const res = await fetchPost("USERID", "", id, 0);
      const post = res.data.posts;
      setPosts(post);
      // setPage(page + 1);
      const {loggedIn}:any = await isSameUser("");
      setLoggedIn(loggedIn);
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
    if (posts.length === 0) {
      getPost();
    }
  }, []);

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
    </>
  );
};

export default PostList;
