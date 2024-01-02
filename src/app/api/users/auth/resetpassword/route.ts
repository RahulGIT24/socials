import connect from '@/config/db'
import { NextRequest, NextResponse } from "next/server"
import User from '@/models/userModel';
import bcryptjs from "bcryptjs"

connect();

export async function PUT(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token, password } = reqBody;

        const user = await User.findOne({ forgotPasswordToken: token, forgotPasswordTokenExpiry: { $gt: Date.now() } })

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        user.password = hashedPassword
        await user.save();

        return NextResponse.json({
            message: "Password Reset successfully",
            success: true,
            status: 200
        })

    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}