"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";

const ForgotPassword = () => {
  const [emailorusername, setEmailorUsername] = useState<string>("");
  const [disabled,setDisabled] = useState(false);
  const [progress, setProgress] = useState<number>(0);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setDisabled(true);
      setProgress(30);
      await axios.post("/api/users/auth/forgotpassword", {
        emailOrUsername: emailorusername,
      });
      setProgress(70);
      toast.success("Email send successfully");
      setProgress(100);
      return;
    } catch (e: any) {
      toast.error(e.response.data.error || "Internal server error");
      return;
    }finally{
      setProgress(100);
      setDisabled(true);
    }
  };

  return (
    <>
      <LoadingBar
        color="blue"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
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
            onClick={onSubmit} disabled={disabled}
          >
            Send Password Reset Link
          </button>
        </main>
      </section>
    </>
  );
};

export default ForgotPassword;
