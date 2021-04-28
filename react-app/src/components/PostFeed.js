import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getAllPosts, likeAPost, unlikeAPost } from '../store/posts'

function PhotoFeed(){
    const dispatch = useDispatch();
    const allPosts = useSelector(state => state.posts.posts);
    const user = useSelector(state => state.session.user)
    const userId = user.id


    const [likeID, setLikeID] = useState()
    const [postID, setPostID] = useState()

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    const handleLike = async (e) => {
        const user_id = userId
        const post_id = postID
        const params = {user_id, post_id}
        console.log('POST ID', postID)
        dispatch(likeAPost(params))
        dispatch(getAllPosts())
    }

    const handleUnlike = async (e) => {
        const post_id = userId
        const like_id = likeID
        const params = {post_id, like_id}
        console.log('UNLIKE TRIGGERED')
        dispatch(unlikeAPost(params))
        dispatch(getAllPosts())
    }

    // const userHasLiked = (post, userId) => {
    //         if (post.post_likes.length > 0 && post.post_likes.user_id === userId){
    //             return (
    //                 <Link onClick={handleUnlike}>
    //                     <div value={post.id}><i  value={post.id} class="heart icon"></i></div>
    //                 </Link>
    //             )
    //         }
    //         return <Link onClick={handleLike}><div value={post.id}><i value={post.id} class="heart outline icon"></i></div></Link>
    // }

    const userHasLiked = (post, userId) => {
        // console.log(post.post_likes.length)
        if (post.post_likes.length > 0 ){
            
            for (let i = 0 ; i < post.post_likes.length; i++){
                // console.log(post.post_likes[i].user_id)
                if (post.post_likes[i].user_id === userId){
                    console.log(post.post_likes[i])
                    return (
                        <Link onClick={handleUnlike} onMouseOver={e => setLikeID(post.post_likes[i].id)}>
                            <div value={post.id}><i class="heart icon"></i></div>
                        </Link>
                    )
                }
                // else 
            }
            
        }
        return <Link onClick={handleLike} onMouseOver={e => setPostID(post.id)}><div value={post.id}><i value={post.id} class="heart outline icon"></i></div></Link>
}

    if (!allPosts) return null;

    return (
        <>
            <div className='postsDiv' >
                <div>
                    {Object.values(allPosts).map(post => (
                        <div >
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
                        </div>
                    ))}
                </div>
            </div>
        </>
    )

                        
}

export default PhotoFeed