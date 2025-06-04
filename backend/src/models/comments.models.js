import mongoose, {Schema} from "mongoose";

const commentSchema = mongoose.Schema({
    video: {
        type: Schema.Types.ObjectId,
        ref: "Video",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, {timestamps: true})

export const Comment = mongoose.model("Comment", commentSchema)
