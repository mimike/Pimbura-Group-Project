import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getAllPosts} from '../store/posts'

function PhotoFeed(){
    const dispatch = useDispatch();
    const allPosts = useSelector(state => state.posts.posts);
    const user = useSelector(state => state.session.user)
    const userId = user.id

    const [liked, setLiked] = useState(false)

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    const userHasLiked = (post, userId) => {
            if (post.post_likes.length > 0 && post.post_likes[0].id === userId){
                return (
                    <div>Unlike</div>
                )
            }
            return <div>Like</div>
    }

    if (!allPosts) return null;

    return (
        <>
            <div className='postsDiv'>
                {Object.values(allPosts).map(post => (
                    <>
                        <img src={post.photo_url} alt=""/>
                        <div>{post.caption}</div>
                        {post.post_comments.map(comment => (
                            <div>{comment.comment}</div>
                        ))}
                        {
                            post.post_likes.length  
                            ? <div>{post.post_likes.length} Likes</div>
                            : <div>0 Likes</div>
                        }
                        {
                            userHasLiked(post, userId)
                        }
                    </>
                ))}
            </div>
        </>
    )

                        
}

export default PhotoFeed