// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import './ExplorePage.css';
// const PostDetail = () => {

//     const allPosts = useSelector(state => state.posts.posts) || {};
//     const user = useSelector(state => state.session.user) || {}
//     // console.log("POSTS--------------------",allPosts)
//     const [showModal, setShowModal] = useState(false);

//     return (
//         <div > 
//             {/* <h1>HIII</h1> */}
//             {/* <div className="post-image" style={{backgroundImage: `url(${post.photo_url})`}}></div> */}
//             <img src={post.photo_url} className="post-image"/>
//             {/* {console.log("2_____",post.id, post.photo_url )} */}
//             <div>{user.username}</div>
//             <div>{post.caption}</div>
                                            
//         </div>
//     )
// }

// export default PostDetail;