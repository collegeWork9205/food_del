import OrderModel from "../models/OrderModel.js"
import UserModel from '../models/UserModal.js'
import stripe from 'stripe'

const Stripe=new stripe(process.env.STRIPE_SECRET_KEY);

//placing user Order fro frontend
const PlaceOrder=async (req,res)=>{
    const frontend_url="https://food-del-frontend-5yeq.onrender.com";
    try {
        const newOrder=new OrderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save();
        await UserModel.findByIdAndUpdate(req.body.userId,{CartItem:{}})
        const line_items=req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100*40
            },
            quantity:item.quantity
        }))
        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*40
            },
            quantity:1
        })
        const session=await Stripe.checkout.sessions.create({
            line_items:line_items,
            mode:"payment",
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })
        res.json({success:true,session_url:session.url})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
    }
}

const verifyOrder=async (req,res)=>{
    console.log(req.body)
  const {success,orderId}=req.body
  try {
        if(success=="true"){
            await OrderModel.findByIdAndUpdate(orderId,{payment:true})
            res.json({success:true,message:"Paid SuccesFully"})
        }else{
            await OrderModel.findByIdAndDelete(orderId)
            res.json({success:false,message:"Payment Failed"})
        }
    }catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
  }
}
//to shw user's orders
const userOrders=async(req,res)=>{
try {
    const orders=await OrderModel.find({userId:req.body.userId});
    console.log("order"+orders)
    res.json({success:true,data:orders})
} catch (error) {
   console.log(error);
   res.json({success:false,message:"error"}) 
}

}

//Listing orders For Admin panel
const listOrders=async (req,res)=>{
    try {
        const orders=await OrderModel.find({});
        res.json({success:true,orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
    }

}
const UpdateStatus=async(req,res)=>{
  try {
    console.log(req.body.status);
     await OrderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
     res.json({success:true,message:"Status Updated"})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"error"})
  }
}
export {PlaceOrder,verifyOrder,userOrders,listOrders,UpdateStatus};
