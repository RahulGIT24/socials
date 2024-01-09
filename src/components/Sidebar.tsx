"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUserContext } from "@/context/usercontext";
import {
  faArrowLeft,
  faImages,
  faMagnifyingGlass,
  faPlus,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = () => {
  const pathname = usePathname();
  const { userState, getUser } = useUserContext();
  const [loader, setLoader] = useState<boolean>(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

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

  async function getUserInfo() {
    try {
      getUser("");
    } finally {
      setLoader(false);
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className={
          "inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        }
        onClick={toggleSidebar}
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
        id="cta-button-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-950">
          <button
            onClick={toggleSidebar}
            className="inline-flex items-center p-4 mt-2 ms-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <div className="flex justify-center items-center mb-12 flex-col">
            <Link href={`/profile/${userState.username.slice(1)}`}>
              <Image
                src={userState.profilePic}
                width={80}
                height={50}
                alt="profile-pic"
                className="rounded-full border border-black mt-4"
              />
            </Link>
            <hr />
            <div className="flex justify-center items-center flex-col mt-4">
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                {userState.name.split(" ")[0]}
              </span>
              <span className="self-center text-sm font-mono whitespace-nowrap dark:text-gray-400">
                {userState.username}
              </span>
            </div>
          </div>
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  pathname === "/" && "bg-gray-100 dark:bg-gray-700"
                }`}
              >
                <FontAwesomeIcon icon={faImages} />
                <span className="ms-3">Feed</span>
              </Link>
            </li>
            <li>
              <Link
                href="/search"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  pathname === "/search" && "bg-gray-100 dark:bg-gray-700"
                }`}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <span className="ms-3">Search</span>
              </Link>
            </li>
            <li>
              <Link
                href="/create-post"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  pathname === "/create-post" && "bg-gray-100 dark:bg-gray-700"
                }`}
              >
                <FontAwesomeIcon icon={faPlus} />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Create Post
                </span>
              </Link>
            </li>
            <li>
              <Link
                href={`/profile/${userState.username.slice(1)}`}
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  pathname === `$/profile${userState.username}` &&
                  "bg-gray-100 dark:bg-gray-700"
                }`}
              >
                <FontAwesomeIcon icon={faUser} />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  My Profile
                </span>
              </Link>
            </li>
            <li>
              <div
                className="flex items-center justify-around p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer"
                onClick={onLogout}
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
                <span className="flex-1 ms-3 whitespace-nowrap">Log Out</span>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
