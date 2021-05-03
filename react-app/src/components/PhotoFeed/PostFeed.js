import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, likeAPost, unlikeAPost, deleteAComment, likeAComment, unlikeAcomment } from '../../store/posts'
import Comments from './Comments'
import SuggestedUsers from '../SuggestedUsers/SuggestedUsers'
import './PhotoFeed.css';
// import { getAllUsers } from '../../store/session'

function PhotoFeed() {
    const dispatch = useDispatch();
    const allPosts = useSelector(state => state.posts.posts);
    const user = useSelector(state => state.session.user)
    const userId = user.id
    const history = useHistory()
    let followedPosts;


    const [likeID, setLikeID] = useState()
    const [postID, setPostID] = useState()
    const [commentId, setCommentId] = useState()
    const [commentLike, setCommentLikeId] = useState()

    useEffect(() => {
        dispatch(getAllPosts())
        // dispatch(getAllUsers())
    }, [dispatch])

    const handleLike = async (e) => {
        const user_id = userId
        const post_id = postID
        const params = { user_id, post_id }
        dispatch(likeAPost(params))
        dispatch(getAllPosts())
    }

    const handleCommentLike = async (e) => {
        const user_id = userId
        const comment_id = commentId
        const params = { user_id, comment_id }
        dispatch(likeAComment(params))
        dispatch(getAllPosts())
    }

    const handleUnlike = async (e) => {
        const post_id = userId
        const like_id = likeID
        const params = { post_id, like_id }
        dispatch(unlikeAPost(params))
        dispatch(getAllPosts())
    }

    const handleCommentUnlike = async (e) => {
        const id = commentLike
        dispatch(unlikeAcomment(id))
        dispatch(getAllPosts())

    }

    const handleDeleteAComment = async () => {
        dispatch(deleteAComment(commentId))
        dispatch(getAllPosts())
    }

    const userHasLiked = (post, userId) => {
        if (post.post_likes.length > 0) {
            for (let i = 0; i < post.post_likes.length; i++) {
                if (post.post_likes[i].user_id === userId) {
                    return (
                        <span onClick={handleUnlike} onMouseOver={() => setLikeID(post.post_likes[i].id)}><i className="heart icon"></i></span>
                    )
                }

            }
        }
        return <span onClick={handleLike} onMouseOver={() => setPostID(post.id)}><i value={post.id} className="heart outline icon"></i></span>
    }

    const userOwnsComment = (comment, userId) => {
        if (comment.user_id === userId) {
            let commentId = comment.id
            return (
                <div><span className='user' >{comment.user.username}</span><span className='commentSpan'>{comment.comment}</span>
                    <button
                        value={commentId}
                        onMouseOver={() => setCommentId(comment.id)}
                        onClick={handleDeleteAComment}
                        className='editBtn'
                    ><i class="trash alternate icon"></i></button>
                    {userOwnsCommentLike(comment, userId)}
                </div>)
        } else {
            return <div><span className='user'>{comment.user.username}</span><span className='commentSpan'>{comment.comment}</span>{userOwnsCommentLike(comment, userId)}</div>
        }
    }

    const userOwnsCommentLike = (comment, userId) => {

        if (comment.comment_likes.length) {
            for (let i = 0; i < comment.comment_likes.length; i++) {
                console.log('each like within comment likes array',comment.comment_likes[i])
                if (comment.comment_likes[i].user_id === userId) {
                     return <i onMouseOver={() => setCommentLikeId(comment.comment_likes[i].id)} onClick={handleCommentUnlike} className="heart icon"></i>
                }
            }
        }
        else {
            return <i onMouseOver={() => setCommentId(comment.id)} onClick={handleCommentLike} className="heart outline icon"></i>
        }

    }

    const userProfile = async (e) => {
        let targetUser = Object.values(e.target)
        history.push({
            pathname: `/user/${targetUser[1].id}`
        })
    };

    if (!allPosts) return null;
    console.log('posts------', allPosts)
    { followedPosts = Object.values(allPosts).filter(function (el) { return el.user.username != user.username && user.following.some(obj => obj.username === el.user.username) }) }
    // obj.username === el.user.username
    console.log('followedposts', followedPosts)

    return (
        <>
            <div className='container'>
                <div className='postsDiv'>
                    {Object.values(followedPosts).map(post => (
                        <div key={post.id} className='individualPhotoDiv' key={`${post.id}`}>
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
                                    ? <div className='commentsandlikesDiv'>{post.post_likes.length} Likes</div>
                                    : <div className='commentsandlikesDiv'>0 Likes</div>
                            }
                            <div className='commentsandlikesDiv'><span className='user' onClick={userProfile} id={`${post.user_id}`}>{post.user.username}</span> {post.caption}
                                {post.post_comments.map(comment => (
                                    userOwnsComment(comment, userId)

                                ))}
                            </div>
                            <div className="commentDiv">
                                <Comments post_id={post.id} />
                            </div>
                        </div>
                    ))}
                </div>
                <SuggestedUsers />
            </div>
            <footer>
                <ul className="footer-links">
                <li><a href="/">About</a></li>
                <li><a href="/">Blog</a></li>
                <li><a href="/">Jobs</a></li>
                <li><a href="/">API</a></li>
                <li><a href="/">Privacy</a></li>
                <li><a href="/">Terms</a></li>
                <li><a href="/">Top Accounts</a></li>
                <li><a href="/">Hashtags</a></li>
                <li><a href="/">Locations</a></li>
                </ul>
            </footer>
            <div className="footer-copyright">
				<h6>© 2021 Overshare from Marc, Savannah, Heba & Mimi</h6>
			</div>
        </>
    )


}

export default PhotoFeed
