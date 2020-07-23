import * as actionTypes from './actionTypes'

export const setTitle = (data) => {
    return{
        type:actionTypes.SET_TITLE,
        data: data
    }
}
export const setDescription = (data) => {
    return{
        type:actionTypes.SET_DESCRIPTION,
        data: data
    }
}
export const setEditTitle = (data) => {
    return{
        type:actionTypes.SET_EDIT_TITLE,
        data: data
    }
}
export const setEditDescription = (data) => {
    return{
        type:actionTypes.SET_EDIT_DESCRIPTION,
        data: data
    }
}