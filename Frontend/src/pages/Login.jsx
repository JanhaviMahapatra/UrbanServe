import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login(){
const navigate=useNavigate()
const[form,setForm]=useState({
email:"",
password:""
})

const handleChange=(e)=>{
setForm((prev)=>
({
...prev,
[e.target.name]:e.target.value
}))
}

const handleSubmit=async(e)=>{
e.preventDefault()
try{

const res=await api.post("/auth/login",form)

localStorage.setItem("token",res.data.token)
localStorage.setItem("role", res.data.user.role)

if(res.data.user.role === "PROVIDER") {
navigate("/provider")
}else{
navigate("/")
}

alert("Login successfull!")
}catch(error){
alert(error.response?.data?.message || "Login error")
}
}

return(
<div>
<h2>Login</h2>
<form onSubmit={handleSubmit} style={{display:"grid",gap:10,maxWidth:300}}>
<input
type="text"
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
<button type="submit">Login</button>
</form>
</div>
)
}