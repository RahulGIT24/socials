import Post from "@/models/postModel";
import connect from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import jwt from "jsonwebtoken"

interface RequestBody {
    type: string,
    postId: string,
}

connect();
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { type }: RequestBody = reqBody;

        if (type === "ALL") {
            const post = await Post.find({});
            return NextResponse.json({ post }, { status: 200 })
        }

        if (type === "POSTID") {
            const { postId } = reqBody;
            const post = await Post.findById(postId);
            return NextResponse.json({ post }, { status: 200 })
        }

        if (type === "USERID") {
            const token: any = request.cookies.get("token");
            if (!token) {
                return NextResponse.json({ error: "Token not found" }, { status: 401 });
            }
            const decodedToken: string | object = jwt.verify(token.value, process.env.TOKEN_SECRET!);
            const userId = (decodedToken as { id: string }).id;
            const user = await User.findById(userId);
            if (!user) {
                const res = NextResponse.json({
                    error: "Session expired"
                }, { status: 401 })
                res.cookies.set("token", "", { httpOnly: true, expires: new Date(0) })
                return res;
            }
            const post = await Post.find({ creator: userId });
            return NextResponse.json({ post }, { status: 200 })
        }

        return NextResponse.json({ error: "Invalid request" }, { status: 400 });

    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}