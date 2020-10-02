import React, { useEffect } from 'react';
import { useStateIfMounted } from 'use-state-if-mounted'
import axios from 'axios';

import { Link } from 'react-router-dom';
import host from '../api/host'

function App(props) {
    let [item, setItem] = useStateIfMounted({
        item_name: "",
        quantity: "",
        photo:""
    })

    useEffect(() => {
        axios.get(`${host}/item/read/${props.match.params.id}`).then(doc => {
            console.log(doc)
            if(!doc.data.doc) {
                setItem({
                    ...item,
                    item_name:"No Item Found",
                    quantity:"No Quantity"
                })
            }else{
                setItem({
                    ...item,
                    item_name:doc.data.doc[0].item_name,
                    quantity:doc.data.doc[0].quantity,
                    photo:doc.data.doc[0].photo
                })
            }
        })
    },[])

    const deleteItem = () =>{
        axios.get(`${host}/item/delete/${props.match.params.id}`).then(doc=>{
            window.location.href = "/";
        })
    }

    return (
        <div className="App">
            <h1>Single Item</h1>
            <p>{props.match.params.id}</p>
            <p>{item.photo}</p>
            <img src={item.photo} style={{width:"30%"}}></img>
            <p>{item.item_name}</p>
            <p>{item.quantity}</p>
            <button onClick={deleteItem}>Delete Item</button>
            <Link to="/">Back Home</Link>
        </div>
    );
}

export default App;
