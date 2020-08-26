import React, { useState } from 'react'
import axios from 'axios'
import host from '../api/host'

function Register() {

    const [dataUser, setDataUser] = useState({
        username: "",
        password: "",
        error: "",
        msg: ""
    })

    const [show, setShow] = useState({
        status:false,
        msg:""
    });

    const showError = () =>{
        if(show){
            return(
            <h5>{show.msg}</h5>
            )
        }
    }

    const handleOnChange = (event) => {
        setDataUser({
            ...dataUser,
            [event.target.name]: event.target.value
        })
    }


    const onSubmit = (event) =>{
        console.log(dataUser)
        axios.post(`${host}/user/register`,{
            username:dataUser.username,
            email:dataUser.email,
            password:dataUser.password
        },{
            headers:{
                "Content-Type":"application/json"
            }
        }).then(doc=>{
            console.log(doc.data)
            if(doc.data.status){
                localStorage.setItem('token',doc.data.token)
            }else{
                setShow({
                    msg:doc.data.msg,
                    status:true
                })
            }
        })
        event.preventDefault()
    }

  return (
    <div>
      <h1>Register Page</h1>
      <form onSubmit={onSubmit} >
          <input onChange={handleOnChange} name="username" type="text" placeholder="Username"></input>
          <br></br>
          <input onChange={handleOnChange} name="email" type="email" placeholder="Email"></input>
          <br></br>
          <input onChange={handleOnChange} name="password" type="password" placeholder="Password"></input>
          <br></br>
          <button>Submit</button>
      </form>
      {showError()}
    </div>
  );
}

export default Register;
