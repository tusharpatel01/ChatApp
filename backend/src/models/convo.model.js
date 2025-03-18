import mongoose from "mongoose";
const convomodel=new mongoose.Schema({
    participants:[{
        type:mongoose.Types.ObjectId,
        ref:"User",
    }],
    messages:[{
        type:mongoose.Types.ObjectId,
        ref:"Message"
    }]

},{timestamps:true})

export const Convo=mongoose.model("Convo",convomodel)