import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./Login.css";

const Login = (props) => {
    return (
<main className="form-signin w-100 m-auto">
  <form action="/login" method="POST">
    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

    <div className="form-floating">
      <input type="email" className="form-control" id="floatingInput" name="username" placeholder="name@example.com" />
      <label>Email address</label>
    </div>
    <div className="form-floating">
      <input type="password" className="form-control" id="floatingPassword" name="password" placeholder="Password" />
      <label>Password</label>
    </div>

    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
    <h2 className="h5 mt-3 mb-3 fw-normal">Not a user? <Link className="" to="/signup">Sign Up</Link></h2>
    
    <p className="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
  </form>
</main>
      );
};

export default Login;
