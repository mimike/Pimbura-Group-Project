import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { demoLogin } from "../../store/session";


const DemoUser = () => {
	let history = useHistory()
	const dispatch = useDispatch()

    const demoLoginWrapper = async (e) => {
        e.preventDefault()
        dispatch(demoLogin())
        history.push('/')
    }
    //doesn't have to be a form could be a link, but not a link instead of a form
    return (
        <>
            <form onSubmit={demoLoginWrapper}>
                <div className="demo-link">
                    <input type="submit" value="Demo"/>
                </div>
            </form>
        </>
	)
}

export default DemoUser
