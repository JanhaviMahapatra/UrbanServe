import { useEffect, useState } from "react"
import api from "../services/api"
import { useNavigate } from "react-router-dom"

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
<div>
<h1>Provider Dashboard</h1>

<button onClick={()=>navigate("/add-service")}>
Add Service
</button>

<button onClick={() => navigate("/my-services")}>
My Services
</button>


<button onClick={() => navigate("/create-provider-profile")}>
Create Provider Profile
</button>

{bookings.length === 0 && <p>No bookings yet</p>}
{bookings.map((booking)=>(
<div key={booking.id} style={{border:"1px solid gray", margin:"10px", padding:"10px"}}>
<h3>{booking.service.name}</h3>
<p>Customer: {booking.user.name}</p>
<p>Date: {new Date(booking.date).toLocaleDateString()}</p>
<p>Time: {booking.timeSlot}</p>
<p>Status: {booking.status}</p>
<p>Payment: {booking.paymentStatus}</p>
{booking.status === "PENDING"&&(
<>
<button onClick={()=>updateStatus(booking.id,"accept")}>
Accept
</button>

<button onClick={()=>updateStatus(booking.id,"reject")}>
Reject
</button>
</>
)}

{booking.status === "ACCEPTED" && (
<button onClick={()=>updateStatus(booking.id,"complete")}>
Mark Completed
</button>
)}
</div>
))}
</div>
)}
