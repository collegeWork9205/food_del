import express from 'express'
import { AddToCart,RemoveFormCart,getCart } from '../controller/CartController.js'
import authMiddleware from '../middlewares/auth.js';
const cartRouter=express.Router();
 
cartRouter.post("/add",authMiddleware,AddToCart);
cartRouter.post("/remove",authMiddleware,RemoveFormCart);
cartRouter.post("/get",authMiddleware,getCart)

export default cartRouter;