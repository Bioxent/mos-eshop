import React from "react";
import "./Signup.css";

const Signup = (props) => {
    return (
<main className="form-signin w-100 m-auto">
  <form action="/register" method="POST">
    <h1 className="h3 mb-3 fw-normal">Sign Up Page</h1>

    <div className="form-floating">
      <input type="email" className="form-control" id="floatingInput" name="username" placeholder="name@example.com" />
      <label>Your email:</label>
    </div>
    <div className="form-floating">
      <input type="password" className="form-control" id="floatingPassword" name="password" placeholder="Password" />
      <label>Password:</label>
    </div>

    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign Up</button>
    <p className="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
  </form>
</main>
      );
};

export default Signup;
