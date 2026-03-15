const prisma=require("../utils/prisma")
//For the user.
/*__________________*/
exports.createBooking=async (req,res)=>{
try{
const userId=req.user.userId

const{serviceId,date,timeSlot}=req.body 

const service=await prisma.service.findUnique({
where:{id:serviceId},
include:{
provider:true
}
})
if(!service){
return res.status(404).json({message:"Service not found!"})
}

const booking=await prisma.booking.create({
data:{
userId,
providerId:service.provider.id,
serviceId,
date:new Date(date),
timeSlot
}
})

res.status(200).json({message:"Booking Created!:)",booking})
}catch(error){
console.log("Booking creation error:",error.message)
res.status(500).json({message:"Server Error!"})
}
}
/*__________________*/
exports.getUserBookings=async (req,res)=>{
try{
 const userId = req.user.userId

const bookings=await prisma.booking.findMany({
where:{userId},
include:{
service:true,
provider:{
include:{
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

res.status(200).json({bookings})
}catch(error){
console.log("Getting Bookings data error:",error.message)
res.status(500).json({message:"Server Error!"})
}
}

/*__________________*/
exports.updateBookingStatus=async(req,res)=>{
try{
const bookingId=parseInt(req.params.id)

const{status}=req.body

const booking=await prisma.booking.update({
where:{id:bookingId},
data:{status}
})

res.status(200).json({message:"Booking updated",booking})

}catch(error){
console.log("Getting Bookings data error(user):",error.message)
res.status(500).json({message:"Server Error!"})
}
}

/*For the Provider*/
/*_________________*/
exports.getProviderBookings=async (req,res)=>{
try{
const userId=req.user.userId

const provider=await prisma.providerProfile.findUnique({
where:{userId}
})

if(!provider){
return res.status(404).json({message:"Provider profile not found"})
}

const bookings=await prisma.booking.findMany({
where:{providerId:provider.id},
include:{
service:true,
user:{
select:{
id:true,
name:true,
email:true,
}
}
}  
})
res.status(200).json({bookings})
}catch(error){
console.log("Getting Bookings data error(provider):",error.message)
res.status(500).json({message:"Server Error!"})
}
}

/*_________________*/
exports.acceptBooking=async (req,res)=>{
try{
const bookingId=parseInt(req.params.id)
const userId=req.user.userId

const booking=await prisma.booking.findUnique({where:{id:bookingId}})

const provider=await prisma.providerProfile.findUnique({where:{id:userId}})

if(booking.providerId!==provider.id){
res.status(403).json({message:"Not authorized"})
}

const updated=await prisma.booking.update({
where:{id:bookingId},
data:{
status:"ACCEPTED"
}
})

res.status(200).json({updated})
}catch(error){
console.log("Getting Bookings data error(provider):",error.message)
res.status(500).json({message:"Server Error!"})
}
}

/*_________________*/
exports.rejectBooking=async (req,res)=>{
try{
const bookingId=parseInt(req.params.id)
const userId=req.user.userId

const booking=await prisma.booking.findUnique({where:{id:bookingId}})

const provider=await prisma.providerProfile.findUnique({where:{id:userId}})

if(booking.providerId!==provider.id){
res.status(403).json({message:"Not authorized"})
}

const updated=await prisma.booking.update({
where:{id:bookingId},
data:{
status:"REJECTED"
}
})

res.status(200).json({updated})
}catch(error){
console.log("Getting Bookings data error(provider):",error.message)
res.status(500).json({message:"Server Error!"})
}
}

/*_________________*/
exports.completeBooking=async (req,res)=>{
try{
const bookingId=parseInt(req.params.id)
const userId=req.user.userId

const booking=await prisma.booking.findUnique({where:{id:bookingId}})

const provider=await prisma.providerProfile.findUnique({where:{id:userId}})

if(booking.providerId!==provider.id){
res.status(403).json({message:"Not authorized"})
}

const updated=await prisma.booking.update({
where:{id:bookingId},
data:{
status:"COMPLETED"
}
})

res.status(200).json({updated})
}catch(error){
console.log("Getting Bookings data error(provider):",error.message)
res.status(500).json({message:"Server Error!"})
}
}

