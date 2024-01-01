"use client";
import { faComment, faHeart, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

const PostCard = () => {
  return (
    <section className="border border-gray-800 px-3 py-3 rounded-2xl mb-9">
      <div className="name-image flex items-center">
        <Image
          className="rounded-full mr-2"
          alt="profile-pic"
          src={
            "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
          }
          width={50}
          height={50}
        />
        <div>
          <p className="font-bold text-lg">Rahul Gupta</p>
          <p className="font-extralight text-sm">@username</p>
        </div>
      </div>
      <div className="post mt-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt ad,
        doloremque natus exercitationem ipsa voluptate? Hic illum soluta quis
        deserunt minima illo minus! Adipisci dignissimos dolores ipsam expedita
        consequatur laboriosam mollitia delectus facere tempora corporis hic
        similique obcaecati, dolorum quaerat error praesentium inventore, quidem
        maiores?
      </div>
      <div className="my-5 flex justify-center items-center">
        <Image
          className="rounded-md mr-2"
          alt="profile-pic"
          src={
            "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
          }
          width={600}
          height={100}
        />
      </div>
      <div className="buttons flex items-center mt-4">
        <div className="like mr-2">
          Like <FontAwesomeIcon icon={faHeart} />
        </div>
        <div className="comment mr-2">
          Comment <FontAwesomeIcon icon={faComment} />
        </div>
        <div className="share">
          Share <FontAwesomeIcon icon={faShare} />
        </div>
      </div>
    </section>
  );
};

export default PostCard;
