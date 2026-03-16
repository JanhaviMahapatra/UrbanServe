import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../Style/Login.css"

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
<div className="login-page">
<div className="login-card">
<h2>Welcome back</h2>

<form onSubmit={handleSubmit} className="login-form">
<input
type="email"
name="email"
value={form.email}
placeholder="Email address"
onChange={handleChange}
required
/>

<input
type="password"
name="password"
value={form.password}
placeholder="Password"
onChange={handleChange}
required
/>

<button type="submit" className="btn-login">
Sign In
</button>
</form>

<div className="login-footer">
<p>Don't have an account? <a href="/register" className="login-link">Create one</a></p>
</div>
</div>
</div>
);
};