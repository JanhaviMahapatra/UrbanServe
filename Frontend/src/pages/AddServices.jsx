import { useState } from "react"
import api from "../services/api"
import {useNavigate} from "react-router-dom"

export default function AddService(){
const navigate=useNavigate()

const[form,setForm]=useState({
name:"",
description:"",
basePrice:""
})

const handleChange=(e)=>{
setForm({
...form,
[e.target.name]:e.target.value
})
}

const handleSubmit=async(e)=>{
e.preventDefault()
try{
await api.post("/provider/service",{
name:form.name,
description:form.description,
basePrice:Number(form.basePrice)
})

alert("Service added successfully")
navigate("/provider")

setForm({
name: "",
description: "",
basePrice: ""
})

}catch(err){
alert("Failed to add service")
}
}

return(
<div>
<h1>Add Service</h1>

<form onSubmit={handleSubmit}>

<input
name="name"
placeholder="Service name"
value={form.name}
onChange={handleChange}
/>

<input
name="description"
placeholder="Description"
value={form.description}
onChange={handleChange}
/>

<input
name="basePrice"
placeholder="Price"
type="number"
value={form.basePrice}
onChange={handleChange}
/>

<button type="submit">
Add Service
</button>
</form>
</div>
)}
