import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session'
import { Link } from 'react-router-dom';
import './signup.css'
import './auth.css'

const SignUpForm = () => {
  const history = useHistory()
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState('') // not on Database. need to add
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      await dispatch(signUp(username, email, password));
    };
    history.push('/')
  };

  if (user !== null) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="sign-up-container">
        <div className="phones-image">
          <img alt="cell phone" src="/images/splash.jpeg"></img>
        </div>
        <div className="sign-up-form-container">
          <div className="icon">
              <h1>Instagram</h1>
          </div>
        <div className="see-friends">
            <h4>Sign up to see photos and videos from your friends.</h4>
        </div>
        <div className="log-in-with-facebook">
            <a href='https://www.facebook.com/'><button>Log in with Facebook</button></a>
        </div>
        {/* ---or---- */}
        <span class="or-divider">OR</span>
        {/* sign up form */}
        <div className="sign-up-form">
          <form onSubmit={onSignUp}>
            <div>
                <input
                type="text"
                placeholder="Email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                value={email}
                >
                </input>
            </div>

            <div>
                <input
                type="text"
                placeholder="Full Name"
                name="fullname"
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
                >
                </input>
            </div>

            <div>
                <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                >
                </input>
            </div>

            <div>
                <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                >
                </input>
            </div>

            <div>
                <input
                type="password"
                placeholder="Repeat Password"

                onChange={(e) => setRepeatPassword(e.target.value)}
                value={repeatPassword}
                >
                </input>
            </div>
            <div className="sign-up">
              <button>
                  Sign Up
              </button>
            </div>

            <div className="terms-agreement">
              <h5>By signing up, you agree to our Terms, Data Policy and Cookies Policy.</h5>
            </div>

          </form>
        </div>

        {/* have an account log in */}
        <div className="log-in-box">
          <h3>
            Have an account? <Link to="/login">  Log in</Link>
          </h3>
        </div>

      </div>
      </div>

      {/* <---app box--> */}
      <div className="get-app-container">
        <div className="get-app">
            <p>Get the app.</p>
        </div>
        <div className="app-icon-container">
          <span className="google-image">
            <img alt="google app" src="/images/google-app.png"></img>
          </span>
          <span className="apple-image">
            <img alt="apple app" src="/images/apple-app.png"></img>
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

export default SignUpForm;
