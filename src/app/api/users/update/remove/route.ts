// route to remove follower

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
            return NextResponse.json({ error: "You can't remove yourself" }, { status: 401 });
        }

        // Remove the target user from the following array of the logged-in user
        await User.findByIdAndUpdate(userId, { $pull: { followers: { id: targetUserid } } });

        // Remove the logged-in user from the followers array of the target user
        await User.findByIdAndUpdate(targetUserid, { $pull: { following: { id: userId } } });

        return NextResponse.json({ message: "Follower Removed", id: user._id }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}