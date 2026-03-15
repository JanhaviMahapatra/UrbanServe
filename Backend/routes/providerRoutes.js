const express=require("express")
const router=express.Router()
const authMiddleware=require("../middleware/authMiddleware")

const {createProviderProfile,
addService,
getServices,
deleteService,
getMyServices
}=require("../controllers/providerController")

router.post("/profile",authMiddleware,createProviderProfile)
router.post("/service",authMiddleware,addService)
router.get("/services",getServices)
router.get("/my-services", authMiddleware, getMyServices)
router.delete("/service/:id",authMiddleware,deleteService)

module.exports=router
