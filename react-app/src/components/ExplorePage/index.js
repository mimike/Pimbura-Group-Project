import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink} from "react-router-dom";
import { Modal } from '../../context/Modal';
import Comments from '../PhotoFeed/Comments'

import './ExplorePage.css';
import '../../context/Modal.css';

const ExplorePage = () => {
    const allPosts = useSelector(state => state.posts.posts) || {};
    const user = useSelector(state => state.session.user) || {}
    const userId = user.id
    console.log("POSTS--------------------",userId)
    const [showModal, setShowModal] = useState(false);
    const [targetedPhoto, setTargetedPhoto] = useState()
    const [ targetimg, setTargetimg] = useState()
    const [ comments, setComments] = useState([])
    const [ post_id, setPost_id ] = useState()
    const [userProfile, setUserProfile] = useState()
    const [postUser, setPostUser] = useState()



    let thePost
    let ee
    let targetPost
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
        setPostUser(targetPost.user)
        setUserProfile(targetPost.user_id)

    }





    return (
        <>
        <div className="posts-list">
            <ul>
                <div className="post-image-div2">
                    {Object.values(allPosts).map((post, i) => (
                            <li  key={i}>
                            {/* {console.log("++++++++++++++",Object.values(post))} */}
                                <button className="post-image-button" onClick={onClick} value={post.id}>
                                    <div className="explore-tile">
                                        <img  src={post.photo_url} value={post}/>
                                    </div>
                                    {/* <img  src={post.photo_url} value={post}/> */}
                                </button>
                            </li>
                    ))}
                </div>
            </ul>
            {showModal && (
                <Modal  onClose={() => setShowModal(false)}>
                    <div className="modal">
                        <div className="post-image-div"><img className="post-image" src={targetedPhoto} /></div>
                        <div className="post-content">
                            <NavLink to={`/user/${userProfile}`}>
                                <div className="first">
                                    <div><img className="user-avatar" src={postUser.avatar_url}></img></div>
                                    <div className="user-follow">
                                        <div className="username-bold">{postUser.username}<div className="follow"><NavLink to="/follow">Follow</NavLink></div></div>
                                    {/* <div className="username-light">{postUser.username}</div> */}
                                    </div>
                                </div>
                            </NavLink>
                            <NavLink to={`/user/${userProfile}`}>
                                <div className="user-avatar-div2">
                                    <div><img className="user-avatar" src={postUser.avatar_url}></img></div>
                                    <div className="username-bold2">{postUser.username} </div>
                                </div>
                            </NavLink>
                                <div className="post-caption">{targetimg.caption}</div>
                                <div className="comments-div">
                                    <ul className="comments"> {comments.map((comment,i) =>
                                        <li className="comments-list" key={i}>
                                            {/* {console.log("++++++++++++++",comment)} */}
                                        <NavLink to={`/user/${comment.user_id}`}>
                                            <div className="user-comment-avatar-div">
                                                <div >
                                                    <img className="user-comment-avatar" src={comment.user.avatar_url}/>
                                                    <div className="user-comment">{comment.user.username}</div>
                                                </div>
                                            </div>
                                        </NavLink>
                                            <div className="comment">
                                                {comment.comment}
                                             </div>
                                        </li>
                                        )}
                                    </ul>
                                </div>
                                <div className='icons'>

                                    <i className="heart outline icon"></i>
                                    <i className="comment outline icon"></i>
                                    <i className="paper plane outline icon"></i>
                                </div>
                                <div className="post-comment-div">
                                    <Comments  className="post-comment" post_id={post_id}/>
                                </div>
                        </div>
                    </div>
                </Modal>
            )}
               <footer>
        <ul class="footer-links">
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
        </div>
        </>
    )
}


export default ExplorePage;
