
const UPLOAD_PHOTO = "posts/UPLOAD_PHOTO";

const createPost = (submission) => ({
    type: UPLOAD_PHOTO,
    payload: submission
})

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

const initialState = { post: null }
export default function reducer(state = initialState, action){
    switch (action.type){
        case UPLOAD_PHOTO:
            return { post: action.payload };

        default:
            return state
    }
}
