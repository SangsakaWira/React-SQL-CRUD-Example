const db = require("../config/database")

exports.create = (req,res) =>{
    let item_name = req.body.item_name
    let quantity = req.body.quantity
    db.execute(`INSERT INTO users.items (item_name,quantity) VALUES ('${item_name}', '${quantity}');
    `).then(doc=>{
        res.send({
            doc:doc
        })
    }).catch(err=>{
        if(err) res.send(err)
    })
}

exports.read = (req,res) =>{
    db.execute("SELECT * from items").then(doc=>{
        res.send({
            doc:doc[0]
        })
    }).catch(err=>{
        if(err) res.send(err)
    })
}