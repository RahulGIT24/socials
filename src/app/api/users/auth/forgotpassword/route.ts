import connect from '@/config/db'
import { NextRequest, NextResponse } from "next/server"
import User from '@/models/userModel';
import { sendEmail } from '@/helpers/mailer';


export async function POST(request: NextRequest) {
    try {
        await connect();
        const reqbody = await request.json();
        const { emailOrUsername } = reqbody;

        let user = await User.findOne({ userName: emailOrUsername });

        if (!user) {
            user = await User.findOne({ email: emailOrUsername });
        }

        if (!user) {
            return NextResponse.json({ error: 'Invalid Email or username' }, { status: 400 });
        }

        // user id
        const id = user._id;
        const email = user.email;
        const response = await sendEmail({ email:email, userId: id });

        return NextResponse.json({
            message: "Email send successfully",
            res: response,
            sucess: true
        }, { status: 200 });

    } catch (e: any) {
        return NextResponse.json({ message: e.message }, { status: 500 });
    }
}