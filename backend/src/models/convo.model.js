import mongoose from "mongoose";
const conversationModel=new mongoose.Schema({
    participants:[{
        type:mongoose.Types.ObjectId,
        ref:"User",
    }],
    messages:[{
        type:mongoose.Types.ObjectId,
        ref:"Message"
    }]

},{timestamps:true})

export const Conversation=mongoose.model("Conversation",conversationModel)