import Image from "next/image";
import React from "react";

const SearchCard = ({ user }: any) => {
  return (
    <section className="w-3/4 bg-transparent-900 rounded-lg bg-gray-950 py-4 border border-gray-800 hover:bg-gray-700 transition ease-in-out duration-100">
      <div className="flex justify-start ml-2 items-center">
        <Image
          alt="profile-pic"
          src={user.profilePic}
          width={30}
          height={30}
          className="rounded-full"
        />
        <p className="ml-2 font-bold text-xl">{user.name}</p>
        <p className="ml-2 font-extralight italic text-gray-300">
          {"@" + user.userName}
        </p>
      </div>
    </section>
  );
};

export default SearchCard;
