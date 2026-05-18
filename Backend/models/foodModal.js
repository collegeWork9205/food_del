import mongoose from "mongoose";

const foodSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    }
});

//if we run this file many time it will create again a new Modal to avoid this we use (||)or opertor and condition 
const FoodModel=mongoose.models.Food || mongoose.model('Food',foodSchema);

export default FoodModel;