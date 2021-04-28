import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getAllUsers } from '../../store/session'
import { getAllUserPosts } from '../../store/posts'
import { logout } from "../../store/session";
import './SuggestedUsers.css'


function SuggestedUsers() {
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const users = useSelector(state => state.session.users)
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    // }

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    const onLogout = async (e) => {
        await dispatch(logout());
        history.push('/')
    };

    const userProfile = async (e) => {
        console.log('event', (e.target.value))
        // await dispatch(getAllUserPosts())
        history.push('/')
    };

    // console.log('users', users)
    // console.log('sessionUser', sessionUser)
    if (!users) return null


    return (
        <>
            <div className='suggested-container'>
                <div className='single-user'>
                    <div
                        className='user-avatar'
                        style={{
                            backgroundImage: `url(${sessionUser.avatar_url})`
                        }}
                    >
                    </div>
                    <div className='user-information user-name'>
                        {sessionUser.username}
                    </div>
                    <div className='user-follow-button' onClick={onLogout}>Switch</div>
                </div>
                <div className='suggested-for-you-header'>
                    Suggested for you
                </div>
                <div className='suggested-user-div'>
                    {console.log(users)}
                    {users.users.slice(0, 6).map(user => (
                        <div className='single-user'>
                            <div
                                className='user-avatar'
                                style={{
                                    backgroundImage: `url(${user.avatar_url})`
                                }}
                            >
                                {/* <img src={user.avatar_url} alt="test"></img> */}
                            </div>
                            <div className='user-information'>
                                <div className='user-name' value={user.username} onClick={userProfile}>{user.username}</div>
                                <div className='suggested-text'>Suggested for you</div>
                            </div>
                            <div className='user-follow-button'>Follow</div>
                        </div>
                    ))}
                </div>
                <div className='bogus-legal-info'>About * Help * Press * API * Jobs * Privacy * Terms * Locations * Top Accounts * Hashtags * Language</div>
            </div>
        </>
    );
}

export default SuggestedUsers;


