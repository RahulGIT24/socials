import connect from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import User from "@/models/userModel";

export async function POST(request: NextRequest) {
    try {
        await connect();
        const reqBody = await request.json();
        const { userName } = reqBody;

        if (!userName || userName === "") {
            const token: any = request.cookies.get("token");

            if (!token) {
                return NextResponse.json({ error: "Token not available" }, { status: 400 })
            }

            const decodedToken: any = jwt.verify(token.value, process.env.TOKEN_SECRET!);
            const userId = decodedToken.id;

            const user = await User.findById(userId);

            if (!user) {
                return NextResponse.json({ error: "Invalid token" }, { status: 400 })
            }
            decodedToken.pic = user.profilePic

            return NextResponse.json({ userDetails: decodedToken }, { status: 200 })
        }

    } catch (e: any) {
        console.log(e);
        return NextResponse.json({ error: e }, { status: 500 })
    }
}