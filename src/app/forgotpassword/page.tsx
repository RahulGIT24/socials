"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const ForgotPassword = () => {
  const [emailorusername, setEmailorUsername] = useState<string>("");

  const [progress, setProgress] = useState<Number>(0);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("/api/users/auth/forgotpassword", {
        emailOrUsername: emailorusername,
      });
      toast.success("Email send successfully");
      return;
    } catch (e: any) {
      toast.error(e.message);
      return;
    }
  };

  return (
    <>
      <section className="w-full h-80 flex justify-center items-center flex-col">
        <h1 className="text-center py-12 text-4xl font-medium">
          Account Recovery
        </h1>
        <main className="flex justify-center items-center flex-col w-full">
          <form className="flex justify-center items-center flex-col">
            <input
              type="text"
              name="email"
              placeholder="Enter your email or username"
              className="px-2 py-3 rounded-lg bg-transparent text-white mb-12 border border-white"
              onChange={(e) => {
                setEmailorUsername(e.target.value);
              }}
              required
            />
          </form>
          <button
            className="rounded-3xl border border-white px-2 py-3 font-semibold hover:bg-white hover:text-black hover:transition-all duration-200 ease-in-out hover:scale-95"
            onClick={onSubmit}
          >
            Send Password Reset Link
          </button>
        </main>
      </section>
    </>
  );
};

export default ForgotPassword;
