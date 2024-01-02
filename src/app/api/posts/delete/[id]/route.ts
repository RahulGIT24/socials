import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { NextApiRequest } from "next";
import Post from "@/models/postModel";

export async function DELETE(request: NextRequest, req: NextApiRequest) {
    try {
        const { id } = req.query;
        const token: any = request.cookies.get("token");
        if (!token) {
            return NextResponse.json({ error: "Token not found" }, { status: 401 });
        }
        const decodedToken: string | object = jwt.verify(token.value, process.env.TOKEN_SECRET!);
        const userId = (decodedToken as { id: string }).id;
        const user = await User.findById(userId);
        if (!user) {
            const res = NextResponse.json({
                error: "Session expired"
            }, { status: 401 })
            res.cookies.set("token", "", { httpOnly: true, expires: new Date(0) })
            return res;
        }
        const post = await Post.findById(id);
        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 401 });
        }
        if (post.creator.toString() !== userId.toString()) {
            return NextResponse.json({ error: "You can't delete this post" }, { status: 401 });
        }
        await Post.findByIdAndDelete(id);
        return NextResponse.json({ message: "Post deleted!" }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}