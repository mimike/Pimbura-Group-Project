import React, { useState } from "react";
import  { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import { Link } from 'react-router-dom';
import './auth.css'
//you see this when a new user vists ig.com
const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  if (user !== null) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="log-in-container">
        <div className="splash-image">
          <img alt="cell phone" src="/images/splash.jpeg"></img>
        </div>

        <div className="log-in-form-container">
          <div className="icon">
                <h1>Instagram</h1>
          </div>
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

          <div>
            <h5 style={{color:'grey'}}>---------------------   OR  ---------------------</h5>
          </div>

          <div className="facebook-link">
              <a href="https://www.facebook.com"  style={{textDecoration:'none', fontSize:"1.1em", color:"#4267B2"}}>Log in with Facebook<i class="fab fa-facebook" style={{fontSize: '1.5em'}}></i></a>
              </div>
        </div>
      </form>
        <div className="sign-up-box">
            <h3>
              Don't have an account? <Link to="/sign-up">Sign up</Link>
            </h3>
        </div>
      </div>

      </div>



      <div className="get-app-text">
          <h4>Get the app.</h4>
      </div>

      <div className="app-icon-container">
        <span className="google-image">
          <img alt="google app" src="/images/google-app.png"></img>
        </span>
        <span className="apple-image">
          <img alt="apple app" src="/images/apple-app.png"></img>
        </span>
      </div>

    </>


  );
};

export default LoginForm;
