import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Services/api";
import "../Style/Booking.css"

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
<div className="booking-container">
<div className="booking-card">
<h1>Book Service</h1>

<div className="input-group">
<label>Select Date</label>
<input
type="date"
onChange={(e) => setDate(e.target.value)}
/>
</div>

<div className="input-group">
<label>Available Slots</label>
<select onChange={(e) => setTimeSlot(e.target.value)}>
<option value="">Choose a time...</option>
<option value="10-11">10:00 AM - 11:00 AM</option>
<option value="12-1">12:00 PM - 01:00 PM</option>
<option value="3-4">03:00 PM - 04:00 PM</option>
<option value="5-6">05:00 PM - 06:00 PM</option>
</select>
</div>

<button className="btn-pay" onClick={handleBooking}>
Confirm & Pay
</button>
</div>
</div>
);
};