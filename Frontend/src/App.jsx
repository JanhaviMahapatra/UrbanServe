import {BrowserRouter,Routes,Route } from "react-router-dom";
import Services from "./pages/Services";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Booking from "./pages/Booking"
import UserBookings from "./pages/UserBookings";
import CreateProviderProfile from "./pages/CreateProviderProfile";
import ProviderDashboard from "./pages/providerDashboard";
import AddService from "./pages/AddServices"
import MyServices from "./pages/MyServices"
import AIChatbot from "./components/AIChatbot"
import Navbar from "./components/Navbar"


function App(){
return(
<BrowserRouter>
<Navbar/>
<Routes>
<Route path="/"  element={<Services/>}></Route> 
<Route path="/register"  element={<Register/>}></Route> 
<Route path="/login"  element={<Login/>}></Route> 
<Route path="/booking/:serviceId" element={<Booking />} />
<Route path="/my-bookings" element={<UserBookings/>} />
<Route path="/create-provider-profile" element={<CreateProviderProfile/>} />
<Route path="/provider" element={<ProviderDashboard/>} />
<Route path="/add-service" element={<AddService/>} />
<Route path="/my-services" element={<MyServices/>} />
</Routes>
<AIChatbot/>
</BrowserRouter>
)
}

export default App