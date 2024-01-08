import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import User from "@/models/userModel";
import Post from "@/models/postModel";

export async function PUT(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { postId,comment } = reqBody;

        const token: any = request.cookies.get("token");
        if (!token) {
            return NextResponse.json({ error: "Token not found" }, { status: 401 });
        }

        const decodedToken: string | object = jwt.verify(token.value, process.env.TOKEN_SECRET!);
        const userId = (decodedToken as { id: string }).id;

        const post = await Post.findById(postId);
        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        const user = await User.findById(userId);
        if(!user){
            return NextResponse.json({ error: "Token expired" }, { status: 404 });
        }

        post.comments.push({
            id:user._id,
            name:user.name,
            comment:comment,
            userName:user.userName,
            profilePic:user.profilePic
        })

        await post.save();

        return NextResponse.json({ message: "Commented",post }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}