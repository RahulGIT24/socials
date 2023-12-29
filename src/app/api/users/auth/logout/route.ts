import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = NextResponse.json({
            message: "Logout Successful",
            success: true
        })

        res.cookies.set("token", "", { httpOnly: true, expires: new Date(0) })

        return res;
    } catch (err: any) {
        return NextResponse.json({
            error: err.message,
        }, { status: 500 },)
    }
}