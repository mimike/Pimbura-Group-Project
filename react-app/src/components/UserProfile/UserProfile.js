import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom'
import { getAllUsers } from '../../store/session'




function UserProfile(props) {
    const dispatch = useDispatch()
    const location = useLocation()
    const [currentUser, setCurrentUser] = useState({});
    const sessionUser = useSelector(state => state.session.user)
    const users = useSelector(state => state.session.users)
    console.log('users', users)

    // useEffect(() => {
    //     dispatch(getAllUsers())
    // }, [dispatch]);

    // location.state.user_id
    // cities.filter(city => city.population > 3000000)


    if (!users) return null

    else {
        // setCurrentUser(users.users.filter(user => user.id === location.state.user_id));
        // console.log('user', currentUser)
        return (
            <>
                < div className='outer-div'>
                    <div className='profile-info-div'>
                        <div className='outer-avatar-div'>
                            <div
                                className='avatar-img'
                            // style={{
                            //     backgroundImage: `url(${user[0].avatar_url})`
                            // }}
                            ></div>
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
        );
    }

}

export default UserProfile;