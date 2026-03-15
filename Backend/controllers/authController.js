const prisma=require("../utils/prisma");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

exports.register=async (req,res)=>{
try{
const{name,email,password,role}=req.body;

if(!name||!email||!password||!role){
return res.status(400).json({message:"All fields required!"})
}

const existingUser=await prisma.user.findUnique({
where:{email}
})

if(existingUser){
return res.status(400).json({message:"User already exists!"})
}

const salt=await bcrypt.genSalt(10);
const hashedPassword=await bcrypt.hash(password,salt);

const user=await prisma.user.create({
data:{
name,
email,
password:hashedPassword,
role
}
})

res.status(200).json({message:"User registered successfully!",user})
}catch(error){
res.status(500).json({error:error.message});
}
}

exports.login=async (req,res)=>{
try{
  const{email,password}=req.body;

if(!email||!password){
return res.status(400).json({message:"All fields required!"})
}

const user=await prisma.user.findUnique({where:{email}});
if(!user){
return res.status(400).json({message:"User not found"})
}

const isMatch=await bcrypt.compare(password,user.password);
if(!isMatch){
return res.status(400).json({message:"Invalid credentials!"});
}

const token=jwt.sign(
{userId:user.id,
role:user.role
},
process.env.JWT_SECRET,
{expiresIn:process.env.JWT_EXPIRES}
)

res.status(200).json({message:"Login successfull!",token,user});
}catch(error){
console.log("Login error:",error.message)
res.status(500).json({message:"Something went wrong"})
}
}