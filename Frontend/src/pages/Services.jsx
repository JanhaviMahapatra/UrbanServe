import { useEffect,useState } from "react"
import {useNavigate} from "react-router-dom"
import "../Style/Services.css"


import api from "../services/api"

function Services(){
const[services,setServices]=useState([])
const navigate=useNavigate()

useEffect(()=>{
const fetchServices=async ()=>{

const res=await api.get("/provider/services")

setServices(res.data)
}
fetchServices()
},[])

return(
<div className="container">
<h2>Available services</h2>  

<button className="btn-nav" onClick={() => navigate("/my-bookings")}>
My Bookings
</button>

<div className="services-grid">
{services.map((service) => (
<div key={service.id} className="service-card">
<strong>{service.name}</strong>
<p>{service.description}</p>
<p className="price">₹{service.basePrice}</p>
<button className="btn-book" onClick={() => navigate(`/booking/${service.id}`)}>
Book Now
</button>
</div> 
))}
</div>
</div>
);
};

export default Services