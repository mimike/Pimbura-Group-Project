import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getAllUsers } from '../../store/session'
//import { NavLink } from "react-router-dom";
import './SuggestedUsers.css'


function SuggestedUsers() {

    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const users = useSelector(state => state.user)
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    // }

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    // console.log('user', user)


    console.log('users', users)
    return (
        <>
            <h1>Users</h1>
            <div className='current_user'>
                {sessionUser.username}
            </div>
            <div className='suggested-for-you-test'>
                Suggested for you
                </div>
            <div className='suggested-user-div'>
                {console.log(users)}
                {users && users.map(user => (
                    <div className='single-user'>
                        {/* <div
                                className='user-avatar'
                                style={{ backgroundImage: `url('${user.avatar_url}')` }}
                            ></div> */}
                        <div className='user-name'>{user.username}hello</div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default SuggestedUsers;


