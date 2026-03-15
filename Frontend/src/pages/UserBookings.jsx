import { useEffect,useState } from "react";
import api from "../Services/api";


export default function userBookings(){
const[bookings,setBookings]=useState([])

useEffect(()=>{
const fetchBookings=async()=>{
try{
const res=await api.get("/bookings/user")
setBookings(res.data.bookings)
}catch(error){
alert("Failed to load bookings!")
}
};
fetchBookings()
},[]);

return(
<div>
<h1>My bookings</h1>
{bookings.length===0 && <p>No bookings yet.</p>}
{bookings.map((booking)=>(
<div key={booking.id} style={{display:"grid",border:"1px solid black",margin:"10px",padding:"10px"}}>
<h2>{booking.service.name}</h2>
<strong>{booking.provider.user.name}</strong>
<strong>Date: {new Date(booking.date).toLocaleDateString()}</strong>
<strong>{booking.timeSlot}</strong>
<strong>{booking.status}</strong>
<strong>{booking.paymentStatus}</strong>
</div>  
))}
</div>
)
}