import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    userName: {
        type: String,
        required: [true, "Please provide a username"],
        unique: [true, "Username laready exist"],
        match: /^[a-z][a-z0-9_]{0,14}$/,
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: [true, "User already exist"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    },
    profilePic: {
        type: String,
        default: "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
    },
    backgroundImage: {
        type: String,
        default: "https://www.munichre.com/content/dam/munichre/global/images/royalty-free/GettyImages-1194981230.jpg/_jcr_content/renditions/cropped.3_to_1.jpg./cropped.3_to_1.jpg"
    },
    dateOfBirth: {
        type: String,
        required: [true, "Please provide your DOB"]
    },
    gender: {
        type: String,
        required: [true, "Please provide your gender"]
    },
    webLink: {
        type: String
    },
    location: {
        type: String,
    },
    bio: {
        type: String,
    },
    followers: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users"
            },
            name: String,
            userName: String,
            profilePic: String
        }
    ],
    following: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users"
            },
            name: String,
            userName: String,
            profilePic: String
        }
    ],
    blockList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "posts"
        }
    ],
    LikedPosts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "posts"
        }
    ],
    SharedPosts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "posts"
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
    isPrivate: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model('users', userSchema);
export default User;