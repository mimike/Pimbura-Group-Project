import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, useHistory } from "react-router-dom";
import { Modal } from '../../context/Modal';
import { getAllPosts, likeAPost, unlikeAPost, deleteAComment } from '../../store/posts'
import PostDetail from './PostDetail'
import Comments from '../PhotoFeed/Comments'

import './ExplorePage.css';
import '../../context/Modal.css';

const ExplorePage = () => {
    const dispatch = useDispatch();
    const allPosts = useSelector(state => state.posts.posts) || {};
    const user = useSelector(state => state.session.user) || {}
    const userId = user.id
    // console.log("POSTS--------------------",allPosts)
    const [showModal, setShowModal] = useState(false);
    const [commentId, setCommentId] = useState()
    const history = useHistory()
    const [likeID, setLikeID] = useState()
    const [postID, setPostID] = useState()
    const [targetedPhoto, setTargetedPhoto] = useState()
    const [ caption, setCaption] = useState()
    const [ targetimg, setTargetimg] = useState()
    const [ comments, setComments] = useState([])
    const [ post_id, setPost_id ] = useState()
    const [commentt, setCommentt] = useState('')

    
   

    const handleDeleteAComment = async () => {

        dispatch(deleteAComment(commentId))
        dispatch(getAllPosts())
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
    
    
    
    let thePost
    let ee
    let targetPost
    let postsArray
    let userHasLiked
    // let post_id
    const onClick = async (e) => {
        setShowModal(true)
        thePost = Object.values(e.target)[1]
        ee = thePost.src
        targetPost = Object.values(e.target)
        targetPost = targetPost[1].value
        setPost_id(targetPost.id)
        setTargetedPhoto(ee)
        setTargetimg(targetPost)
        setComments(targetPost.post_comments)
            console.log("9999999999999",targetPost['id'])
            // return post
             
        

        // console.log("1111111111111",Object.values(comments))
        // console.log("9999999999999",comments.comment)

      
        // console.log("1111++++++++++++++++++++++++++",targetPost)
        // console.log("1111++++++++++++++++++++++++++",thePostt)
        // comments.map(comment => { console.log("1111++++++++++++++++++++++++++",comment.comment)})

    }

    

   

    return (
        <div className="posts-list">
            <ul >
                {Object.values(allPosts).map(post => (
                    <li key={post.id}>
                        <button onClick={onClick} value={post.id}>
                            <img src={post.photo_url} value={post}/>
                            {/* <div value={post.id}><img src={post.photo_url} /></div> */}
                            {/* {setCaption(post.caption)} */}
                        </button>   
                    </li>
                ))}
            </ul>
            {showModal && (
                <Modal  onClose={() => setShowModal(false)}>
                    <div className="modal">
                        <div className="post-image-div"><img className="post-image" src={targetedPhoto} /></div>
                        <div className="post-content">                      
                            {/* <div className="first"> */}
                                <div className="user-avatar"><img className="user-avatar" src={user.avatar_url}></img></div>
                                <div className="user-follow">
                                    <div className="username-bold">{user.username}<span className="follow"><NavLink to="/follow">Follow</NavLink></span></div>
                                    {/* <div className="follow"><NavLink to="/follow">Follow</NavLink></div> */}
                                </div>
                                <div className="username-light">{user.username}</div>
                            {/* </div> */}
                                <div className="user-avatar-div2">
                                    <div><img className="user-avatar" src={user.avatar_url}></img></div>
                                    <div className="username-bold2">{user.username}: </div>
                                </div>
                                <div className="post-caption">{targetimg.caption}</div>
                                <div className="comments">
                                    <ul> {comments.map(comment =>
                                        <li key={comment}> 
                                            <div className="user-comment-avatar-div">
                                                <div ><img className="user-comment-avatar" src={targetimg.user.avatar_url}></img></div>
                                                <div className="username-comment">{targetimg.user.username}</div> 
                                            </div>
                                            <div className="comment">{comment.comment}  {userOwnsComment(comment, userId)}</div>
                                        </li>
                                        )}
                                    </ul>
                                </div>
                                <div className='icons'>
                                    {/* {
                                    userHasLiked = (targetPost, userId)
                                    } */}
                                    <i className="heart outline icon"></i>
                                    <i className="comment outline icon"></i>
                                    <i className="paper plane outline icon"></i>
                                </div>
                                {/* <div className="commentDiv"> */}
                                <Comments post_id={post_id}/>
                                    {/* {targetPost && <Comments postID={targetPost.value} />} */}
                                {/* </div> */}
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    )
}


export default ExplorePage;