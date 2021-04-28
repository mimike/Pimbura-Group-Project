import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom'
import { getSingleUser } from '../../store/session'



function UserProfile(props) {
    const dispatch = useDispatch()
    const location = useLocation()
    // const sessionUser = useSelector(state => state.session.user)
    const targetUser = useSelector(state => state.session.target_user)
    // console.log(location.state.user_id)

    useEffect(() => {
        dispatch(getSingleUser(location.state.user_id))
    }, [dispatch]);

    console.log(targetUser)




    return (
        <>
            < div className='outer-div'>
                <div className='profile-info-div'>
                    <div className='outer-avatar-div'>
                        <div className='avatar-img'></div>
                    </div>
                    <div className='profile-info-div'>
                        <div className='outer-name-div'>
                            <div className='profile-name'></div>
                            <div className='follow-profile-button'>Follow</div>
                        </div>
                        <div className='profile-stats-outer'>
                            <div className='profile-post-count'></div>
                            <div className='profile-followers-count'>0 Followers</div>
                            <div className='profile-following-count'>0 Following</div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )

}

export default UserProfile;