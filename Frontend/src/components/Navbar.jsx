import {Link, useNavigate} from "react-router-dom"

export default function Navbar(){

const navigate=useNavigate()

const token=localStorage.getItem("token")

const logout=()=>{
localStorage.removeItem("token")
navigate("/")
}

return (

<nav style={{
display: "flex",
justifyContent: "space-between",
padding: "15px",
borderBottom: "1px solid #ccc"
}}>
<Link to="/">
<b>ServiceHub</b>
</Link>
<div style={{display:"flex", gap:"10px"}}>
{!token && (
<>
<Link to="/login">Login</Link>
<Link to="/register">Register</Link>
</>
)}
{token && (
<>
<Link to="/my-bookings">My Bookings</Link>
<Link to="/provider">Provider Dashboard</Link>
<button onClick={logout}>Logout</button>
</>
)}
</div>
</nav>
)}

