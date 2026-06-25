import mongoose, { Schema } from "mongoose";

const likeSchema = Schema({
    user: {
        type: "Schema.Types.ObjectId",
        ref: "User"
    },
    video: {
        type: "Schema.Types.ObjectId",
        ref: "Video"
    }
},
    { timestamps: true }, { unique: true }
)

export const Like = mongoose.model("Like" , likeSchema)