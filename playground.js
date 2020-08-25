const jwt = require("jsonwebtoken")
const tokenSecretKey = process.env.JWT_SECRET_KEY || "s0m3s3cre7"

const token = jwt.sign({ user:"mantap" }, tokenSecretKey, {
    expiresIn: 86400
});

console.log(token)

const user = jwt.verify(token,tokenSecretKey)

console.log(user)