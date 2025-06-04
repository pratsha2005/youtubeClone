import { Video } from "../models/video.models.js";
import { User } from "../models/user.models.js";
const getAllVideos = async(req, res) => {
    try {
        const videos = await Video.find().populate('user', 'channelName profile username createdAt')
        if(!videos) {
            throw new Error("Some error occurred in getting all videos")
        }

        return res
        .status(200)
        .json({
            message: "Videos received successfully",
            data: videos
        })

    } catch (error) {
        console.log("Some error occurred in getting all videos", error)
    }
}

const getVideoById = async(req, res) => {
    const { videoId } = req.params
    const video = await Video.findById(videoId)

    if(!video){
        throw new Error("Video Id Invalid")
    }

    return res
    .status(200)
    .json({
        message: "Video received successfully",
        data: video
    })
}

const uploadVideo = async(req, res) => {
    try {
        const {title, description, videoLink, thumbnail, videoType} = req.body
        if([title, description, thumbnail, videoLink].some((field) => field?.trim() === "")){
            throw new Error("Please fill in all fields")
        }
        const user = req.user
        const video = await Video.create({
            user: user._id,
            videoLink,
            title, 
            description,
            thumbnail, 
            videoType
        })
        if(!video){
            throw new Error("Some error occured in uploading the video")
        }
        return res
        .status(200)
        .json({
            message: "Video uploaded successfully",
            data: video
        })

    } catch (error) {
        console.log("Some error occurred in uploading video", error)
    }
}

const getVideosByUserId = async(req, res) => {
    try {
        const {userId} = req.params
        const videos = await Video.find({
            user: userId
        }).populate('user', 'channelName profile username createdAt')

        if(!videos){
            throw new Error("Some error occurred in getting videos for channel")
        }

        return res
        .status(200)
        .json({
            message: "Videos received successfully",
            data: videos
        })


    } catch (error) {
        console.log("Error occurred in getting videos for channel", error)
    }
}

export {
    getAllVideos,
    uploadVideo,
    getVideoById,
    getVideosByUserId
}