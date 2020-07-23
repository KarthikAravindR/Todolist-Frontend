import * as actionTypes from '../actions/actionTypes'

const initialState = {
    title: '',
    description: '',
    edittitle: '',
    editdescription: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_TITLE:
            return {
                ...state,
                title: action.data,
            }
        case actionTypes.SET_DESCRIPTION:
            return {
                ...state,
                description: action.data
            }
        case actionTypes.SET_EDIT_TITLE:
            return {
                ...state,
                edittitle: action.data
            }
        case actionTypes.SET_EDIT_DESCRIPTION:
            console.log(action.tasks)
            return {
                ...state,
                editdescription: action.data
            }
        default:
            return state
    }
}

export default reducer