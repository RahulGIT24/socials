"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const ResetPassword = () => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [credentials, setCredentials] = useState<{
    password: string;
    cpassword: string;
  }>({
    password: "",
    cpassword: "",
  });

  const [progress, setProgress] = useState<Number>(0);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const { password, cpassword } = credentials;

    try {
      if (cpassword != password) {
        toast.error("Confirm password and Password are not same");
        return;
      }

      if (password.length < 8) {
        toast.error("Password should be at least of 8 characters");
        return;
      }

      await axios.post("/api/users/auth/resetpassword", {
        token,
        password,
      });
      router.push("/login");
      toast.success("Password reset successfully");
      return;
    } catch (e: any) {
      toast.error(e.message);
      return;
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <>
      <section className="w-full h-screen flex justify-center items-center flex-col">
        <h1 className="text-center py-12 text-4xl font-medium">
          Create new Password
        </h1>
        <main className="flex justify-center items-center flex-col w-full">
          <form className="flex justify-center items-center flex-col">
            <input
              type="password"
              name="password"
              placeholder="Enter your new password"
              className="px-2 py-3 rounded-lg bg-transparent text-white mb-4 border border-white"
              onChange={(e) => {
                setCredentials({
                  ...credentials,
                  password: e.target.value,
                });
              }}
              required
            />
            <input
              type="password"
              name="cpassword"
              placeholder="Confirm Password"
              className="px-2 py-3 rounded-lg bg-transparent text-white mb-4 border border-white"
              onChange={(e) => {
                setCredentials({
                  ...credentials,
                  cpassword: e.target.value,
                });
              }}
              required
            />
          </form>
          <button
            className="rounded-3xl border border-white px-24 py-3 font-semibold hover:bg-white hover:text-black hover:transition-all duration-200 ease-in-out hover:scale-95"
            onClick={onSubmit}
          >
            Reset Password
          </button>
        </main>
      </section>
    </>
  );
};

export default ResetPassword;
