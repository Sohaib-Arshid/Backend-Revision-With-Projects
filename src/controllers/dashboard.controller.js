import mongoose from "mongoose";
import { Video } from "../models/video.models.js";  
import { Like } from "../models/like.models.js";      
import { Subscription } from "../models/subscription.models.js";  
import { asyncHandler } from "../utils/asyncHandler.js";  
import { ApiError } from "../utils/ApiError.js";           
import { ApiResponse } from "../utils/ApiResponse.js";  

const dashboardStats = asyncHandler(async (req, res) => {
    const user = req.user;

    if (!user) {
        throw new ApiError(401, "unauthorized access")
    }

    const findVideo = await Video.aggregate([
        {
            $match: {
                owner: new mongoose.Types.ObjectId(user._id)
            }
        },
        {
            $count: "videoCount"
        }
    ])

    const totalVideo = findVideo.length > 0 ? findVideo[0].videoCount : 0;
    
})