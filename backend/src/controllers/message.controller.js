import { getReceiverSocketId } from "../index.js";
import { Conversation } from "../models/convo.model.js";
import { Message } from "../models/message.model.js";

export const sendMessage=async(req,res)=>{
    try {
        const senderId=req.id;
        // console.log(senderId);
        
        const receiverId=req.params.id
        // console.log(receiverId);
        
        const {message}=req.body
      let gotConversation= await Conversation.findOne({participants:{$all:[senderId,receiverId]}})
      if(!gotConversation){
        await Conversation.create({participants:[senderId,receiverId]})
      }

      const newMessage=await Message.create({
        senderId,
        receiverId,
        message
      })
      if(newMessage){
        gotConversation.messages.push(newMessage._id )
      }
      await gotConversation.save()

      //socket
      const receiverSocketId=getReceiverSocketId(receiverId)
      if(receiverSocketId){
        io.to(receiverSocketId).emit("getMessage",newMessage
        )
      }

      return res.status(200).json({newMessage})


    } catch (error) {
        console.log(error);
        
    }
}

export const getMessage = async (req,res) => {
  try {
      const receiverId = req.params.id;
      const senderId = req.id;
      const conversation = await Conversation.findOne({
          participants:{$all : [senderId, receiverId]}
      }).populate("messages"); 
      return res.status(200).json(conversation?.messages);
  } catch (error) {
      console.log(error);
  }
}