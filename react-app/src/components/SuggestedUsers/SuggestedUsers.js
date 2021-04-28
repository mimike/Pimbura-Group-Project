import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getAllUsers } from '../../store/session'
import { logout } from "../../store/session";
import './SuggestedUsers.css'


function SuggestedUsers() {
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    let users = useSelector(state => state.session.users)
    let newUsers;

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    const onLogout = async (e) => {
        await dispatch(logout());
        history.push('/')
    };

    const userProfile = async (e) => {
        let targetUser = Object.values(e.target)
        // console.log('event', targetUser[1].value)
        history.push(`/user/${targetUser[1].value}`)
    };

    // console.log('sessionUser', sessionUser)
    if (!users) return null

    else {
        { newUsers = users.users.filter(function (el) { return el.username != `${sessionUser.username}`; }) }


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
                        {newUsers.slice(0, 6).map(user => (
                            <div className='single-user'>
                                <div
                                    className='user-avatar'
                                    style={{
                                        backgroundImage: `url(${user.avatar_url})`
                                    }}
                                >
                                </div>
                                <div className='user-information'>
                                    <div className='user-name' value={user.id} onClick={userProfile}>{user.username}</div>
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
}

export default SuggestedUsers;


