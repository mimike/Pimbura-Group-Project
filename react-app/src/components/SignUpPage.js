import React from 'react';
import SignUpForm from './auth/SignUpForm'
import { Link } from 'react-router-dom'

function SignUpPage(){
    return (
        <div className="sign-up-form-container">
            <div>
                <h1>Instagram</h1>
            </div>
            <div>
                <h4>Sign up to see photos and videos from your friends.</h4>
            </div>
            <button>Log in with Facebook</button>

            <SignUpForm />

            <div className="terms-agreement">
                <h3>By signing up, you agree to our Terms , Data Policy and Cookies Policy.</h3>
            </div>
            <div className="Splash_Page-body-right-middle">
                <h1 id="splash-signup">
                    Don't have an account? <Link to="/sign-up">Sign up</Link>
                </h1>
			</div>
    </div>
    )
}

export default SignUpPage
