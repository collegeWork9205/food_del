import UserModel from '../models/UserModal.js'

//Add cart into the item
const AddToCart=async (req,res)=>{
    try {
      let userData=await UserModel.findById(req.body.userId);
      let cartData=await userData.CartItem;
      if(!cartData[req.body.itemId]){
          cartData[req.body.itemId]=1;
        }else{
            cartData[req.body.itemId]+=1;
        }
        await UserModel.findByIdAndUpdate(req.body.userId,{CartItem:cartData});
        res.json({success:true,message:"Food Added"})
    }catch (error){
      console.log(error);
      res.json({success:false,message:" Error"})
    }
}

//Remove from Cart
const RemoveFormCart=async (req,res)=>{
  try {
    let userData=await UserModel.findById(req.body.userId);
    let cartData=await userData.CartItem;
    if(cartData[req.body.itemId]>0){
        cartData[req.body.itemId]-=1;
    }
    await UserModel.findByIdAndUpdate(req.body.userId,{CartItem:cartData});
    res.json({success:true,message:"Removed From Cart"})
  } catch (error) {
    console.log(error);
    res.json({success:true,message:"Error"})
  }
}

//fetch Cart from User

const getCart=async (req,res)=>{
  try {
    let userData=await UserModel.findById(req.userId);
    let cartData=await userData.CartItem;
    res.json({success:true,cartData})
  } catch (error) {
    console.log(error);
    res.json({success:true,message:"Error"})
  }
}

export{AddToCart,RemoveFormCart,getCart}