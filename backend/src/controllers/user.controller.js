import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

const cookieOptions = {
    httpOnly: true,
    secure: false,
}

const signUp = async(req, res) =>{
    try {
        const {username, password, profile, channelName, about} = req.body

        if([username, channelName, profile, password].some((field) => field?.trim() === "")){
            throw new Error("Please fill in all fields")
        }
        
        const existedUser = await User.findOne({
            $or: [{username}, {channelName}]
        })

        if(existedUser){
            throw new Error("Username or Channel Name already exists")
        }

        const user = await User.create({
            username, password, profile, channelName, about
        })

        const createdUser = User.findById(user._id).select(
            "-password"
        )

        if(!createdUser){
            throw new Error("Failed to create user")
        }
        
        const token = jwt.sign({userId: createdUser._id}, process.env.SECRET_KEY)

        return res
        .status(201)
        .cookie('token', token, cookieOptions)
        .json({
            message: "User created successfully",
            data: createdUser.schema,
            token: token
        })
        

    } catch (error) {
        res.status(500).json({
            message: "Error in signing user in: " + error.message
        })
    }
}

const login = async(req, res) => {
    try {
        const {username, password} = req.body
        const user = await User.findOne({username})
        if(!user){
            throw new Error("User not found")
        }

        const isValidPassword = await user.isPasswordCorrect(password)
        if(!isValidPassword){
            throw new Error("Invalid password")
        }

        const token = jwt.sign({userId: user._id}, process.env.SECRET_KEY)

        return res
        .status(200)
        .cookie('token', token, cookieOptions)
        .json({
            message: "User logged in successfully",
            data: user,
            token: token
        })
        


    } catch (error) {
        res.status(500).json({
            message: "Error in logging user in: " + error.message
        })
    }
}


const logout = (req, res) => {
    res
    .status(200)
    .clearCookie('token', cookieOptions)
    .json({
        message: "User logged out successfully"
    })
}

export {
    signUp,
    login,
    logout
}