"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoadingBar from "react-top-loading-bar";

const Login = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState<{
    usernameOrEmail: string;
    password: string;
  }>({
    usernameOrEmail: "",
    password: "",
  });

  const [progress, setProgress] = useState<number>(0);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (credentials.password.length < 8) {
      toast.error("Password Length Should be at least 8 characters");
      return;
    }

    if (!credentials.usernameOrEmail || !credentials.password) {
      toast.error("Fill the required fields");
      return;
    }

    try {
      setProgress(30);
      await axios.post("/api/users/auth/login", {
        usernameOrEmail: credentials.usernameOrEmail,
        password: credentials.password,
      });
      setProgress(70);
      toast.success("Login Succeed");
      router.push("/");
      setProgress(100);
    } catch (e: any) {
      setProgress(0);
      console.log(e);
      toast.error(e.message);
      return;
    }
  };

  return (
    <>
    <LoadingBar
        color='blue'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <section className="w-full h-screen flex justify-center items-center flex-col">
        <h1 className="text-center py-12 text-4xl font-medium">
          Welcome Back!
        </h1>
        <main className="flex justify-center items-center flex-col w-full">
          <form className="flex justify-center items-center flex-col">
            <input
              type="text"
              name="email"
              placeholder="Enter your email or username"
              className="px-2 py-3 rounded-lg bg-transparent text-white mb-3 border border-white"
              onChange={(e) => {
                setCredentials({
                  ...credentials,
                  usernameOrEmail: e.target.value,
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
                setCredentials({
                  ...credentials,
                  password: e.target.value,
                });
              }}
              required
            />
          </form>
          <p className="text-blue-500 font-semibold mb-4 hover:underline">
            <Link href={"/forgotpassword"}>Forgot Password?</Link>
          </p>
          <button
            className="rounded-3xl border border-white px-24 py-3 font-semibold hover:bg-white hover:text-black hover:transition-all duration-200 ease-in-out hover:scale-95"
            onClick={onSubmit}
          >
            Log In
          </button>
          <p className="my-4 font-bold text-xl">OR</p>
          <p className="text-blue-500 font-semibold mb-4 hover:underline">
            <Link href={"/signup"}>Create a new account</Link>
          </p>
        </main>
      </section>
    </>
  );
};

export default Login;
