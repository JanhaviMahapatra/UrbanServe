const express=require("express")
const router=express.Router()
const authMiddleware=require("../middleware/authMiddleware")

const {serviceSuggestion} =require("../controllers/aiController")

router.post("/service-suggestion",authMiddleware, serviceSuggestion)

module.exports = router