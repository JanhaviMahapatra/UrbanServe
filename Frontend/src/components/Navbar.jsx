import {Link, useNavigate} from "react-router-dom"
import "../Style/Navbar.css"

export default function Navbar(){

const navigate=useNavigate()

const token=localStorage.getItem("token")

const logout=()=>{
localStorage.removeItem("token")
navigate("/")
}

return (
<nav className="navbar">
<div className="nav-container">
<Link to="/" className="nav-logo">
<span className="logo-dot"></span>
<b>ServiceHub</b>
</Link>

<div className="nav-links">
{!token ? (
<>
<Link to="/login" className="nav-item">Login</Link>
<Link to="/register" className="nav-item nav-btn-primary">Register</Link>
</>
) : (
<>
<Link to="/my-bookings" className="nav-item">My Bookings</Link>
<Link to="/provider" className="nav-item">Provider Dashboard</Link>
<button onClick={logout} className="nav-logout-btn">
Logout
</button>
</>
)}
</div>
</div>
</nav>
);
};

