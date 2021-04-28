import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getAllPosts} from '../store/posts'

function PhotoFeed(){
    const dispatch = useDispatch();
    const allPosts = useSelector(state => state.posts.posts);

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    if (!allPosts) return null;

    console.log(allPosts[1].post_comments[0].comment)
    
  

    return (
        <>
            <div className='postsDiv'>
                {Object.values(allPosts).map(post => (
                    <>
                        <img src={post.photo_url} alt=""/>
                        <div>{post.caption}</div>
                        
                    </>
                ))}
            </div>
        </>
    )


}

export default PhotoFeed