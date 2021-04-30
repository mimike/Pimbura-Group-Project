const SET_FOLLOWERS = "errors/SET_ERRORS"


export const getFollowers = (user) => ({
    type: SET_FOLLOWERS,
    payload: user
})

export const getFollowers = () => async(dispatch) => {
    const response = await fetch('api/follower', {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    })
    const data = await response.json();
    if (data.errors) {
        return;
    }
    dispatch(getFollowers(data))
}

export const followersReducer = (state= {}, action) => {
    switch (action.type) {
        case SET_FOLLOWERS:
            return {...action.payload};

        default:
            return state;
    }
}
