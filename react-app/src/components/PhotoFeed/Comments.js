import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentOnAPost } from '../../store/posts'
import './PhotoFeed.css';

function Comments(postID) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const user_id = user.id
    const [comment, setComment] = useState('')
    const { post_id } = postID

    const handleMakeAComment = async (e) => {
        e.preventDefault()
        const params = { user_id, post_id, comment }
        dispatch(commentOnAPost(params))
        setComment('')
        // await dispatch(getAllPosts())
    }

    return (
        <form className="commentForm" onSubmit={handleMakeAComment}>
            <input
                className='commentInput'
                type="text"
                value={comment}
                placeholder="Add a comment ....."
                onChange={(e) => setComment(e.target.value)}
            />
            <button className="commentButton" type="submit">Post</button>
        </form>
    )
}
export default Comments