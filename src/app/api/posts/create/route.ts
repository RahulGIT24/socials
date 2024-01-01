import connect from "@/config/db";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import Post from "@/models/postModel";


interface RequestBody {
    desc: string;
    tags: string;
    pic: string;
}

export async function POST(request: NextRequest) {
    try {
        connect();
        const reqBody: RequestBody = await request.json();
        const { desc, tags, pic } = reqBody;

        if (desc === "" && pic == null) {
            return NextResponse.json({ error: "Incomplete Information" }, { status: 400 })
        }

        const token: any = request.cookies.get("token");

        if (!token) {
            return NextResponse.json({ error: "Token not available" }, { status: 401 })
        }

        const decodedToken: string | object = jwt.verify(token.value, process.env.TOKEN_SECRET!);
        const userId = (decodedToken as { id: string }).id;

        const user = await User.findById(userId).select("-password");

        if (!user) {
            const res = NextResponse.json({
                error: "Session Expired",
            }, { status: 401 })
            res.cookies.set("token", "", { httpOnly: true, expires: new Date(0) })
            return res;
        }

        const newPost = new Post({
            name:user.name,
            description: desc,
            image: pic,
            tags: tags,
            creator: userId,
            userPic: user.profilePic,
            userName: user.userName
        })

        await newPost.save();
        return NextResponse.json({ message: "Posted Successfully" }, { status: 200 })

    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}