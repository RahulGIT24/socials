import axios from "axios";

export default async function getLikedPosts(){
    try {
        const res = await axios.post("/api/users/fetch/profile",{userName:""})
        return res.data.user.LikedPosts
    } catch (error) {
        return;
    }
}