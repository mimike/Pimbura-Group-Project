import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getAllPosts, commentOnAPost } from '../../store/posts'
import  './PhotoFeed.css';

function Comments (postID) {
    const dispatch = useDispatch()
    const allPosts = useSelector(state => state.posts.posts);
    const user = useSelector(state => state.session.user)
    const user_id = user.id
    const [comment, setComment] = useState('')
    const {post_id} = postID

    // useEffect(() => {
    //     dispatch(getAllPosts())
    // }, [dispatch])

    const handleMakeAComment = async (e) => {
        e.preventDefault()
        const params = {user_id, post_id, comment}
        console.log(params)
        dispatch(commentOnAPost(params))
        setComment('')
        dispatch(getAllPosts())
    }

    return (
        <div>
            <form onSubmit={handleMakeAComment}>
                <input 
                type="text" 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                />
                <button type="submit">Comment</button>
            </form>
        </div>
    )
}
 export default Comments