import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const registerUser = async (req, res) => {
    try {
        const {email, fullName, userName, password, confirmPassword, gender } = req.body;
        if (!email||!fullName || !userName || !password || !confirmPassword || !gender) {
          return res.status(400).json({ message: "All fields are required" });
      }
        
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password do not match" });
        }

        const user = await User.findOne({ userName });
        if (user) {
            return res.status(400).json({ message: "Username already exit try different" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        // profilePhoto
        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        await User.create({
            fullName,
            userName,
            password: hashedPassword,
            profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
            gender,
            email,
        });
        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
};

export const loginUser=async(req,res)=>{
  try {
    const {userName,email,password}=req.body
    if(!(userName||email)){
      return res.status(200).json({message:"please enter email or userName"})
    }

    if(!password){
      return res.status(200).json({message:"password not found"})
    }
    const user=await User.findOne({$or:[{userName},{email}]})
    if(!user){
      return res.status(400).json({message:"user not found"})
    }
    const tokenData={
      userId:user._id
    }
    const token=await jwt.sign(tokenData,process.env.JWT_SECRET_KEY ,{expiresIn:"1d"});
    return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,secure:true,samesite:'strict'}).json({
    _id:user._id,
    fullName:user.fullName,
    userName:user.userName,
    profilePhoto:user.profilePhoto
    })
  } catch (error) {
    
  }
}

export const logoutUser=async(req,res)=>{
 try {
  return res.status(200).cookie("token","",{maxAge:0}).json({message:"logout successfully"})
  // console.log("logout successfully");
  
 } catch (error) {
  console.log(error);
  
 }
}

export const getOtherUsers=async(req,res)=>{
  try {
    const loggedInUserId = req.id;
    const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
    return res.status(200).json(otherUsers);
  } 
  catch (error) {
    console.log(error); 
  }
}



