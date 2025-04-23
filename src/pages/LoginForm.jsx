import React from "react";
import { Link } from "react-router-dom";


function LoginForm() {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Login Form</h2>
      <form action="" className="col-md-4">
        <label htmlFor="name" className="form-label" >Name:</label>
        <br />
        <input type="text" name="" id="name" className="form-control" required />
        <br />
        <label htmlFor="email">Email: </label>
        <br />
        <input type="email" name="" id="email" className="form-control" required />
        <br />
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input type="number" name="" id="phoneNumber" className="form-control" required />
        <br />
        <label htmlFor="address">Address:</label>
        <br />
        <textarea name="" id="" rows={5} className="form-control" required></textarea>
        <br />
        
        <Link to="/userProfile">
        <div className="d-grid gap-2  mx-auto">
        <button  type="button" className="btn btn-primary btn-lg">Login</button> 
        </div>
        </Link>
       
        
      </form>
    </div>
  );
}

export default LoginForm;
