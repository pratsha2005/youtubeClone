import {Comment} from '../models/comments.models.js';
import { Video } from '../models/video.models.js';

const addComment = async(req, res) => {
    try {
        const {videoId} = req.params
        const {comment} = req.body

        const video = await Video.findById(videoId)

        if(comment == ""){
            throw new Error("Comment cannot be empty")
        }
        const createdComment = await Comment.create({
            comment,
            video: video._id,
            user:  req.user._id
        })

        if(!createdComment){
            throw new Error("Some error occurred in adding comment")
        }

        return res
        .status(200)
        .json({
            message: "Comment added successfully",
            data: createdComment
        })
    } catch (error) {
        console.log(error)
    }
}

const getAllComments = async(req, res) => {
    try {
        const {videoId} = req.params
        const comments = await Comment.find({video: videoId}).populate('user', 'profile username createdAt channelName')
        if(!comments){
            throw new Error("No comments found")
        }

        return res
        .status(200)
        .json({
            message: "Comments fetched successfully",
            data: comments
        })
    } catch (error) {
        console.log(error)
    }
}

export {
    addComment,
    getAllComments
}