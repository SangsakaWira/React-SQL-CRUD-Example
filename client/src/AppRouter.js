import React,{useEffect} from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import jwt_decode from "jwt-decode";
import PrivateRoute from './components/PrivateRoute'

// PAGES
import Login from './pages/Login'
import App from './pages/App';
import Register from './pages/Register';
import SingleItem from './pages/SingleItem'

function AppRouter() {

  useEffect(()=>{
    // Check for token to keep user logged in
    if (localStorage.getItem('token')) {
    // Set auth token header auth
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000; // to get in milliseconds
    console.log(decoded.exp < currentTime)
    console.log(decoded.exp)
    console.log(currentTime)
    if (decoded.exp < currentTime) {
      // Logout user
      localStorage.clear()
      // Redirect to login
      window.location.href = "./login";
      }
    }
},[])

  return (
    <Router>
        <Switch>
            <PrivateRoute path="/" exact component={App} ></PrivateRoute>
            <Route path="/login" component={Login} ></Route>
            <Route path="/register" component={Register} ></Route>
            <PrivateRoute path="/item/:id" component={SingleItem} ></PrivateRoute>
        </Switch>
    </Router>
  );
}

export default AppRouter;
