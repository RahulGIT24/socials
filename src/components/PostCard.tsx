import {
  faComment,
  faHeart,
  faShare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const PostCard = ({ deletePost, post }: any) => {
  const { description, image, video, userName, userPic, name } = post;
  const word = description.split(" ");
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
        <div>
          <p className="font-bold text-lg">{name}</p>
          <p className="font-extralight text-sm">@{userName}</p>
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
      <div className="buttons flex items-center mt-4">
        <div className="like mr-2">
          Like <FontAwesomeIcon icon={faHeart} />
        </div>
        <div className="comment mr-2">
          Comment <FontAwesomeIcon icon={faComment} />
        </div>
        <div className="share mr-2">
          Share <FontAwesomeIcon icon={faShare} />
        </div>
        {deletePost && (
          <div className="delete cursor-pointer">
            <FontAwesomeIcon icon={faTrash} />
          </div>
        )}
      </div>
    </section>
  );
};

export default PostCard;
