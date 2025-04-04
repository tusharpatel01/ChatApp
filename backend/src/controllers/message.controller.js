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
      return res.status(200).json({message:"message send successfully"})


    } catch (error) {
        console.log(error);
        
    }
}

export const getMessage=async(req,res)=>{
  try {
    const senderId=req.id;
  const receiverId=req.params.id;
  const conversation=await Conversation.findOne({participants:{$all:[senderId,receiverId]}}).populate("messages");
  // console.log(conversation.messages);
  return res.status(201).json(conversation?.messages)
  
  } catch (error) {
    console.log(error);
    
  }

}