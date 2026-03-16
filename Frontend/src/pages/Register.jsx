import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Services/api";
import "../Style/Register.css"

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
<div className="auth-wrapper">
<form onSubmit={handleSubmit} className="register-form">
<h3 style={{ margin: '0 0 10px 0', color: 'var(--text-espresso)' }}>Create Account</h3>

<input 
type="text"  
name="name"
value={form.name}
placeholder="Full Name"
onChange={handleChange}
required
/>

<input 
type="email"  
name="email"
value={form.email}
placeholder="Email Address"
onChange={handleChange}
required
/>

<input 
type="password"  
name="password"
value={form.password}
placeholder="Create Password"
onChange={handleChange}
required
/>

<select name="role" value={form.role} onChange={handleChange}>
<option value="USER">Join as User</option>
<option value="PROVIDER">Join as Provider</option>
</select>

<button type="submit" className="btn-submit">
Register
</button>
</form>
</div>
  );
  };

  export default Register