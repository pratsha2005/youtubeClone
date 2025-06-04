import mongoose, {Schema} from "mongoose";

const videoSchema = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    videoLink: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    videoType: {
        type: String,
        default: "All"
    },
    like: {
        type: Number,
        default: 0
    },
    dislike: {
        type: Number,
        default: 0
    },
}, {timestamps: true})

export const Video = mongoose.model("Video", videoSchema)

