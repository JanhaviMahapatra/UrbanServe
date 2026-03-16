import { useEffect,useState } from "react";
import api from "../services/api";
import "../Style/UserBookings.css"


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
<div className="dashboard-container">
<h1>My bookings</h1>

{bookings.length === 0 ? (
<p className="empty-msg">No bookings yet. Your future appointments will appear here.</p>
) : (
<div className="booking-list">
{bookings.map((booking) => (
<div key={booking.id} className="booking-item">

<div className="booking-info">
<h2>{booking.service.name}</h2>
<span className="provider-name">with {booking.provider.user.name}</span>

<div className="booking-details">
<span>📅{new Date(booking.date).toLocaleDateString()}</span>
<span>⏰{booking.timeSlot}</span>
</div>
</div>

<div className="status-container">
<span className="badge status-badge">{booking.status}</span>
<span className="badge payment-badge">{booking.paymentStatus}</span>
</div>

</div> 
))}
</div>
)}
</div>
);
};