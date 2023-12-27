"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Avatar from "@/components/Avatar";

const SignUp = () => {
  const today = new Date().toISOString().split("T")[0];
  const [userInfo, setUserInfo] = useState<{
    name: String;
    username: String;
    email: String;
    password: String;
    DOB: String;
  }>({
    name: "",
    username: "",
    email: "",
    password: "",
    DOB: "",
  });

  const [selectedGender, setSelectedGender] = useState<String | null>(null);
  const [profilePic, setProfilePic] = useState<Boolean>(true);
  const [progress, setProgress] = useState<Number>(0);

  const handleGenderChange = (gender: string) => {
    setSelectedGender(gender);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const today = new Date().toISOString().split("T")[0].split("-");
    const givenDate = userInfo.DOB.split("-");

    if (userInfo.password.length < 8) {
      toast.error("Password Length Should be at least 8 characters");
      return;
    }

    if (givenDate[0] > today[0]) {
      toast.error("Invalid DOB");
      return;
    }

    if (!userInfo || selectedGender === null || selectedGender === "") {
      toast.error("Please fill up the details");
      return;
    }

    try {
      await axios.post("/api/users/auth/signup", {
        name: userInfo.name,
        userName: userInfo.username,
        email: userInfo.email,
        password: userInfo.password,
        dateOfBirth: userInfo.DOB,
        gender: selectedGender,
      });

      toast.success("Account Created Successfully");
      setProfilePic(true);
      return;
    } catch (e: any) {
      toast.error(e.response.data.error);
      return;
    }
  };

  return (
    <>
      {profilePic === true ? (
        <Avatar setProfilePic={setProfilePic} />
      ) : (
        <section className="w-full">
          <h1 className="text-center py-12 text-4xl font-medium">
            Create your account
          </h1>
          <main className="flex justify-center items-center flex-col w-full">
            <form className="flex justify-center items-center flex-col">
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="px-2 py-3 rounded-lg bg-transparent text-white mb-3 border border-white"
                onChange={(e) => {
                  setUserInfo({
                    ...userInfo,
                    name: e.target.value,
                  });
                }}
                required
              />
              <input
                type="text"
                name="usernamme"
                placeholder="Enter your username"
                className="px-2 py-3 rounded-lg bg-transparent text-white mb-3 border border-white"
                onChange={(e) => {
                  setUserInfo({
                    ...userInfo,
                    username: e.target.value,
                  });
                }}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="px-2 py-3 rounded-lg bg-transparent text-white mb-3 border border-white"
                onChange={(e) => {
                  setUserInfo({
                    ...userInfo,
                    email: e.target.value,
                  });
                }}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="px-2 py-3 rounded-lg bg-transparent text-white mb-4 border border-white"
                onChange={(e) => {
                  setUserInfo({
                    ...userInfo,
                    password: e.target.value,
                  });
                }}
                required
              />
              <input
                type="date"
                name="date"
                max={today}
                placeholder="Enter your password"
                className="px-2 py-3 rounded-lg bg-transparent text-white mb-6 border border-white w-full"
                onChange={(e) => {
                  setUserInfo({
                    ...userInfo,
                    DOB: e.target.value,
                  });
                }}
                required
              />
              <p className="mb-2">Select your gender</p>
              <div className="flex items-center justify-center mb-4">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  className="hidden"
                  checked={selectedGender === "male"}
                  onChange={() => handleGenderChange("male")}
                />
                <label
                  htmlFor="male"
                  className={`cursor-pointer flex items-center justify-center h-10 w-10 border border-gray-400 rounded-full mr-2 ${
                    selectedGender === "male" && "bg-white text-black"
                  }`}
                >
                  <span className="text-xl">&#9794;</span>
                </label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  className="hidden"
                  checked={selectedGender === "female"}
                  onChange={() => handleGenderChange("female")}
                />
                <label
                  htmlFor="female"
                  className={`cursor-pointer flex items-center justify-center h-10 w-10 border border-gray-400 rounded-full mr-2 ${
                    selectedGender === "female" && "bg-white text-black"
                  }`}
                >
                  <span className="text-xl">&#9792;</span>
                </label>
                <input
                  type="radio"
                  id="other"
                  name="gender"
                  value="other"
                  className="hidden"
                  checked={selectedGender === "other"}
                  onChange={() => handleGenderChange("other")}
                />
                <label
                  htmlFor="other"
                  className={`cursor-pointer flex items-center justify-center h-10 w-10 border border-gray-400 rounded-full mr-2 ${
                    selectedGender === "other" && "bg-white text-black"
                  }`}
                >
                  <span className="text-xl">&#9893;</span>
                </label>
              </div>
              <div className="mb-6">
                <label htmlFor="male" className="text-sm m-2">
                  Male
                </label>
                <label htmlFor="female" className="text-sm m-2">
                  Female
                </label>
                <label htmlFor="other" className="text-sm m-2">
                  Others
                </label>
              </div>
            </form>

            <button
              className="rounded-3xl border border-white px-3 py-3 font-semibold hover:bg-white hover:text-black hover:transition-all duration-200 ease-in-out hover:scale-95"
              onClick={onSubmit}
            >
              Create Account
            </button>
          </main>
        </section>
      )}
    </>
  );
};

export default SignUp;
