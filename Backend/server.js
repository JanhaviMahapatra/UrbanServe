require("dotenv").config();
const cors=require("cors");
const express=require("express");
const app=express();

/*All of the routes*/
const authRoutes=require("./routes/authRoutes")
const authMiddleware=require("./middleware/authMiddleware")
const providerRoutes=require("./routes/providerRoutes")
const bookingRoutes = require("./routes/bookingRoutes")
const paymentRoutes=require("./routes/paymentRoutes")
const aiRoutes = require("./routes/aiRoutes")

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
res.send("API running...")
});

/*Middleware route wor testing*/
app.get("/api/profile",authMiddleware,(req,res)=>{
res.json({
message:"Protected route working!",
user:req.user
}) 
})

/*preffixing the routes*/
app.use("/api/auth",authRoutes);
app.use("/api/provider",providerRoutes)
app.use("/api/bookings", bookingRoutes)
app.use("/api/payments",paymentRoutes)
app.use("/api/ai", aiRoutes)

const PORT=process.env.PORT||5000

app.listen(PORT,()=>{
console.log(`App is listening on port ${PORT}`);
})