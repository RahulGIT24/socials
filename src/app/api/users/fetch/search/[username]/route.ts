import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import User from "@/models/userModel";
import connect from "@/config/db";

connect();
export async function GET(request: NextRequest, req: NextApiRequest) {
    try {

        // Checking if user exists
        const token: any = request.cookies.get("token");
        if (!token) {
            return NextResponse.json({ error: "Token not found" }, { status: 401 });
        }
        const decodedToken: string | object = jwt.verify(token.value, process.env.TOKEN_SECRET!);
        const userId = (decodedToken as { id: string }).id;
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: "Unauthorized access or Token expired" }, { status: 401 });
        }

        // Making search
        const keyword = { userName: { $regex: req.params.username, $options: "i" } };

        const users = await User.find(keyword).find({ _id: { $ne: userId } }).select('-password');


        return NextResponse.json({ users }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}