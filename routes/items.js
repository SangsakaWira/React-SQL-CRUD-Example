const express = require("express")
const router = express.Router()
const itemController = require("../controllers/items")

router.post("/create",itemController.create)
router.get("/read",itemController.read)

module.exports = router