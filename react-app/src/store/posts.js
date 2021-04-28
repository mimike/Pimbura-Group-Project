
const UPLOAD_PHOTO = "posts/UPLOAD_PHOTO";
const DISPLAY_PHOTOS = "posts/DISPLAY_PHOTOS";

const createPost = (submission) => ({
    type: UPLOAD_PHOTO,
    payload: submission
})

const displayPosts = (posts) => ({
    type: DISPLAY_PHOTOS,
    payload: posts

})

export const getAllPosts = () => async (dispatch) => {
    // const response = await fetch('/api/posts')
    const response = await fetch('/api/posts/', {  //not done routes yet
        method: "GET",
    });

    if (response.ok){
        const posts = await response.json();
        dispatch(displayPosts(posts))
        return posts
    }
}

export const likeAPost = (params) => async dispatch => {
    const {user_id, post_id} = params
    const response = await fetch(`/api/posts/${post_id}/like`, {
        method: "POST",
        user_id,
        post_id
    })
    const data = await response.json()
    return
}

export const unlikeAPost = (params) => async dispatch => {
    const {post_id, like_id} = params
    const response = await fetch(`/api/posts/like/${like_id}`, {
        method: "DELETE",
        post_id,
        like_id
    })
    const data = await response.json()
    return
}

export const photoUpload = ( submission ) => async (dispatch) => {
    const { image, caption } = submission
    const formData = new FormData() //packages up submission data nicely
    formData.append("caption", caption)  // every single non file upload
    // for multiple files
    //   if (images && images.length !== 0) {
    //     for (var i = 0; i < images.length; i++) {
    //       formData.append("images", images[i]);
    //     }
    //   }

    if(image){
        formData.append("image", image)
    }
    console.log('BEFORE RESPONSE')
    const response = await fetch('/api/posts/', {  //not done routes yet
        method: "POST",
        body: formData
    });

    if (response.ok){  //202
        const data = await response.json();
        dispatch(createPost(data))
        // return data
    }
    // if (data.errors) {
    //     return;
    // }
    // dispatch(createPost(data))

}

const initialState = { post: null, posts: null }
export default function reducer(state = initialState, action){
    switch (action.type){
        case UPLOAD_PHOTO:
            return { ...state, post: action.payload };
        case DISPLAY_PHOTOS: {
            const allPosts = action.payload.posts;
            const postsObj = {};
            for (const post of allPosts){
                postsObj[post.id] = post
            }
            return {...state, posts: postsObj}
        }

        default:
            return state
    }
}
