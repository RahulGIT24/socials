import connect from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import User from "@/models/userModel";
import Post from "@/models/postModel";
import deleteImageFromCloud from "@/helpers/deleteImage";

export async function PUT(request: NextRequest) {
    try {
        await connect();
        const reqBody = await request.json();
        const { url, postId } = reqBody;
        const token: { value: string } | undefined = request.cookies.get("token");

        if (!token) {
            return NextResponse.json({ error: "Token not available" }, { status: 400 })
        }

        const decodedToken: string | object = jwt.verify(token.value, process.env.TOKEN_SECRET!);
        const userId = (decodedToken as { id: string }).id;

        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 })
        }

        const previousId = user.publicId;
        user.profilePic = url;
        user.publicId = postId;
        await user.save();
        await Post.updateMany({ creator: userId }, { $set: { userPic: url } });
        await Post.updateMany(
            { "comments.id": userId },
            { $set: { "comments.$.profilePic": url } }
        );
        await Post.updateMany(
            { "likes.id": userId },
            { $set: { "likes.$.profilePic": url } }
        );
        if (previousId) {
            await deleteImageFromCloud(previousId);
        }
        return NextResponse.json({ message: "Profile pic updated" }, { status: 200 })

    } catch (e: any) {
        return NextResponse.json({ error: e }, { status: 500 })
    }
}