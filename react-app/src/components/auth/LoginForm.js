import React, { useState } from "react";
import  { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../store/session";
import * as sessionActions from '../../store/session'
import { Link } from 'react-router-dom';
import DemoUser from '../auth/DemoUser';

import './login.css'
import google from "../../images/google-app.png"
import apple from "../../images/apple-app.png"
import splash from "../../images/splash.jpeg"

const LoginForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //On submit of the form, dispatch the login thunk action with the form input values. Make sure to handle and display errors from the login thunk action if there are any.

// }
  //skeleton code
  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };
  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user !== null) {  //if user
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="log-in-container">
        <div className="phones-image">
          <img alt="cell phone" src={splash}></img>
        </div>

        <div className="log-in-form-container">
          <div className="icon">
                <h1>Overshare</h1>
          </div>
        <div className="log-in-form">
          <form onSubmit={onLogin}>
          <div>
            {errors.map((error) => (
              <div>{error}</div>
            ))}
          </div>
          <div>
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
            <div className="log-in">
              <button type="submit">Login</button>
            </div>
          </div>
        </form>



        <div className="facebook-login">
              <a href="https://www.facebook.com"  style={{textDecoration:'none', fontSize:"1.1em", color:"#4267B2"}}><i class="fab fa-facebook-square" area-hidden="true" style={{fontSize: '1.5em'}}></i></a>
              <a href="https://www.facebook.com"  style={{textDecoration:'none', fontSize:"1.1em", color:"#4267B2"}}>  Log in with Facebook</a>
        </div>
        <div className="forgot">
          <a href="/">Forgot password?</a>
        </div>
        </div>

        <div className="sign-up-box">
            <h3>
              Don't have an account? <Link to="/sign-up">   Sign up</Link>
            </h3>
        </div>
        <div className="demo-log-in">
          <DemoUser />
        </div>
      </div>

      </div>

      <div className="get-app-container">
        <div className="get-app">
            <p>Get the app.</p>
        </div>

        <div className="app-icon-container">
          <a href="https://play.google.com/store/apps/details?id=com.instagram.android&hl=en_US&gl=US">
            <span className="google-image">
              <img alt="google app" src={google}></img>
            </span>
          </a>

          <span className="apple-image">
            <a href="https://apps.apple.com/us/app/instagram/id389801252">
              <img alt="apple app" src={apple}></img>
            </a>

          </span>
        </div>
      </div>

      <footer>
        <ul class="footer-links">
          <li><a href="/">About</a></li>
          <li><a href="/">Blog</a></li>
          <li><a href="/">Jobs</a></li>
          <li><a href="/">API</a></li>
          <li><a href="/">Privacy</a></li>
          <li><a href="/">Terms</a></li>
          <li><a href="/">Top Accounts</a></li>
          <li><a href="/">Hashtags</a></li>
          <li><a href="/">Locations</a></li>
        </ul>
      </footer>

    </>


  );
};

export default LoginForm;
