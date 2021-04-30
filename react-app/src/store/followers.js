// const GET_FOLLOWERS = "errors/SET_ERRORS"

// export const getAllFollowers = (user) => ({
//     type: GET_FOLLOWERS,
//     payload: user
// })

// export const getFollowers = () => async(dispatch) => {
//     const response = await fetch('api/follower', {
//         method: "GET",
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             follower_id,
//             following_id
//         })
//     })
//     const data = await response.json();
//     if (data.errors) {
//         return;
//     }
//     dispatch(getFollowers(data))
// }

// export const followersReducer = (state= {}, action) => {
//     switch (action.type) {
//         case GET_FOLLOWERS:
//             return {...action.payload};
//         default:
//             return state;
//     }
// }
