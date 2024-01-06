import axios from "axios";


async function getLoggedInUserId() {
    try {
        const res = await axios.post("/api/users/fetch/profile", { userName: "" });
        return res.data.user;
    } catch (e) {
        return;
    }
}

async function getTargetUserId(userName: string) {
    try {
        const res = await axios.post("/api/users/fetch/profile", { userName });
        return res.data.user._id;
    } catch (error) {
        return;
    }
}

export async function isFollowed(userName: string) {
    try {
        const user: any = await getLoggedInUserId();
        const targetUserid: string = await getTargetUserId(userName);
        if (!targetUserid) return;
        if (user._id === targetUserid) return;
        for (let index = 0; index < user.following.length; index++) {
            if(user.following[index] === targetUserid){
                return true;
            }
        }
        return false;
    } catch (e) {
        return;
    }
}
