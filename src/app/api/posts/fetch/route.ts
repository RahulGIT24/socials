import Post from "@/models/postModel";
import connect from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { NextApiRequest } from "next";

interface RequestBody {
    type: string,
    postId: string,
    userId: string,
}

connect();

const getAllPosts = async () => {
    return Post.find().sort({ createdAt: -1 });
};

const getPostById = async (postId: string) => {
    return Post.findById(postId);
};

const getPostsByUserId = async (userId: string) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("Invalid user id");
    }
    return Post.find({ creator: userId }).sort({ createdAt: -1 });
};

// TODO
export async function POST(request: NextRequest, req: NextApiRequest) {
    try {
        const reqBody = await request.json();
        const { type, postId, userId }: RequestBody = reqBody;
        // const page: any = req.params.page || 1;
        // const pageSize = 20;
        // const skip = (page - 1) * pageSize;

        switch (type) {
            case "ALL":
                const allPosts = await getAllPosts();
                return NextResponse.json({ posts: allPosts }, { status: 200 });

            case "POSTID":
                const postById = await getPostById(postId);
                return NextResponse.json({ post: postById }, { status: 200 });

            case "USERID":
                const postsByUserId = await getPostsByUserId(userId);
                return NextResponse.json({ posts: postsByUserId }, { status: 200 });

            default:
                return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}