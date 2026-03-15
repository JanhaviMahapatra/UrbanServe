import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Services/api";

function Register(){
const navigate=useNavigate()
const[form,setForm]=useState({
name:"",
email:"",
password:"",
role:"USER"
})

/*----------------------*/
const handleChange=(e)=>{
setForm((prev)=>
({
...prev,
[e.target.name]:e.target.value
}))
}

/*----------------------*/
const handleSubmit=async(e)=>{
e.preventDefault()
try{

await api.post("/auth/register",form)

alert("Account created successfully!")

navigate("/login")
}catch(error){
alert(error.response?.data?.message || "Register error")
}
}

return(
<div>
<form onSubmit={handleSubmit} style={{display:"grid",gap:10,maxWidth:300}}>
<input 
type="text"  
name="name"
value={form.name}
placeholder="Enter name"
onChange={handleChange}
/>
<input 
type="email"  
name="email"
value={form.email}
placeholder="Enter email"
onChange={handleChange}
/>
<input 
type="password"  
name="password"
value={form.password}
placeholder="Enter password"
onChange={handleChange}
/>

<select name="role" value={form.role} onChange={handleChange}>
<option value="USER">User</option>
<option value="PROVIDER">Provider</option>
</select>
<button type="submit">Register</button>
</form>
</div>
)
}

export default Register