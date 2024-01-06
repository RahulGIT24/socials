import axios from "axios";

export async function isSameUser(userName: string) {
    try {
        const res = await axios.post("/api/verify/sameuser", {
            userName
        })
        return {
            loggedIn: res.data.loggedIn,
            sameUser: res.data.isSameUser
        };
    } catch (e) {
        console.log(e);
        return e;
    }
}