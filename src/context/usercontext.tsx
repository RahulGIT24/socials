// contexts/YourContext.tsx
import axios from "axios";
import { createContext, useState, useContext, ReactNode } from "react";
import toast from "react-hot-toast";

interface UserContextProps {
  children: ReactNode;
}

interface UserContextValue {
  userState: any;
  setuserState: (value: any) => void;
  getUser: (value: any) => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserContextProvider: React.FC<UserContextProps> = ({
  children,
}) => {
  const [userState, setuserState] = useState<{
    id: string;
    backgroundImage: string;
    name: string;
    username: string;
    profilePic: string;
    bio: string;
    followers: any;
    following: any;
    joined: string;
    location: string;
    webLink: string;
    dateofbirth: string;
    gender: string;
    email:string
  }>({
    id: "",
    backgroundImage: "",
    name: "",
    username: "",
    profilePic:
      "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
    bio: "",
    joined: "",
    location: "",
    webLink: "",
    followers: [],
    following: [],
    dateofbirth: "",
    gender: "",
    email:""
  });

  const getUser = async (userName: any) => {
    try {
      const res = await axios.post("/api/users/fetch/profile", {
        userName,
      });
      setuserState({
        id: res.data.user._id,
        backgroundImage: res.data.user.backgroundImage,
        name: res.data.user.name,
        username: "@" + res.data.user.userName,
        profilePic: res.data.user.profilePic,
        bio: res.data.user.bio,
        followers: res.data.user.followers,
        joined: res.data.user.createdAt,
        location: res.data.user.location,
        webLink: res.data.user.weblink,
        following: res.data.user.following,
        dateofbirth: res.data.user.dateOfBirth,
        gender: res.data.user.gender,
        email: res.data.user.email,
      });
    } catch (e: any) {
      toast.error(e.response.data.error);
      return;
    }
  };

  const contextValue: UserContextValue = {
    userState,
    setuserState,
    getUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUserContext = (): UserContextValue => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }

  return context;
};
