const express = require("express")
const router = express.Router()
const userController = require("../controllers/user")

router.post("/register",userController.register)
router.get("/find",userController.findAllUsers)
router.get("/findByUsername/:username",userController.findUserByUsername)

module.exports = router