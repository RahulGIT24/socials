import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    video: {
        type: String,
    },
    tags: {
        type: String,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    userPic: {
        type: String,
        default: ""
    },
    userName: {
        type: String,
        required: true,
        match: /^[a-z][a-z0-9_]{0,14}$/,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    ],
    shares: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
})

const Post = mongoose.models.posts || mongoose.model('posts', postSchema);
export default Post;