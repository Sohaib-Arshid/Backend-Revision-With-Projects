import mongoose from "mongoose";
import { Video } from "../models/video.models.js";
import { Like } from "../models/like.models.js";
import { Subscription } from "../models/subscription.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const dashboardStats = asyncHandler(async (req, res) => {
    const user = req.user;

    if (!user) {
        throw new ApiError(401, "Unauthorized access");
    }

    const userId = new mongoose.Types.ObjectId(user._id);

    const [findVideo, subscriberCount] = await Promise.all([
        Video.aggregate([
            {
                $match: {
                    owner: userId
                }
            },
            {
                $lookup: {
                    from: "likes",
                    localField: "_id",
                    foreignField: "video",
                    as: "videoLikes"
                }
            },
            {
                $facet: {
                    totalvideoCount: [{ $count: "videoCount" }],
                    viewsStats: [
                        {
                            $group: {
                                _id: null,
                                totalViews: { $sum: "$views" },
                                avgViews: { $avg: "$views" },
                                totalLikes: { $sum: { $size: "$videoLikes" } }
                            }
                        }
                    ],
                    topViews: [
                        { $sort: { views: -1 } },
                        { $limit: 3 },
                        { $project: { title: 1, views: 1, videoFile: 1 } }
                    ],
                    recentVideo: [
                        { $sort: { createdAt: -1 } },
                        { $limit: 3 },
                        { $project: { title: 1, views: 1, videoFile: 1 } }
                    ]
                }
            }
        ]),

        Subscription.aggregate([
            {
                $match: {
                    channel: userId
                }
            },
            {
                $count: "totalSubscriber"
            }
        ])
    ]);

    return res.status(200).json({
        success: true,
        message: "Dashboard data fetched successfully",
        data: {
            stats: findVideo[0]?.viewsStats?.[0] || {
                totalvideoCount: 0,
                totalViews: 0,
                avgViews: 0,
                totalLikes: 0
            },
            subscribers: subscriberCount[0]?.totalSubscriber || 0,
            topVideos: findVideo[0]?.topViews || [],
            recentVideos: findVideo[0]?.recentVideo || []
        }
    });
});

export { dashboardStats };