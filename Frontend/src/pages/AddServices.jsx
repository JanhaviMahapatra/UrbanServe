import { useState } from "react"
import api from "../services/api"
import {useNavigate} from "react-router-dom"
import "../Style/AddServices.css"

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
<div className="creation-wrapper">
<div className="service-form-card">
<h1>Add Service</h1>

<form onSubmit={handleSubmit} className="styled-form">

<div className="field-group">
<input
name="name"
placeholder="What is your service called?"
value={form.name}
onChange={handleChange}
required
/>
</div>

<div className="field-group">
<input
name="description"
placeholder="Describe what you offer..."
value={form.description}
onChange={handleChange}
required
/>
</div>

<div className="field-group">
<input
name="basePrice"
placeholder="Base Price (₹)"
type="number"
value={form.basePrice}
onChange={handleChange}
required
/>
</div>

<button type="submit" className="btn-create-service">
Publish Service
</button>
</form>
</div>
</div>
);
};
