import React,{useState} from 'react';
import axios from 'axios';

import {Link} from 'react-router-dom';
import host from '../api/host'

function Login() {
  const [dataUser, setDataUser] = useState({
    username: "",
    password: "",
    error: "",
    msg: ""
  })

  const [show, setShow] = useState({
    status: false,
    msg: ""
  });

  const showError = () => {
    if (show) {
      return (
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
  const onSubmit = (event) => {
    console.log(dataUser)
    axios.post(`${host}/user/login`, {
      username: dataUser.username,
      password: dataUser.password
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(doc => {
      console.log(doc.data)
      if (doc.data.status) {
        localStorage.setItem('token', doc.data.token)
        window.location.href = "./";
      } else {
        setShow({
          msg: doc.data.msg,
          status: true
        })
      }
    })
    event.preventDefault()
  }
  return (
    <div className="Login">
      <h1>Login Page</h1>
      <form onSubmit={onSubmit} >
        <input onChange={handleOnChange} name="username" type="text" placeholder="Username"></input>
        <br></br>
        <input onChange={handleOnChange} name="password" type="password" placeholder="Password"></input>
        <br></br>
        <button>Submit</button>
      </form>
      <Link to="register">register</Link>
      {showError()}
    </div>
  );
}

export default Login;
