import React,{useEffect} from 'react';
import {useStateIfMounted} from 'use-state-if-mounted'
import axios from 'axios';

import {Link} from 'react-router-dom';
import host from '../api/host'


function App() {

  let [items,setItems] = useStateIfMounted([])
  let [item,setItem] = useStateIfMounted({
    item_name:"",
    quantity:""
  })

  useEffect(()=>{
    axios.get(`${host}/item/read`).then(doc=>{
      setItems(doc.data.doc)
    })
  })

  const logout = () =>{
    localStorage.clear()
    window.location.href = "./login";
  }
  const onSubmit = (event) =>{
    axios.post(`${host}/item/create`,item,{
      headers: {
        "Content-Type": "application/json"
      }
    }).then(doc=>{
      console.log(doc)
    })
    event.preventDefault()
  }

  const handleOnChange = (event) => {
    setItem({
      ...item,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div className="App">
      <button onClick={logout}>Logout</button>
      <h1 > Tambah Item </h1>
      <form onSubmit={onSubmit} >
        <input onChange={handleOnChange} name="item_name" type="text" placeholder="Nama Item"></input>
        <br></br>
        <input onChange={handleOnChange} name="quantity" type="text" placeholder="Quantity"></input>
        <br></br>
        <button>Submit</button>
      </form>
      {items.map((data,index)=>{
        return(
          <div key={index}>
            <h1>{data.item_name}</h1>
            <p>{data.quantity}</p>
            <Link to={"/item/"+data.iditems} >Edit</Link>
          </div>
        )
      })}
    </div>
  );
}

export default App;
