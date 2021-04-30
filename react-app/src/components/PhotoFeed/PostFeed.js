import React, { useEffect, useState } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, likeAPost, unlikeAPost, deleteAComment } from '../../store/posts'
import Comments from './Comments'
import SuggestedUsers from '../SuggestedUsers/SuggestedUsers'
import './PhotoFeed.css';

function PhotoFeed() {
    const dispatch = useDispatch();
    const allPosts = useSelector(state => state.posts.posts);
    const user = useSelector(state => state.session.user)
    const userId = user.id
    const history = useHistory()


    const [likeID, setLikeID] = useState()
    const [postID, setPostID] = useState()
    const [commentId, setCommentId] = useState()

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    const handleLike = async (e) => {
        const user_id = userId
        const post_id = postID
        const params = { user_id, post_id }
        console.log('POST ID', postID)
        dispatch(likeAPost(params))
        dispatch(getAllPosts())
    }

    const handleUnlike = async (e) => {
        const post_id = userId
        const like_id = likeID
        const params = { post_id, like_id }
        console.log('UNLIKE TRIGGERED')
        dispatch(unlikeAPost(params))
        dispatch(getAllPosts())
    }

    const handleDeleteAComment = async () => {

        console.log('handle delete a comment triggered', commentId)
        dispatch(deleteAComment(commentId))
        dispatch(getAllPosts())
    }

    const userHasLiked = (post, userId) => {
        // console.log(post.post_likes.length)
        if (post.post_likes.length > 0) {

            for (let i = 0; i < post.post_likes.length; i++) {
                // console.log(post.post_likes[i].user_id)
                if (post.post_likes[i].user_id === userId) {
                    return (
                        <Link onClick={handleUnlike} onMouseOver={e => setLikeID(post.post_likes[i].id)}>
                            <i className="heart icon"></i>
                        </Link>
                    )
                }
                // else
            }

        }
        return <Link onClick={handleLike} onMouseOver={e => setPostID(post.id)}><i value={post.id} class="heart outline icon"></i></Link>
    }

    const userOwnsComment = (comment, userId) => {

        if (comment.user_id === userId) {
            let commentId = comment.id
            return (
                <div><span className='user' >{comment.user.username}</span>{comment.comment}
                    <button
                        value={commentId}
                        onMouseOver={() => setCommentId(comment.id)}
                        onClick={handleDeleteAComment}
                        className='editBtn'
                    ><i class="trash alternate icon"></i></button>
                </div>)
        } else {

            return <div><span className='user'>{comment.user.username}</span>{comment.comment}</div>
        }
    }

    const userProfile = async (e) => {
        let targetUser = Object.values(e.target)
        console.log('event', targetUser)
        history.push({
            pathname: `/user/${targetUser[1].id}`
        })
    };

    if (!allPosts) return null;

    return (
        <>
            <div className='container'>
                <div className='postsDiv'>
                    {Object.values(allPosts).map(post => (
                        <div className='individualPhotoDiv' key={`${post.id}`}>
                            <div className='userInfo'>
                                <img src={post.user.avatar_url} className="avatar" alt="" />
                                <span className='user' onClick={userProfile} id={`${post.user_id}`}>{post.user.username}</span>
                            </div>
                            <img className='individualImg' src={post.photo_url} alt="" />
                            <div className='icons'>
                                {
                                    userHasLiked(post, userId)
                                }
                                <i className="comment outline icon"></i>
                                <i className="paper plane outline icon"></i>
                            </div>
                            {
                                post.post_likes.length
                                    ? <div>{post.post_likes.length} Likes</div>
                                    : <div>0 Likes</div>
                            }
                            <div><span className='user' onClick={userProfile} id={`${post.user_id}`}>{post.user.username}</span> {post.caption}</div>
                            {post.post_comments.map(comment => (
                                userOwnsComment(comment, userId)
                            ))}
                            <div className="commentDiv">
                                <Comments post_id={post.id} />
                            </div>
                        </div>
                    ))}
                </div>
                <SuggestedUsers />
            </div>
        </>
    )


}

export default PhotoFeed
