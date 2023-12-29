import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import connect from "@/config/db";

interface UserInfo {
    usernameOrEmail: string,
    password: string
}

export async function POST(request: NextRequest) {
    try {
        await connect();
        const reqBody: UserInfo = await request.json();
        const { usernameOrEmail, password } = reqBody;

        let user = await User.findOne({ userName: usernameOrEmail });

        if (!user) {
            user = await User.findOne({ email: usernameOrEmail });
        }

        if (!user) {
            return NextResponse.json({ error: 'Invalid Email or username' }, { status: 400 });
        }

        const passwordCompare = await bcryptjs.compare(password, user.password);

        if (!passwordCompare) {
            return NextResponse.json({ message: "Please login with correct credentials" }, { status: 400 });
        }

        const tokenData = {
            id: user._id,
            name: user.name,
            username: user.userName,
            pic: user.profilePic
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "60d" })

        const response = NextResponse.json({
            message: "Login Successfull",
            token,
            success: true
        })

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;

    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}