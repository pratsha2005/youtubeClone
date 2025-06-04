import {Router} from "express";
import {getAllVideos, uploadVideo, getVideoById, getVideosByUserId} 
from "../controllers/video.controllers.js"
import {auth} from "../middlewares/auth.middlewares.js"


const router = Router()

router.route("/get-all-videos").get(getAllVideos)
router.route("/upload-video").post(auth, uploadVideo)
router.route("/watch/:videoId").get(getVideoById)
router.route("/channel/:userId").get(getVideosByUserId)

export default router