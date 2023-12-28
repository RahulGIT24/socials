import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type ChildProps = {
  setProfilePic: React.Dispatch<React.SetStateAction<Boolean>>;
};

const Avatar = ({ setProfilePic }: ChildProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log(file);
      setSelectedFile(file);
    }
  };

  const handleSubmit = async () => {
    
  };

  const handleSkip = () => {
    router.push("/");
    setProfilePic(false);
  };

  return (
    <section>
      <main className="flex justify-center items-center flex-col">
        <Image
          priority
          className="rounded-full my-12"
          alt="profile-image"
          src={
            "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
          }
          width={300}
          height={300}
        />
        <p className="text-2xl font-semibold mb-6">
          Upload Your Profile Picture
        </p>
        <div className="flex justify-center mb-6 w-96 items-center">
          <label
            htmlFor="file-input"
            className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Upload Picture
          </label>
          <input
            id="file-input"
            accept="image/"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex justify-between mb-6 w-96 items-center">
          <button
            className="rounded-3xl border border-white py-3 font-semibold hover:bg-white hover:text-black hover:transition-all duration-200 ease-in-out hover:scale-95 px-16"
            onClick={handleSkip}
          >
            Skip
          </button>
          <button
            className="rounded-3xl border border-black bg-white text-black py-3 font-semibold hover:bg-black hover:text-white hover:transition-all duration-200 ease-in-out hover:scale-95 px-12 hover:border-white"
            onClick={handleSubmit}
          >
            Upload Image
          </button>
        </div>
      </main>
    </section>
  );
};

export default Avatar;
