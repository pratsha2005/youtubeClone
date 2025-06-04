import { Router } from "express";
import {auth} from "../middlewares/auth.middlewares.js"
import {addComment, getAllComments} from "../controllers/comments.controllers.js"

const router = Router()

router.route('/add-comment/:videoId').post(auth, addComment)
router.route('/get-comments/:videoId').get(getAllComments)



export default router