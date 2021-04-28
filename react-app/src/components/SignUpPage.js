import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {useHistory }from 'react-router-dom'
import { Link } from 'react-router-dom'
import SignUpForm from './'


function SignUpPage(){
    const [ email, setEmail ] = useState('')
    const [ fullName, setFullName] = useState('') // not on db!
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    let history = useHistory()
    let dispatch = useDispatch()

    const onSignUp = async e => {
        e.preventDefault()

    }

    return (
        <div className="SignUpForm">
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
                    value={fullname}
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

                <button>
                    Sign Up
                </button>
                <div className="terms-agreement">
                    <h3>By signing up, you agree to our Terms , Data Policy and Cookies Policy.</h3>
                </div>
            </form>

            <div className="signup-submit-button">
                <h3>Have an account?</h3>
                <Link to="/sign-up" style={{textDecoration:"none"}}>Sign Up</Link>
            </div>

        </div>

    )
}
