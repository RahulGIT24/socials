"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import LoadingBar from "react-top-loading-bar";

const ResetPassword = () => {
  const router = useRouter();
  const [disabled,setDisabled] = useState(false);
  const [token, setToken] = useState("");
  const [credentials, setCredentials] = useState<{
    password: string;
    cpassword: string;
  }>({
    password: "",
    cpassword: "",
  });

  const [progress, setProgress] = useState<number>(0);

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

      setProgress(50);
      setDisabled(true);
      await axios.post("/api/users/auth/resetpassword", {
        token,
        password,
      });
      setProgress(70);
      router.push("/login");
      toast.success("Password reset successfully");
      setProgress(100);
      return;
    } catch (e: any) {
      toast.error(e.response.data.error || "Internal server error");
      return;
    }finally{
      setProgress(100);
      setDisabled(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <>
      <LoadingBar
        color="blue"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
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
              className="px-2 py-3 rounded-lg bg-transparent text-white mb-4 border border-white outline-none"
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
              className="px-2 py-3 rounded-lg bg-transparent text-white mb-4 border border-white outline-none"
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
            onClick={onSubmit} disabled={disabled}
          >
            Reset Password
          </button>
        </main>
      </section>
    </>
  );
};

export default ResetPassword;
