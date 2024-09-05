import { useState, useEffect } from "react";
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';

import { ADD_USER } from "../utils/mutations";
import Auth from '../utils/auth';


function SignupPage(props) {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const [formState, setFormState] = useState({ email: '', password: ''});
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        username: formState.username,
        email: formState.email,
        password: formState.password,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="signup-page-wrapper">
      <div className="signup-form">
        <form onSubmit={handleFormSubmit}>
          <h2>Create an Account</h2>
          <p className="hint-text">It's FREE and takes a minute.</p>
          <div className="form-group">
            <input type="email" className="form-control" name="email" placeholder="Email" required="required" onChange={handleChange}/>
          </div>
          <div className="form-group">
            <input type="text" className="form-control" name="username" placeholder="Username" required="required" onChange={handleChange}/>
          </div>        
          <div className="form-group">
            <input type="password" className="form-control" name="password" placeholder="Password" required="required" onChange={handleChange}/>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-success btn-lg btn-block">Register Now</button>
          </div>
        </form>
        <div className="text-center">Already have an account? <Link to="/login" style={{ textDecoration: "none" }}>
                Log in
              </Link>
</div>
      </div>
    </div>
  );
}
      
      {/* <div className="logForm">

      <div className="signUp">
        <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        
        <div className="field flex-row space-between my-2">
          <label htmlFor="username">Username:</label>
          <input
            placeholder="FaithfulMary"
            name="username"
            type="text"
            id="username"
            onChange={handleChange}
          />
        </div>
        <div className="field flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="FaithfulMary@gmail.com"
            name="email"
            type="text"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="field flex-row space-between my-2">
          <label htmlFor="password">Password:</label>
          <input
            placeholder="********"
            name="password"
            type="password"
            id="password"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button id="subBtn" >Submit</button>
        </div>
      </form>
    </div>
    </div> */}
    


export default SignupPage;