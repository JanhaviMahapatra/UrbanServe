const express=require("express")
const router=express.Router()

const authMiddleware=require("../middleware/authMiddleware")

const{
  createBooking,
  getUserBookings,
  updateBookingStatus,
  getProviderBookings,
  acceptBooking,
  rejectBooking,
  completeBooking
}=require("../controllers/bookingController")

router.post("/",authMiddleware,createBooking)

router.get("/user",authMiddleware,getUserBookings)

router.patch("/:id/status",authMiddleware,updateBookingStatus)

router.get("/provider",authMiddleware,getProviderBookings)

router.patch("/:id/accept",authMiddleware,acceptBooking)

router.patch("/:id/reject",authMiddleware,rejectBooking)

router.patch("/:id/complete",authMiddleware,completeBooking)

module.exports = router