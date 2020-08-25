const express = require("express")
const bodyParser = require("body-parser")
const app = express()
require("dotenv").config()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const userRouter = require('./routes/users')

app.use("/user",userRouter)

app.listen(3000,()=>{
  console.log("Server is running!")
})