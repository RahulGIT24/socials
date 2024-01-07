import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import User from "@/models/userModel";
import Post from "@/models/postModel";

export async function PUT(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { postId } = reqBody;

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

        // if the post is already liked by you
        const liked = await User.findOne({ _id: userId, LikedPosts: { $in: [postId] } })
        if (liked) {
            // Remove the target user from the following array of the logged-in user
            await User.findByIdAndUpdate(userId, { $pull: { LikedPosts: postId } });

            // Remove the logged-in user from the followers array of the target user
            await Post.findByIdAndUpdate(post, { $pull: { likes: { id: userId } } });

            return NextResponse.json({ message: "Unliked" }, { status: 200 });
        }

        const user = await User.findById(userId);

        // if you like the post
        user.LikedPosts.push(postId);
        post.likes.push({
            id: user._id,
            name: user.name,
            userName: user.userName,
            profilePic: user.profilePic
        })

        await user.save();
        await post.save();

        return NextResponse.json({ message: "Liked" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}