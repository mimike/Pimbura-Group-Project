// const SET_COMMENT = "comments/SET_COMMENTS"
// const REMOVE_COMMENT = "comments/REMOVE_COMMENT"

// export const setComment = () => {
//     type: SET_COMMENT,
//     payload:
// }

// export const removeComment = () =>({
//     type: REMOVE_ERRORS
// })


// export default function commentsReducer (state = [], action) {
//     switch (action.type){
//         case SET_COMMENT:
//             return { ...state, post: action.payload };
//         case REMOVE_COMMENT: {
//             const allPosts = action.payload.posts;
//             const postsObj = {};
//             for (const post of allPosts){
//                 postsObj[post.id] = post
//             }
//             return {...state, posts: postsObj}
//         }

//         default:
//             return state
// }
