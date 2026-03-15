const prisma=require("../utils/prisma")

exports.createProviderProfile=async(req,res)=>{
try{
const userId=req.user.userId;
const {bio,location}=req.body 

const existing=await prisma.providerProfile.findUnique({
where:{userId}
})

if(existing){
return res.status(400).json({message:"Provider profile already exists!"})
}

const profile=await prisma.providerProfile.create({
data:{
userId,
bio,
location
}
})
res.status(200).json({message:"Provider profile created successfully!",profile})
}catch(error){
console.log("provider profile creation error:",error.message)
res.status(500).json({message:"Server Error"})
}
}

exports.addService=async (req,res)=>{
try{
const userId=req.user.userId

const {name,description,basePrice}=req.body

const provider=await prisma.providerProfile.findUnique({where:{userId}})  
if(!provider){
return res.status(400).json({message:"Provider doesn't exist!"})
}

const service=await prisma.service.create({
data:{
name,
description,
basePrice,
providerId:provider.id,
}
})

res.status(200).json({service})
}catch(error){
console.log("provider's service addOn error:",error.message)
res.status(500).json({message:"Server Error"})
}
}

exports.getServices=async (req,res)=>{
try{
const services=await prisma.service.findMany({
select:{
id:true,
name:true,
description:true,
basePrice:true,
provider:{
select:{
id:true,
location:true,
rating:true,
user:{
select:{
id:true,
name:true,
email:true
}
}
}
}
}
})
res.json(services)
}catch(error){
console.log("View service list error:",error.message)
res.status(500).json({message:"Server Error"})
}
}


exports.deleteService = async (req, res) => {
try{
const serviceId=parseInt(req.params.id)
const userId=req.user.userId

const provider=await prisma.providerProfile.findUnique({
where:{userId}
})

if(!provider){
return res.status(404).json({
message:"Provider not found"
})
}

const service=await prisma.service.findUnique({
where:{id:serviceId},
include:{bookings:true}
})

if (!service||service.providerId !== provider.id) {
return res.status(403).json({
message:"Not authorized to delete this service"
})
}

if (service.bookings.length>0){
return res.status(400).json({
message:"Cannot delete service with existing bookings"
})
}
await prisma.service.delete({
where:{id:serviceId}
})
res.json({
message: "Service deleted"
})
}catch(error){
console.log("Delete service error:", error)
res.status(500).json({message: "Server error"})
}}


/*Get Provider's Own Services*/
exports.getMyServices=async (req,res)=>{
try {
const userId=req.user.userId
const provider=await prisma.providerProfile.findUnique({
where:{userId}
})
if (!provider) {
return res.status(404).json({
message: "Provider profile not found"
})
}
const services = await prisma.service.findMany({
where: { providerId: provider.id }
})
res.json(services)
}catch(error){
console.log("Get my services error:",error)
res.status(500).json({error:error.message})
}
}
