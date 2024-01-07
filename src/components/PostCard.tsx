import {
  faComment,
  faHeart,
  faShare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const PostCard = ({ deletePost, post, delPost, loggedIn }: any) => {
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
  const word = description.split(" ");
  const dateTime = new Date(createdAt);

  // function to delete post
  return (
    <section className="border border-gray-800 px-3 py-3 rounded-2xl mb-9 w-full">
      <div className="name-image flex items-center">
        <Image
          className="rounded-full mr-2"
          alt="profile-pic"
          src={userPic}
          width={50}
          height={50}
        />
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
            <FontAwesomeIcon icon={faHeart} className="mr-2" />
            {likes.length}
          </div>
          <div className="comment mr-2">
            <FontAwesomeIcon icon={faComment} className="mr-2" />
            {comments.length}
          </div>
          <div className="share mr-2">
            <FontAwesomeIcon icon={faShare} className="mr-2" />
            {shares.length}
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
    </section>
  );
};

export default PostCard;
