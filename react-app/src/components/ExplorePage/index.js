import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { Modal } from '../../context/Modal';

import './ExplorePage.css';

const ExplorePage = () => {

    const allPosts = useSelector(state => state.posts.posts) || {};
    const user = useSelector(state => state.session.user) || {}
    // console.log("POSTS--------------------",allPosts)
    const [showModal, setShowModal] = useState(false);
    // const [current, setCurrent] = useState()

    // const click = () => {
    //     console.log("HI")
    // }

    const onClick = () => {
        setShowModal(true)
        // setPhotoUrl(post.photo_url)
    }
    return (
        <div>
            <div>
            <ul className="posts-list">
                {Object.values(allPosts).map(post => (
                    <li key={post.id}>
                        <button onClick={onClick}>
                            <img src={post.photo_url} />
                            {/* {console.log("1_____",post.id, post.photo_url )} */}
                            
                        </button>
                        {showModal && (
                            <div className="post">
                                <Modal onClose={() => setShowModal(false)}>
                                    <div > 
                                        {/* <h1>HIII</h1> */}
                                        {/* <div className="post-image" style={{backgroundImage: `url(${post.photo_url})`}}></div> */}
                                        <img src={post.photo_url} className="post-image"/>
                                        {/* {console.log("2_____",post.id, post.photo_url )} */}
                                        <div>{user.username}</div>
                                        <div>{post.caption}</div>
                                        
                                    </div>
                                </Modal>
                            </div>
                            )}
                    </li>
                ))}
            </ul>
            </div>
        </div>
    )
}


export default ExplorePage;