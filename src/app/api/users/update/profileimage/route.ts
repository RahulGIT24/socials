import connect from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import User from "@/models/userModel";

export async function POST(request: NextRequest) {
    try {
        await connect();
        const reqBody = await request.json();
        const { url } = reqBody;
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

        user.profilePic = url;
        await user.save();

        return NextResponse.json({ message: "Profile pic updated" }, { status: 200 })

    } catch (e: any) {
        console.log(e);
        return NextResponse.json({ error: e }, { status: 500 })
    }
}