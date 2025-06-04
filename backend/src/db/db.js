import mongoose from "mongoose";

const connectDB = async() => {
    try {
        const connection = mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
        console.log("Connection Successful");
    } catch (error) {
        console.log("Error in connecting to database", error);
    }
}

export default connectDB;