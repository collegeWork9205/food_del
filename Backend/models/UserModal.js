import mongoose, { Mongoose } from "mongoose";


const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    CartItem:{
        type:Object,
        default:{}
    }
},{minimize:false});

const UserModal=mongoose.model.User || mongoose.model('User',UserSchema)

export default UserModal;