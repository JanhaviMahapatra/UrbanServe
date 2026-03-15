const prisma=require("../utils/prisma")
const razorpay=require("../utils/razorpay")

/*________________*/
exports.createOrder=async(req,res)=>{
try{
const {bookingId}=req.body 

const booking=await prisma.booking.findUnique({
where:{id:bookingId},
include:{service:true}
})

if(!booking){
return res.status(404).json({message:"Booking not found"})
}

const options={
amount:booking.service.basePrice*100,
currency:"INR",
receipt:`booking_${bookingId}`
}

const order=await razorpay.orders.create(options)
res.json(order)
}catch(error){
console.log("Creating razor pay order error:",error.message)
res.status(500).json({message:"Server Error!"})
}
}

/*________________*/
const crypto=require("crypto")

exports.verifyPayment=async (req,res)=>{
try{
const{
bookingId,
razorpay_order_id,
razorpay_payment_id,
razorpay_signature
}=req.body

const body=razorpay_order_id+"|"+razorpay_payment_id

const expectedSignature=crypto
.createHmac("sha256",process.env.RAZORPAY_KEY_SECRET)
.update(body.toString())
.digest("hex")

if(expectedSignature!==razorpay_signature){
return res.status(400).json({message:"Payment verification failed!"})
}

await prisma.booking.update({
where:{id:bookingId},
data:{
paymentStatus:"PAID",
razorpayPaymentId:razorpay_payment_id,
razorpayOrderId:razorpay_order_id
}
})  
res.json({message:"Payment successfull!"})
}catch(error){
console.log("Payment verification error:",error.message)
res.status(500).json({message:"Server Error!"})
}
}


