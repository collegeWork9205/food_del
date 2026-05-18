import express from "express"
import cors from "cors"
import { connectDb } from "./config/db.js";
import FoodRouter from "./routes/foodRoute.js";
import UserRouter from "./routes/UserRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import OrderRouter from "./routes/OrderRoute.js";


//app config
const app=express();
const port=process.env.PORT || 4000;

//Middleware
app.use(express.json());
app.use(cors());

// connect DataBase
connectDb();

//api endpoints
app.use("/api/food",FoodRouter)
app.use("/images",express.static('uploads'))
app.use('/api/user',UserRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',OrderRouter)

//get middleware
app.get("/",(req,res)=>{
      res.send("you are on home page");
})

//start the server
app.listen(port,()=>{
    console.log(`server is listening on http://localhost:${port}`);
})
