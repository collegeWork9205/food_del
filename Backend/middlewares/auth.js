import jwt from 'jsonwebtoken'

const authMiddleware=async (req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        return res.json({success:false,message:"Not Authorized Login Again"})
    }
    try {
//checks token is valid and signed using secret key if true than return user data;
        const token_decode=jwt.verify(token,process.env.JWT_SECRET_KEY);
//this If-condtion's is created for path-("api/cart/get")beacuse where we doesn't pass any data to req.body        
        if(req.body===undefined){
//adding a new key in req->which is {userId} that store user's id from the token 
            req.userId=token_decode.id;
        }else{
//adding a new key in req.body->which is {userId} that store user's id from the token 
            req.body.userId=token_decode.id;
        }
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

export default authMiddleware;