import { useEffect,useState } from "react"
import {useNavigate} from "react-router-dom"


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
<div>
<h2>Available services</h2>  

<button onClick={() => navigate("/my-bookings")} style={{marginBottom:20}}>
My Bookings
</button>

{services.map((service)=>(
<div key={service.id}>
<strong>{service.name}</strong>
<p>{service.description}</p>
<p>₹{service.basePrice}</p>
<button onClick={()=>navigate(`/booking/${service.id}`)}>Book Now</button>
</div> 
))}

</div>
)
}

export default Services