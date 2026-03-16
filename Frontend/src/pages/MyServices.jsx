import { useEffect, useState } from "react"
import api from "../services/api"
import "../Style/MyServices.css"

export default function MyServices() {
const[services,setServices]=useState([])
const fetchServices =async()=>{
try{
const res=await api.get("/provider/my-services")
setServices(res.data)
}catch{
alert("Failed to load services")
}
}
useEffect(()=>{
fetchServices()
},[])

const deleteService = async (id) => {
try {
await api.delete(`/provider/service/${id}`)
alert("Service deleted")
fetchServices()
}catch(error){
console.log(error)
alert("Delete failed")
}}

return(
<div className="services-manage-container">
<h1>My Services</h1>

{services.length === 0 ? (
<div className="no-services">
<p>No services yet. Start by adding one to your profile.</p>
</div>
) : (
<div className="service-manage-list">
{services.map(service => (
<div key={service.id} className="service-item-card">
<div className="service-item-content">
<h3>{service.name}</h3>
<p>{service.description}</p>
<span className="service-item-price">₹{service.basePrice}</span>
</div>

<button 
className="btn-delete" 
onClick={() => deleteService(service.id)}
>
Delete
</button>
</div>
))}
</div>
)}
</div>
);
};
