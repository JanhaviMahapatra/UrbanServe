const jwt=require("jsonwebtoken");

/*Checks if it's a valid user user or not by verifying them by their tokens*/
const authMiddleware=async (req,res,next)=>{
try{
const authHeader=req.headers.authorization
if(!authHeader||!authHeader.startsWith("Bearer")){
return res.status(400).json({message:"No token provided!"})
}

const token=authHeader.split(" ")[1];

const decoded=await jwt.verify(token,process.env.JWT_SECRET)

req.user=decoded

next()
}catch(error){
console.log("Middleware error:",error.message);
return res.status(500).json({message:"Server error"})
}
};

module.exports=authMiddleware;