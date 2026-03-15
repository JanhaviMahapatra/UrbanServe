import { useState } from "react"
import api from "../services/api"
import { useNavigate } from "react-router-dom"

export default function CreateProviderProfile() {

const navigate=useNavigate()

const[bio,setBio]=useState("")
const[location,setLocation]=useState("")

const handleSubmit = async (e) => {
e.preventDefault()
try {
await api.post("/provider/profile",{
bio,
location
})
alert("Provider profile created")
navigate("/add-service")
}catch(err){
alert("Failed to create profile")
}
}

return (
<div>
<h1>Create Provider Profile</h1>

<form onSubmit={handleSubmit}>

<input
placeholder="Your Bio"
value={bio}
onChange={(e) => setBio(e.target.value)}
/>

<input
placeholder="Location"
value={location}
onChange={(e) => setLocation(e.target.value)}
/>

<button type="submit">Create Profile</button>
</form>
</div>
)}

