import React from 'react'
import * as sessionActions from '../../store/session'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './auth.css'

const DemoUser = () => {
	let history = useHistory()
	const dispatch = useDispatch()

	const setDemoLogin = async e => {
		e.preventDefault()
		const email = 'demo@aa.io'
		const password = 'password'
		const user = await dispatch(sessionActions.demoLogin({ email, password }))
		if (!user.errors) history.push('/')
		return user
	}

    return (
		<form onSubmit={setDemoLogin}>
            <Link to="/">Demo</Link>
		</form>
	)
}

export default DemoUser
