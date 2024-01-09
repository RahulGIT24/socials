"use client";
import SearchCard from "@/components/SearchCard";
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { InfinitySpin } from "react-loader-spinner";

const Search = () => {
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setTimeout(async () => {
      await searchforUsers();
    }, 1000);
  };

  const searchforUsers = async () => {
    if (search === "") {
      setSearchResults([]);
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`/api/users/fetch/search`,{userName:search});
      setSearchResults(res.data.users);
      return;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.error);
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="w-full flex justify-center items-center flex-col">
        <input
          type="search"
          placeholder="Connect with people by their @username's"
          className="py-3 px-2 w-3/4 outline-none rounded-lg bg-transparent text-white border-2"
          defaultValue={search}
          onChange={handleChange}
        />
        {loading && (
          <div className="flex justify-center items-center w-full">
            <InfinitySpin width="200" color="white" />
          </div>
        )}
        {searchResults &&
          searchResults.map((item: any) => (
            <Link
              key={item._id}
              href={`/profile/${item.userName}`}
              className="w-full flex justify-center items-center flex-col"
            >
              <SearchCard user={item} />
            </Link>
          ))}
      </div>
    </>
  );
};

export default Search;
