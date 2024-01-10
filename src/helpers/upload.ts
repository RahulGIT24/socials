import axios from "axios";
import toast from "react-hot-toast";

export async function upload({ event, setDisabled, setProgress, postImage, setUploadData, setImageSrc }: any) {
    event.preventDefault();
    try {
        setDisabled(true);
        setProgress(30);
        const form = event.currentTarget;
        const res = await postImage(form);
        console.log(res);
        if (res === undefined) {
            throw new Error("Image can't be uploaded");
        }

        setProgress(70);
        await axios.put("/api/users/update/profileimage", {
            url: res.url,
            postId:res.postId
        });
        setProgress(100);
        setUploadData(null);
        setImageSrc(null);
        return;
    } catch (e: any) {
        toast.error(e.response.data.error || "Internal server error");
        return;
    } finally {
        setProgress(100);
        setDisabled(false);
    }
}