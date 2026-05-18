import express from 'express'
import { loginUser,RegisterUser } from '../controller/UserController.js'

const UserRouter=express.Router();

UserRouter.post('/login',loginUser);
UserRouter.post('/register',RegisterUser);



export default UserRouter