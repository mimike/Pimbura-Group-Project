import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";

import './ExplorePage.css';

const ExplorePage = () => {

    const allPosts = useSelector(state => state.posts.posts) || {};
    console.log("POSTS--------------------",allPosts)

    const click = () => {
        console.log("HI")
    }

    return (
        <div>
            <div>
            <ul className="posts-list">
                {Object.values(allPosts).map(post => (
                    <li key={post.id}>
                        <img src={post.photo_url} />
                        <NavLink to="/explore" onClick={click}></NavLink>
                    </li>
                ))}
            </ul>
            </div>
        </div>
    )
}


export default ExplorePage;