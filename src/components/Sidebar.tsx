"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "./Spinner";

const Sidebar = () => {
  const [loader, setLoader] = useState(true);
  const [name, setName] = useState<string>("");
  const [userName, setUsername] = useState<string>("");
  const [pic, setPic] = useState<string>(
    "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
  );

  const router = useRouter();
  const onLogout = async () => {
    try {
      await axios.get("/api/users/auth/logout");
      toast.success("Logged Out Successfully!");
      router.push("/login");
    } catch (e: any) {
      toast.error(e.response.data.error || "Internal server error");
      return;
    }
  };

  const getUserInfo = async () => {
    try {
      const res = await axios.post("/api/users/fetch/profile", {
        userName: "",
      });
      setName("Hi, " + res.data.user.name.split(" ")[0]);
      setUsername(res.data.user.userName);
      setPic(res.data.user.profilePic);
      return;
    } catch (e: any) {
      toast.error(e.response.data.error);
      if (e.response.data.error === "Session Expired") {
        router.push("/login");
      }
      return;
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [userName || name || pic]);

  return (
    <>
      {loader ? (
        <Spinner />
      ) : (
        <>
          <button
            data-drawer-target="logo-sidebar"
            data-drawer-toggle="logo-sidebar"
            aria-controls="logo-sidebar"
            type="button"
            className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>

          <aside
            id="logo-sidebar"
            className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar"
          >
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-950">
              <div className="flex justify-center items-center mb-12 flex-col">
                <Link href={`/profile/${userName}`}>
                  <Image
                    src={pic}
                    width={80}
                    height={50}
                    alt="profile-pic"
                    className="rounded-full border border-black mt-4"
                  />
                </Link>
                <hr />
                <div className="flex justify-center items-center flex-col mt-4">
                  <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                    {name}
                  </span>
                  <span className="self-center text-sm font-mono whitespace-nowrap dark:text-gray-400">
                    {"@" + userName}
                  </span>
                </div>
              </div>
              <ul className="space-y-2 font-medium">
                <li>
                  <Link
                    href="/posts"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <svg
                      className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 21"
                    >
                      <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                      <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                    </svg>
                    <span className="ms-3">Posts</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/create-post"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 18"
                    >
                      <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Create Post
                    </span>
                  </Link>
                </li>
                <li>
                  <div
                    className="flex items-center justify-around p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer"
                    onClick={onLogout}
                  >
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                      />
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Log Out
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </aside>
        </>
      )}
    </>
  );
};

export default Sidebar;
