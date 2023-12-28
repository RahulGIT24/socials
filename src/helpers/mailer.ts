import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({ email, userId }: any) => {
    try {
        // Create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        await User.findByIdAndUpdate(userId, {
            forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpiry: Date.now() + 3600000
        })

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAIL_TRAP_USER!,
                pass: process.env.MAIL_TRAP_PASS!
            }
        });

        const mailOptions = {
            from: 'workforrahul@gmail.com',
            to: email,
            subject: "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}">here</a> to Reset your Password
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/resetpassword/?token=${hashedToken}
            </p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);

        return mailResponse;

    } catch (e: any) {
        throw new Error(e.message);
    }
}