import connect from '@/config/db'
import { NextRequest, NextResponse } from "next/server"
import User from '@/models/userModel';
import jwt from "jsonwebtoken";
import Post from '@/models/postModel';

connect();

export async function PUT(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { name, bio, weblink, location, gender } = reqBody;


        const token: { value: string } | undefined = request.cookies.get("token");

        if (!token) {
            return NextResponse.json({ error: "Token not available" }, { status: 400 })
        }

        const decodedToken: string | object = jwt.verify(token.value, process.env.TOKEN_SECRET!);
        const userId = (decodedToken as { id: string }).id;

        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({ error: "User not existed" }, { status: 400 });
        }

        user.name = name;
        user.bio = bio;
        user.webLink = weblink;
        user.location = location;
        user.gender = gender;
        await user.save();
        await Post.updateMany({ creator: userId }, { $set: { name: name } });
        await Post.updateMany(
            { "likes.id": userId },
            { $set: { "likes.$.name": name } }
        );

        await Post.updateMany(
            { "comments.id": userId },
            { $set: { "comments.$.name": name } }
        );

        return NextResponse.json({ message: "Profile Updated Successfully" }, { status: 200 });

    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}