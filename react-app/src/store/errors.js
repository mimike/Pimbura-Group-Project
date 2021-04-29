const SET_ERRORS = "errors/SET_ERRORS"
const REMOVE_ERRORS = "errors/REMOVE_ERRORS"

export const setErrors = (errors) => ({
    type: SET_ERRORS,
    payload: errors
})

export const removeErrors = () =>({
    type: REMOVE_ERRORS
})

export const errorsReducer = (state= {}, action) => {
    switch (action.type) {
        case SET_ERRORS:
            return {...action.payload};
        case REMOVE_ERRORS:
            return {}
        default:
            return state;
    }
}
