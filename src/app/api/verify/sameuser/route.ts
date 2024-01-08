import connect from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import User from "@/models/userModel";

export async function POST(request: NextRequest) {
    try {
        await connect();
        const loggedIn = false;
        const isSameUser = false;

        const reqBody = await request.json();
        const { userName } = reqBody;

        const token: any = request.cookies.get("token");
        if (!token) {
            return NextResponse.json({ loggedIn, isSameUser }, { status: 200 })
        }

        const decodedToken: string | object = jwt.verify(token.value, process.env.TOKEN_SECRET!);
        const userId = (decodedToken as { id: string }).id;
        const user = await User.findById(userId);

        if (!user) {
            const res = NextResponse.json({
                loggedIn, isSameUser
            }, { status: 200 })
            res.cookies.set("token", "", { httpOnly: true, expires: new Date(0) })
            return res;
        }

        if(!userName || userName === ""){
            return NextResponse.json({ loggedIn: true, isSameUser: false }, { status: 200 })
        } 

        const otherUser = await User.findOne({ userName });
        if (!otherUser) {
            return NextResponse.json({ error: "The user you requested is not existed" }, { status: 400 })
        }   

        if (user.id == otherUser.id) {
            return NextResponse.json({ loggedIn: true, isSameUser: true }, { status: 200 })
        } else {
            return NextResponse.json({ loggedIn: true, isSameUser: false }, { status: 200 })
        }

    } catch (e: any) {
        return NextResponse.json({ error: e }, { status: 500 })
    }
}