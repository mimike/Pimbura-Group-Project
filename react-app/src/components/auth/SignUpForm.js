import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session'

const SignUpForm = () => {
  const history = useHistory()
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState('') // not on Database. need to add
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState(""); //not on form

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      await dispatch(signUp(username, email, password));
    }
  };

  if (user) {
    return <Redirect to="/" />;
  }

  // const validateEmailPassword(){
  // }

  return (
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

      <button>
          Sign Up
      </button>

    </form>
  );
};

export default SignUpForm;
