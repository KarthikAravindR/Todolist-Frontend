import * as actionTypes from '../actions/actionTypes'

const inditialState = {
    token: null,
    userId: null,
    username: null,
    image: null,
    email: null,
    error: null,
    loading: false
}

const reducer = (state = inditialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START :
            return {
                ...state,
                error: null,
                loading: true
            }
        case actionTypes.AUTH_SUCCESS :
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                username: action.username,
                image: action.image,
                email: action.email,
                loading: false
            }
        case actionTypes.AUTH_FAILED :
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case actionTypes.AUTH_LOGOUT :
            return {
                ...state,
                token: null,
                userid: null
            }
        default: 
            return state
    }
}

export default reducer