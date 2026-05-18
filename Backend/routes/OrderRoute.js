import express from 'express'
import authMiddleware from '..//middlewares/auth.js'
import { listOrders, PlaceOrder, UpdateStatus, userOrders, verifyOrder } from '../controller/OrderController.js';

const OrderRouter=express.Router();

OrderRouter.post("/place",authMiddleware,PlaceOrder);
OrderRouter.post("/verify",verifyOrder)
OrderRouter.post("/userorders",authMiddleware,userOrders);
OrderRouter.get("/list",listOrders)
OrderRouter.post("/status",UpdateStatus)
export default OrderRouter;
