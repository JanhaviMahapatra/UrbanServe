import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Services/api";

export default function Booking(){
const[date,setDate]=useState("") 
const[timeSlot,setTimeSlot]=useState("")

const {serviceId}=useParams()

const handleBooking=async ()=>{
if (!date || !timeSlot) {
  alert("Please select date and time")
  return
}
try{
/*Create booking*/  
const bookingRes=await api.post("/bookings",
{serviceId:Number(serviceId),
date,
timeSlot})

const booking=bookingRes.data.booking
/*Creating razorpay order*/
const orderRes=await api.post("/payments/create-order",{
bookingId:booking.id
})

const order=orderRes.data

const options={
key:"rzp_test_SQ2QGmoWyNyv4B",
amount:order.amount,
currency:order.currency,
order_id:order.id,

/*Config the payment gateway*/
handler:async function(response){
await api.post("/payments/verify",{
bookingId:booking.id,
razorpay_order_id:response.razorpay_order_id,
razorpay_payment_id:response.razorpay_payment_id,
razorpay_signature:response.razorpay_signature
})
alert("Payment successfull!")
},
modal: {
    ondismiss: function () {
      console.log("Payment popup closed")
    }
  }
}
/*This loads the checkout from Razorpay using the configuration i gave in options*/
const rzp=new window.Razorpay(options)
rzp.open()
}catch(error){
  alert("Booking failed")
}
}

return(
<div>
<h1>Book Service</h1>
<input
type="date"
onChange={(e)=>setDate(e.target.value)}
/>
<select onChange={(e)=>setTimeSlot(e.target.value)}>
<option>Select time</option>
<option>10AM-11AM</option>
<option>12PM-1PM</option>
<option>3PM-4PM</option>
<option>5PM-6PM</option>
</select>

<button onClick={handleBooking}>Book & Pay</button>
</div>  
)}