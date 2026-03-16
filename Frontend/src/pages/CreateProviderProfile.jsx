import { useState } from "react"
import api from "../services/api"
import { useNavigate } from "react-router-dom"
import "../Style/CreateProviderProfile.css"

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
<div className="profile-page">
<div className="profile-card">
<h1>Create Provider Profile</h1>
<span className="profile-subtitle">Tell the world what you do best.</span>

<form onSubmit={handleSubmit} className="profile-form">

<div className="input-field-wrapper">
<label>Professional Bio</label>
<input
placeholder="Briefly describe your services..."
value={bio}
onChange={(e) => setBio(e.target.value)}
required
/>
</div>

<div className="input-field-wrapper">
<label>Location</label>
<input
placeholder="City, Country"
value={location}
onChange={(e) => setLocation(e.target.value)}
required
/>
</div>

<button type="submit" className="btn-save-profile">
Complete Profile
</button>

</form>
</div>
</div>
);
};

