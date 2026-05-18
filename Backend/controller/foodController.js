import FoodModel from "../models/foodModal.js";
import fs, { unlink } from 'fs'

//add food items
const addFood=async (req,res)=>{
  let image_filename=`${req.file.filename}`
  const food=new FoodModel({
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    category:req.body.category,
    image:image_filename
  })
  try{
       await food.save();
       res.json(food)
  }catch(error){
    console.log(error);
       res.json({success:false,message:"Error"})
  }
}
//ALL FOOD LIST
const foodlist=async (req,res)=>{
     try{
        const foods=await FoodModel.find({});
        res.json({success:true,data:foods})
        req.body=foods;
     }catch(err){
          console.log(err);
          res.json({success:true,message:"error"});
     }
}
//delete food
const removefood=async (req,res)=>{
  try{
     const food=await FoodModel.findById(req.body.id);
     fs.unlink(`uploads/${food.image}`,()=>{})
     await FoodModel.findByIdAndDelete(req.body.id);
     res.json({success:true,message:"data removed"});
  }catch(err){
     console.log(err);
     res.json({success:false,message:'error'});
  }
}


export {addFood,foodlist,removefood};