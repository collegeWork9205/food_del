import UserModal from "../models/UserModal.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import validator from 'validator'
import isStrongPassword from 'validator'

//Login User
const loginUser=async (req,res)=>{
   const {email,password}=req.body
    try {
         const user=await UserModal.findOne({email});
         if(!user){
            res.json({success:false,message:"User does not exist"})
         }
         const isMatch=await bcrypt.compare(password,user.password);
         if(!isMatch){
            res.json({success:false,message:"Invalid Credentials"})
         }

         const token=CreateToken(user._id);
         res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,error})
    }
    
}

//creating jwt auhtentication & auhtorization
const CreateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET_KEY);
}
//Register User
const RegisterUser=async (req,res)=>{
   const {name,password,email}=req.body;
   try {
    //checking is user exists 
     const exists=await UserModal.findOne({email});
     if(exists){
        return res.json({success:false,message:"User Already exists"})
     }
    
    //validating email format and password
    if(!validator.isEmail(email)){
        return res.json({success:false,message:"Please Enter Valid email"})
    } 
    if(password.length<8){
        return res.json({success:false,message:"The password Must have 9-15 chararcters"})
    }
    if(!validator.isStrongPassword(password)){
        return res.json({success:false,message:"The Password Must follow the Basic Password rule"})
    }
    //hasing user password
       const salt=await bcrypt.genSalt(10);
       const hashedPassword=await bcrypt.hash(password,salt);

    //new user registration
    const newUser=await UserModal({
        name:name,
        password:hashedPassword,
        email:email
    })
    console.log(newUser);
    const user=await newUser.save();
    const token=CreateToken(user._id)
    res.json({success:true,token})

   }catch (error) {
       console.log(error)
       res.json({success:false,data:error})
   }
}

export {loginUser,RegisterUser}