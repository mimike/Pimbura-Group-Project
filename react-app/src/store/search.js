
const SEARCH_USER = "search/SEARCH_USER";

//action:
const searchUser = (searchList) => ({
    type: SEARCH_USER,
    payload: searchList
})


//thunk:
export const getSearchResult = (searchField) => async (dispatch) => {
    const response = await fetch ('/api/users/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            search: searchField
        })
    })
    const data = await response.json();
    dispatch(searchUser(data))
}

//reducer:
const initialState = { search: null };

export default function reducer (state = initialState, action){
    switch (action.type) {
        case SEARCH_USER:
            return { search: action.payload}
        default:
            return state;
    }
}