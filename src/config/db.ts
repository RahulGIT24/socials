import mongoose from "mongoose";

async function connect() {
    try {
        mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log("MongoDB Connected")
        })
    } catch (e) {
        console.log("Error while connecting to DB");
        console.log(e);
        return;
    }
}

export default connect;