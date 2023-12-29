import connect from "@/config/db";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from 'jsonwebtoken'

connect();

interface RequestBody {
    name: string;
    userName: string;
    email: string;
    password: string;
    gender: string;
    dateOfBirth: string;
}

export async function POST(request: NextRequest) {
    try {
        const reqBody: RequestBody = await request.json();
        const { name, userName, email, password, gender, dateOfBirth } = reqBody;

        const user = await User.findOne({ email: email });

        if (user) {
            return NextResponse.json({ error: "User already exist" }, { status: 400 })
        }

        const username = await User.findOne({ userName });
        if (username) {
            return NextResponse.json({ error: "Username already taken" }, { status: 400 })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            name,
            userName,
            email,
            password: hashedPassword,
            gender,
            dateOfBirth
        })

        const savedUser = await newUser.save();

        const tokenData = {
            id: savedUser._id,
            name: savedUser.name,
            username: savedUser.userName,
            pic: savedUser.profilePic
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "60d" })

        const response = NextResponse.json({
            message: "Welcome to Socials",
            token,
            success: true
        })

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;

    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}