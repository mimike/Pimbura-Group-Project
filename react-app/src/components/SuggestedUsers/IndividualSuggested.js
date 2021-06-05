import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { followAUser } from '../../store/session'
import './SuggestedUsers.css'

function IndividualSuggested(user) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [followBtn, setFollowBtn] = useState('Follow');
    const [followid, setFollowId] = useState();
    const singleUser = user.user
    
    const handleFollowUser = async (e) => {
        if (followBtn === 'Follow'){
            dispatch(followAUser(followid))
            setFollowBtn('Following')
        } else {
            setFollowBtn('Follow')
        }
    }

    const userProfile = async (e) => {
        let targetUser = Object.values(e.target)
        history.push({
            pathname: `/user/${targetUser[1].value}`,
            state: { user_id: targetUser[1].value }
        })
    };

    return (
        <div className='single-user' key={`${singleUser.id}`}>
            <div
            className='user-avatar'
            style={{
            backgroundImage: `url(${singleUser.avatar_url})`
            }}
            >
            </div>
            <div className='user-information'>
                <div className='user-name' value={singleUser.id} onClick={userProfile}>{singleUser.username}</div>
                <div className='suggested-text'>Suggested for you</div>
            </div>
            <div className='user-follow-button' value={singleUser.id} onClick={handleFollowUser} onMouseOver={() => setFollowId(singleUser.id)}>{followBtn}</div>
        </div>

    )

}

export default IndividualSuggested;