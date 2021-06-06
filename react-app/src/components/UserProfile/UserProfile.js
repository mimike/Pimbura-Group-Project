import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom'
import { getSingleUser, getSuggested, followAUser } from '../../store/session'
import './UserProfile.css'

function UserProfile(props) {
    const dispatch = useDispatch();
    const location = useLocation();
    const targetUser = useSelector(state => state.session.target_user);
    const suggested = useSelector(state => state.session.suggested);
    var url = /[^/]*$/.exec(`${location.pathname}`)[0];
    const userIdArr = []
    const [btnText, setBtnText] = useState('')
    let btn;
    
    useEffect(() => {
        dispatch(getSingleUser(url));
        dispatch(getSuggested())
        
    }, [dispatch, url]);

    useEffect(() => {
        if (targetUser && suggested){
            for (let user in suggested){
                userIdArr.push(parseInt(user))
             }

            if (userIdArr.includes(targetUser.id)){
                setBtnText('Follow')
            } else {
                setBtnText('Following')
            }
        }

    }, [targetUser, suggested])

    const handleClick = (id) => {
        if (btnText === 'Follow'){
            // dispatch(followAUser(id))
            // dispatch(getSuggested())
            setBtnText('Following')
        } else {
            setBtnText('Follow')
        }
    }


    if (!targetUser) return null;

    else {

       
        
        return (
            <>
                < div className='outer-div'>
                    <div className='profile-info-div'>
                        <div className='outer-avatar-div'>
                            <div
                                className='avatar-img'
                                style={{
                                    backgroundImage: `url(${targetUser.avatar_url})`
                                }}
                            ></div>
                        </div>
                        <div className='profile-info'>
                            <div className='outer-name-div'>
                                <div className='profile-name'>{targetUser.username}</div>
                                <div 
                                className='follow-profile-button'
                                onClick={() => handleClick(targetUser.id)}
                                >{btnText}</div>
                            </div>
                            <div className='profile-stats-outer'>
                                <div className='profile-post-count'><b>{targetUser.posts.length}</b> Posts</div>
                                <div className='profile-followers-count'><b>{targetUser.followers.length}</b> Followers</div>
                                <div className='profile-following-count'><b>{targetUser.following.length}</b> Following</div>
                            </div>
                        </div>
                    </div>
                    <div className='posts-label-div'>
                        <div className='posts-name'>Posts</div>
                        <div className='tagged-name'>Tagged</div>
                    </div>
                    <div className='user-posts-div'>
                        {targetUser.posts.map(post => (
                            <div className='single-post' key={`${post.id}`}>
                                <div
                                    className='user-post-img'
                                    style={{
                                        backgroundImage: `url(${post.photo_url})`
                                    }}
                                >
                                    <div className='like-comments'>
                                        <div className='display-likes'>    {post.post_comments.length}   </div>
                                        <div className='display-comments'>    {post.post_likes.length}   </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div >
                </div>
            </>
        );
    }
}

export default UserProfile;
