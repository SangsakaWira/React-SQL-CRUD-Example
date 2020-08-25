const express = require("express")
const bodyParser = require("body-parser")
const app = express()
require("dotenv").config()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const userRouter = require('./routes/users')
const itemRouter = require('./routes/items')

app.use("/user",userRouter)
app.use("/item",itemRouter)

app.listen(3000,()=>{
  console.log("Server is running!")
})