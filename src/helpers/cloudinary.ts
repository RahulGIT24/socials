import CLOUDINARY_SECRETS from "../../secrets";

export const postImage = async (form: any) => {
    const CLOUD_NAME = CLOUDINARY_SECRETS.CLOUD_NAME;
    const UPLOAD_PRESET = CLOUDINARY_SECRETS.UPLOAD_PRESET;

    const fileInput: any = Array.from(form.elements).find(
        ({ name }: any) => name === "file"
    );

    const formData = new FormData();

    const file = fileInput?.files[0];
    formData.append("file", file);

    formData.append("upload_preset", UPLOAD_PRESET!);

    const data = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME!}/image/upload`,
        {
            method: "POST",
            body: formData,
        }
    ).then((r) => r.json());

    return data.secure_url;
};