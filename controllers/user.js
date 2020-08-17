const db = require("../config/database")

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

exports.register = (req,res) =>{
    let username = req.body.username
    let password = req.body.password
    let email = req.body.email
    db.execute(`INSERT INTO users.users (username,password,email) VALUES ('${username}', '${password}', '${email}');
    `).then(doc=>{
        res.send(doc[0])
    }).catch(err=>{
        if(err) res.send(err)
    })
}

exports.login = (req,res) =>{
    let username = req.body.username
    let password = req.body.password
    db.execute(`SELECT * FROM users WHERE username='${username}' AND password='${password}';`).then(doc=>{
        res.send(doc[0])
    }).catch(err=>{
        if(err) res.send(err)
    })
}