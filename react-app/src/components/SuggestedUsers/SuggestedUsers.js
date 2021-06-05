import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAllUsers, followAUser, getSuggested } from '../../store/session'
import { logout } from "../../store/session";
import './SuggestedUsers.css';
import IndividualSuggested from './IndividualSuggested'


function SuggestedUsers() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [followid, setFollowId] = useState()
    const sessionUser = useSelector(state => state.session.user)
    let suggested = useSelector(state => state.session.suggested)
    const [followBtn, setFollowBtn] = useState('Follow')
    
    useEffect(() => {
        dispatch(getSuggested())
    }, [dispatch])

    const onLogout = async (e) => {
        dispatch(logout());
        history.push('/')
    };


    const userProfile = async (e) => {
        let targetUser = Object.values(e.target)
        history.push({
            pathname: `/user/${targetUser[1].value}`,
            state: { user_id: targetUser[1].value }
        })
    };

    const handleFollowUser = async (e) => {
        e.preventDefault()
        
        dispatch(followAUser(followid))
        setFollowBtn('Following')
    }

    if (!suggested) return null

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
                        {Object.values(suggested).map((user, idx) => (
                            idx < 10 && (
                                <IndividualSuggested user={user}/>
                        )))}
                    </div>
                </div>
            </>
        );
}

export default SuggestedUsers;
