const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors')
const path = require("path")
const app = express()
require("dotenv").config()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(__dirname))

app.use('/storage/videos', express.static(path.join(__dirname, './storage/videos')))

const userRouter = require('./routes/users')
const itemRouter = require('./routes/items')

app.use("/user",userRouter)
app.use("/item",itemRouter)

app.listen(7500,()=>{
  console.log("Server is running!")
})