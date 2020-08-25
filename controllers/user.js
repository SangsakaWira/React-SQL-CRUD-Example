const db = require("../config/database")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const tokenSecretKey = process.env.JWT_SECRET_KEY || "s0m3s3cre7"

exports.findAllUsers = (req,res) =>{
    db.execute(`SELECT * from users`).then(doc=>{
        res.send(doc[0])
    })
}

exports.findUserByUsername = (req,res) =>{
    let username = req.params.username
    db.execute(`SELECT * from users WHERE username='${username}'`).then(doc=>{
        res.send(doc[0])
    })
}

exports.findUserByUsername = (req,res) =>{
    let username = req.params.username
    db.execute(`SELECT * from users WHERE username='${username}'`).then(doc=>{
        res.send(doc[0])
    })
}

exports.register = (req,res) =>{
    let username = req.body.username
    let password = bcryptjs.hashSync(req.body.password, 10)
    let email = req.body.email
    db.execute(`INSERT INTO users.users (username,password,email) VALUES ('${username}', '${password}', '${email}');
    `).then(doc=>{
        const token = jwt.sign({ doc: doc[0]}, tokenSecretKey, {
            expiresIn: 86400
        });
        res.send({
            token:token
        })
    }).catch(err=>{
        if(err) res.send(err)
    })
}

exports.login = (req,res) =>{
    let username = req.body.username
    db.execute(`SELECT idusers,username,email,password FROM users WHERE username='${username}'`).then(doc=>{
        if(bcryptjs.compareSync(req.body.password,doc[0][0].password)){
            let user = {
                id:doc[0][0].idusers,
                username:doc[0][0].username,
                email:doc[0][0].email,
            }
            const token = jwt.sign({ user:user }, tokenSecretKey, {
                expiresIn: 100
            });
            res.send({
                token:token
            })
        }else{
            res.send({
                msg:"Wrong Password!"
            })
        }
    }).catch(err=>{
        if(err) res.send(err)
    })
}