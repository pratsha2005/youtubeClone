import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({
    limit: '16kb'
}))
app.use(express.urlencoded({
    extended: true,
    limit: '16kb'
})) 
app.use(express.static('public'))
app.use(cookieParser())


import authRouter from "./routes/user.routes.js"
import videoRouter from "./routes/video.routes.js"
import commentRouter from "./routes/comments.routes.js"

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/video", videoRouter)
app.use("/api/v1/comment", commentRouter)


export { app }