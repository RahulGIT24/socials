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

            const decodedToken: string | object = jwt.verify(token.value, process.env.TOKEN_SECRET!);
            const userId = (decodedToken as { id: string }).id;

            const user = await User.findById(userId);

            if (!user) {
                const res = NextResponse.json({
                    error: "Session Expired",
                }, { status: 400 })
                res.cookies.set("token", "", { httpOnly: true, expires: new Date(0) })
                return res;
            }
            (decodedToken as { pic: string }).pic = user.profilePic

            return NextResponse.json({ userDetails: decodedToken }, { status: 200 })
        }

        const user = await User.findOne({ userName }).select("-password");
        if (!user) {
            return NextResponse.json({ error: "Invalid Request" }, { status: 404 })
        }

        return NextResponse.json({ user }, { status: 200 })

    } catch (e: any) {
        console.log(e);
        return NextResponse.json({ error: e }, { status: 500 })
    }
}