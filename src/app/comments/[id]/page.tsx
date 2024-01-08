"use client";
import { isSameUser } from "@/helpers/sameuser";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LoadingBar from "react-top-loading-bar";

interface Post {
  description: string;
  userPic: string;
  userName: string;
  name: string;
  comments: [];
  image: string;
}

const Comments = ({ params }: any) => {
  const id = params.id;
  const [comment, setComment] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [post, setPost] = useState<Post>({
    description: "",
    userPic: "",
    userName: "",
    name: "",
    comments: [],
    image: "",
  });
  const getPost = async () => {
    try {
      const res = await axios.post(`/api/posts/fetch/${0}`, {
        type: "POSTID",
        postId: id,
        userId: "",
      });
      setPost({
        description: res.data.post.description,
        name: res.data.post.name,
        userName: res.data.post.userName,
        userPic: res.data.post.userPic,
        comments: res.data.post.comments,
        image: res.data.post.image,
      });
      const { loggedIn }: any = await isSameUser("");
      setLoggedIn(loggedIn);
      return;
    } catch (error: any) {
      toast.error(error.response.data.error);
      return;
    }
  };
  const { description, userPic, userName, name, image } = post;
  const word = description.split(" ");

  const onComment = async () => {
    try {
      setDisabled(true);
      setProgress(45);
      const res = await axios.put("/api/posts/comment", {
        postId: id,
        comment: comment,
      });
      setComment("");
      toast.success(res.data.message);
      getPost();
      return;
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      setProgress(100);
      setDisabled(false);
    }
  };

  function time(time: string) {
    return new Date(time);
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <LoadingBar
        color="blue"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="flex justify-center items-center flex-col sticky top-0 bg-black">
        <div className="w-3/4 flex items-center py-6 border-y">
          <p className="font-bold text-2xl">Comments</p>
        </div>
      </div>
      {
        description && userPic && userName && name &&
      <div className="flex justify-center">
        <section className="border border-gray-800 px-3 py-3 w-3/4 flex-col">
          <div className="name-image flex items-center">
            {userPic && (
              <Image
                className="rounded-full mr-2"
                alt="profile-pic"
                src={userPic}
                width={50}
                height={50}
              />
            )}
            <div className="flex items-center">
              <p className="font-bold text-lg">{name}</p>
              <p className="font-extralight text-sm mx-2">@{userName}</p>
              {/* <p className="font-extralight text-sm mx-2">{dateTime.toString()}</p> */}
            </div>
          </div>
          {description && (
            <div className="post mt-4">
              {word.map((word: any, index: any) => (
                <span
                  key={index}
                  className={word.startsWith("#") ? "text-blue-500" : ""}
                >
                  {word}{" "}
                </span>
              ))}
            </div>
          )}
          {image && image !== "" && (
            <div className="my-5 flex justify-center items-center">
              <Image
                className="rounded-md mr-2"
                alt="posted-pic"
                src={image}
                width={600}
                height={100}
              />
            </div>
          )}
        </section>
      </div>
      }
      {loggedIn && (
        <div className="commnet-box w-full flex justify-center">
          <div className="w-3/4 flex">
            <input
              type="text"
              className="w-full px-2 py-3 bg-transparent outline-none border border-white"
              placeholder="Comment"
              value={comment}
              onChange={(event: any) => {
                setComment(event.target.value);
              }}
            />
            <button
              className={`font-bold border ${
                disabled ? "bg-black text-white" : "bg-white text-black"
              }`}
              onClick={onComment}
              disabled={disabled}
            >
              Comment
            </button>
          </div>
        </div>
      )}

      {post.comments &&
        post.comments.map((comment: any, index: number) => {
          return (
            <div
              className="w-full flex justify-center items-center"
              key={index}
            >
              <div className="w-3/4 border border-gray-800 py-6 px-4">
                <div className="image flex items-center">
                  <Image
                    src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                    width={50}
                    height={50}
                    className="rounded-full"
                    alt="profile-pic"
                  />
                  <p className="font-bold ml-2 text-xl">{comment.name}</p>
                  <p className="font-extralight italic ml-2">
                    @{comment.userName}
                  </p>
                </div>
                <div className="comment">
                  <p className="my-4 text-lg">{comment.comment}</p>
                  <p className="font-extralight text-sm">
                    Commented On <b>{`${time(comment.time)}`}</b>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Comments;
