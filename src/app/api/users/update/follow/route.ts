// Put Request

import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import connect from "@/config/db";

connect();
export async function PUT(request: NextRequest) {
    try {

        const reqBody = await request.json();
        const { targetUserid } = reqBody;

        // validating logged in user
        const token: any = request.cookies.get("token");
        if (!token) {
            return NextResponse.json({ error: "Token not found" }, { status: 401 });
        }
        const decodedToken: string | object = jwt.verify(token.value, process.env.TOKEN_SECRET!);
        const userId = (decodedToken as { id: string }).id;
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: "Invalid Token or Session Expired" }, { status: 401 });
        }

        const targetUser: any = await User.findById(targetUserid);
        if (!targetUser) {
            return NextResponse.json({ error: "Target user not found" }, { status: 404 });
        }

        if (userId === targetUserid) {
            return NextResponse.json({ error: "You can't follow yourself" }, { status: 401 });
        }

        user.following.push(targetUserid);
        targetUser.followers.push(userId);

        await user.save();
        await targetUser.save();

        return NextResponse.json({ message: "Followed" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}