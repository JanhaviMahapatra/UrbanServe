import { useEffect, useState } from "react"
import api from "../services/api"

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
<div>
<h1>My Services</h1>
{services.length === 0 && <p>No services yet</p>}
{services.map(service => (
<div key={service.id} style={{border:"1px solid gray", padding:"10px", margin:"10px"}}>
<h3>{service.name}</h3>
<p>{service.description}</p>
<p>₹{service.basePrice}</p>
<button onClick={() => deleteService(service.id)}>
Delete
</button>
</div>
))}
</div>
)}
