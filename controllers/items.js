const db = require("../config/database")

exports.create = (req,res) =>{
    let item_name = req.body.item_name
    let quantity = req.body.quantity
    let photo = req.file
    console.log(photo)
    db.execute(`INSERT INTO users.items (item_name,quantity,photo) VALUES ('${item_name}', '${quantity}','${process.env.HOST+req.file.destination.substring(1,)+"/"+req.file.filename}');
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

exports.readById = (req,res) =>{
    db.execute(`SELECT * from items WHERE iditems=${req.params.id}`).then(doc=>{
        res.send({
            doc:doc[0]
        })
    }).catch(err=>{
        if(err) res.send(err)
    })
}

exports.delete = (req,res) =>{
    db.execute(`DELETE FROM items WHERE iditems=${req.params.id}`).then(doc=>{
        res.send({
            doc:doc[0]
        })
    }).catch(err=>{
        if(err) res.send(err)
    })
}