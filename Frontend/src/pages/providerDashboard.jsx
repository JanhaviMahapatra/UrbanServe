import { useEffect, useState } from "react"
import api from "../services/api"
import { useNavigate } from "react-router-dom"
import "../Style/ProviderDashboard.css"

export default function ProviderDashboard(){

const navigate = useNavigate()
const[bookings,setBookings]=useState([])

const fetchBookings=async()=>{
try{
const res = await api.get("/bookings/provider")
setBookings(res.data.bookings)
}catch(err){
alert("Failed to load bookings")
}
}

useEffect(()=>{
fetchBookings()
},[])

const updateStatus=async(id,action)=>{
try{

await api.patch(`/bookings/${id}/${action}`)

fetchBookings()
}catch(err){
alert("Action failed")
}
}

/*If provider profile does not exist
redirect to create profile page*/
useEffect(()=>{
const checkProfile =async()=>{
try{
await api.get("/provider/my-services")
fetchBookings()
}catch{
navigate("/create-provider-profile")
}
}
checkProfile()
},[])


return(
<div className="dashboard-wrapper">
<div className="dashboard-header">
<h1>Provider Dashboard</h1>

<div className="action-bar">
<button className="btn-secondary" onClick={() => navigate("/add-service")}>
+ Add Service
</button>
<button className="btn-secondary" onClick={() => navigate("/my-services")}>
My Services
</button>
<button className="btn-secondary" onClick={() => navigate("/create-provider-profile")}>
Edit Profile
</button>
</div>
</div>

{bookings.length === 0 ? (
<div className="empty-msg">No bookings requested yet.</div>
) : (
<div className="booking-grid">
{bookings.map((booking) => (
<div key={booking.id} className="provider-card">
<h3>{booking.service.name}</h3>

<div className="info-row"><strong>Customer:</strong> {booking.user.name}</div>
<div className="info-row"><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</div>
<div className="info-row"><strong>Time:</strong> {booking.timeSlot}</div>
<div className="info-row"><strong>Status:</strong> {booking.status}</div>
<div className="info-row"><strong>Payment:</strong> {booking.paymentStatus}</div>

<div className="card-actions">
{booking.status === "PENDING" && (
<>
<button className="btn-action btn-accept" onClick={() => updateStatus(booking.id, "accept")}>
Accept
</button>
<button className="btn-action btn-reject" onClick={() => updateStatus(booking.id, "reject")}>
Reject
</button>
</>
)}

{booking.status === "ACCEPTED" && (
<button className="btn-action btn-complete" onClick={() => updateStatus(booking.id, "complete")}>
Mark Completed
</button>
)}
</div>
</div>
))}
</div>
)}
</div>
);
};
