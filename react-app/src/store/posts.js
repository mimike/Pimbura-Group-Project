
const UPLOAD_PHOTO = "posts/UPLOAD_PHOTO";
const DISPLAY_PHOTOS = "posts/DISPLAY_PHOTOS";
const UPDATE_LIKES = "posts/UPDATE_LIKES"

const createPost = (submission) => ({
    type: UPLOAD_PHOTO,
    payload: submission
})

const displayPosts = (posts) => ({
    type: DISPLAY_PHOTOS,
    payload: posts

})

const updatePostLikes = (post) => ({
    type: UPDATE_LIKES,
    payload: post
})

export const getAllPosts = () => async (dispatch) => {
    // const response = await fetch('/api/posts')
    const response = await fetch('/api/posts/', {  //not done routes yet
        method: "GET",
    });
    if (response.ok) {
        const posts = await response.json();
        dispatch(displayPosts(posts))
        return posts
    }
}

export const getAllUserPosts = (id) => async (dispatch) => {
    // const response = await fetch('/api/posts')
    const response = await fetch('/api/posts/user/:id', {  //not done routes yet
        method: "GET",
    });

    if (response.ok) {
        const posts = await response.json();
        dispatch(displayPosts(posts))
        return posts
    }
}

export const likeAPost = (params) => async dispatch => {
    const { user_id, post_id } = params
    const response = await fetch(`/api/posts/${post_id}/like`, {
        method: "POST",
        user_id,
        post_id
    })
    const data = await response.json()
    dispatch(updatePostLikes(data))
}

export const likeAComment = (params) => async dispatch => {
    const {user_id, comment_id} = params
    // console.log("INSIDE LIKEACOMMENT FUNCTION THUNK")
    const response = await fetch(`/api/comments/${comment_id}/like`, {
        method: "POST",
        user_id,
    })
    const data = await response.json()
    dispatch(updatePostLikes(data))
    
}



export const unlikeAPost = (params) => async dispatch => {
    const { post_id, like_id } = params
    
    console.log('post id from thunk',post_id, like_id)
    const response = await fetch(`/api/posts/like/${post_id}`, {
        method: "DELETE"
        
    })
    const data = await response.json()
    dispatch(updatePostLikes(data))
}

export const unlikeAcomment = (id, comment_id) => async dispatch => {
    const response = await fetch(`api/comments/${id}/unlike/${comment_id}`, {
        method: "DELETE",
    })

    const data = await response.json()
    dispatch(updatePostLikes(data))
}

export const commentOnAPost = (params) => async dispatch => {
    const {user_id, post_id, comment} = params
    const response = await fetch(`/api/posts/${post_id}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_id,
            comment,
        }),
    });
    const data = await response.json
    return
}
export const deleteAComment = (commentId) => async dispatch => {
    const response = await fetch(`api/posts/comments/${commentId}`, {
        method: "DELETE",
        commentId,
    })

    const data = await response.json()
    return
}

export const photoUpload = (submission) => async (dispatch) => {
    const { image, caption } = submission
    const formData = new FormData() //packages up submission data nicely
    formData.append("caption", caption)  // every single non file upload
    // for multiple files
    //   if (images && images.length !== 0) {
    //     for (var i = 0; i < images.length; i++) {
    //       formData.append("images", images[i]);
    //     }
    //   }

    if (image) {
        formData.append("image", image)
    }
    // console.log('BEFORE RESPONSE')
    const response = await fetch('/api/posts/', {  //not done routes yet
        method: "POST",
        body: formData
    });
    // console.log("------!")
    if (response.ok) {  //202
        const data = await response.json();
        // console.log('from inside the thunk',data)
        dispatch(createPost(data))
        return 
    }
  
    // if (data.errors) {
    //     return;
    // }
    // dispatch(createPost(data))

}

const initialState = { post: null, posts: null }
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPLOAD_PHOTO:
            return { ...state, post: action.payload };
        case DISPLAY_PHOTOS: {
            const allPosts = action.payload.posts;
            const postsObj = {};
            for (const post of allPosts) {
                postsObj[post.id] = post
            }
            return { ...state, posts: postsObj }
        }
        case UPDATE_LIKES: {
            const post = action.payload.post
            const allPosts = {...state.posts}
            allPosts[post.id] = post
            return {...state, posts: allPosts}

        }

        default:
            return state
    }
}
