"use client";

import { useUserContext } from "@/context/usercontext";
import {
  faComment,
  faHeart,
  faShare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const PostCard = ({ deletePost, post, delPost, loggedIn }: any) => {
  const {likedP} = useUserContext();
  const {
    description,
    image,
    video,
    userName,
    userPic,
    name,
    _id,
    createdAt,
    likes,
    comments,
    shares,
  } = post;
  const [likeCount, setLikeCount] = useState<number>(likes.length);
  const word = description.split(" ");
  const dateTime = new Date(createdAt);

  // states
  const [like, setLike] = useState(false);

  const onLike = async () => {
    try {
      const res = await axios.put("/api/posts/like", { postId: _id });
      setLike(!like);
      if (res.data.message === "Liked") {
        setLikeCount(likeCount + 1);
      } else {
        setLikeCount(likeCount - 1);
      }
    } catch (error: any) {
      toast.error(error.response.data.error);
      return;
    }
  };

  // check if post is already liked
  const check = () => {
    if(likedP){
      likedP.map((item: any) => {
        if (item === _id) {
          setLike(true);
        }
      });
    }
    return;
  };

  useEffect(() => {
      check();
  }, []);

  // function to delete post
  return (
    <section className="border border-gray-800 px-3 py-3 rounded-2xl mb-9 w-full">
      <div className="name-image flex items-center">
        <Link href={`/profile/${userName}`}>
        <Image
          className="rounded-full mr-2"
          alt="profile-pic"
          src={userPic}
          width={50}
          height={50}
        />
        </Link>
        <div className="flex items-center">
          <p className="font-bold text-lg">{name}</p>
          <p className="font-extralight text-sm mx-2">@{userName}</p>
          <p className="font-extralight text-sm mx-2">{dateTime.toString()}</p>
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
      {image && (
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
      {loggedIn && (
        <div className="buttons flex items-center mt-4">
          <div className="like mr-2">
            <FontAwesomeIcon
              icon={faHeart}
              className={`mr-2 ${like && "text-red-700"} cursor-pointer`}
              onClick={onLike}
            />
          </div>
          <div className="comment">
            <Link href={`/comments/${_id}`}>
              <FontAwesomeIcon icon={faComment} className="mr-2" />
            </Link>
          </div>
          {deletePost && (
            <div
              className="delete cursor-pointer ml-2"
              onClick={() => {
                delPost(_id);
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </div>
          )}
        </div>
      )}
      <div className="mt-4 flex">
        <p>
          <Link href={`/likes/${_id}`}>
            {likeCount} <b>{likeCount == 1 ? "Like" : "Likes"}</b>
          </Link>
        </p>
        <p className="ml-2">
          <Link href={`/comments/${_id}`}>
            {comments.length} <b>Comments</b>
          </Link>
        </p>
      </div>
    </section>
  );
};

export default PostCard;
