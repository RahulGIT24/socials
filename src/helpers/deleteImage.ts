import cloudinary from 'cloudinary';
import { v2 as cloudinaryV2 } from 'cloudinary';
import CLOUDINARY_SECRETS from "../../secrets";

cloudinary.v2.config({
    cloud_name: CLOUDINARY_SECRETS.CLOUD_NAME,
    api_key: CLOUDINARY_SECRETS.CLOUD_API_KEY,
    api_secret: CLOUDINARY_SECRETS.CLOUD_API_SECRET,
    secure: true
});

export default async function deleteImageFromCloud(publicId: string) {
    try {
        await cloudinaryV2.api.delete_resources(
            [publicId],
            { type: 'upload', resource_type: 'image' }
        );
        return true;
    } catch (e) {
        return false;
    }
}