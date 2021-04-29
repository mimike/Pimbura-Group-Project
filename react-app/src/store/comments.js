// const SET_COMMENT = "comments/SET_COMMENTS"
// const GET_COMMENTS= "comments/GET_COMMENTS"
// //const REMOVE_COMMENT = "comments/REMOVE_COMMENT"
// //const EDIT_COMMENT

// export const setComment = (comment) => ({
//     type: SET_COMMENT,
//     payload: comment
// })

// export const getComments = () => ({
//     type: GET_COMMENTS,
//     payload: comment
// })

// export const editComments = () => ({
//     type: EDIT_COMMENTS,
//     payload: comment
// })

// // export const removeComment = () =>({
// //     type: REMOVE_COMMENT
// // })

// //thunks
// export const getAllComments = () => async (dispatch) => {
//     const res = await fetch('/api/comments/', {
//         method: 'GET'
//     })
//     const comments = await res.json();
//     dispatch(getComments())
//     return comments

// }

// //reducer
// export default function commentsReducer(state = [], action) {
//     switch (action.type){
//         case SET_COMMENT:
//             return {};
//         case REMOVE_COMMENT:
//             const commentId = action.data;
//             return state.filter(comment => comment.id !== commentId);
//         // case GET_COMMENTS:
//         //     return {};
//         default:
//             return state
//     }
// }
