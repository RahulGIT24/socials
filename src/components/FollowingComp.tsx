import axios from "axios";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";
const FollowingComp = ({ item, remove, getUser }: any) => {

  // function to unfollow
  async function unFollow(event: any) {
    // Prevent the default link click behavior
    event.preventDefault();
    // Stop the event propagation to prevent the link from being triggered
    event.stopPropagation();

    try {
      await axios.put("/api/users/update/unfollow", {
        targetUserid: item.id,
      });
      toast.success("Unfollowed");
      getUser();
      return;
    } catch (error: any) {
      toast.error(error.response.data.error);
      return;
    }
  }

  return (
    <section className="w-3/4 bg-transparent-900 rounded-lg bg-transparent py-6 border border-gray-900 hover:bg-gray-800 transition ease-in-out duration-100">
      <div className="flex justify-start ml-2 items-center">
        <Image
          alt="profile-pic"
          src={item.profilePic}
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="flex items-center w-1/3">
          <p className="ml-2 font-bold text-lg">{item.name}</p>
          <p className="ml-2 font-extralight italic text-gray-300">
            {"@" + item.userName}
          </p>
        </div>
        {remove && (
          <div className="flex justify-end items-end w-full">
            <button
              className="mr-2 border text-red-500 bg-white py-2 px-3 rounded-xl hover:bg-black hover:text-red-500 font-semibold hover:border-black hover:transition duration-300 ease-in-out"
              onClick={unFollow}
            >
              Unfollow
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FollowingComp;
