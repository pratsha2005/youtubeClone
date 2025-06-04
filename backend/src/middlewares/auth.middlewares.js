import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js"

export const auth = async(req, res, next) => {
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({message: "Log in First"})
    }else{
        try {
            const decode = jwt.verify(token, process.env.SECRET_KEY)
            if(!decode){
                return res.status(401).json({message: "Invalid token"})
            }else{
                req.user = await User.findById(decode.userId).select("-password")
                next()
            }
        } catch (error) {
            res.send(401).json({
                message: "Unauthorised"
            })
        }
    }
}