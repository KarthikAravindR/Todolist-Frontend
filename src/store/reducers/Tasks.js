import * as actionTypes from '../actions/actionTypes'
import searchfilter from '../../components/UI/Search/Searchfilter'

const initialState = {
    tasks: [],
    modalShow: false,
    editModalShow: false,
    isLoading: false,
    error: null,
    taskToBeEdited: {},
    successfullydeleted: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.MODAL_SHOW:
            return {
                ...state,
                modalShow: true,
            }
        case actionTypes.MODAL_CLOSE:
            return {
                ...state,
                modalShow: false,
                editModalShow: false,
            }
        case actionTypes.FETCH_TASKS_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.FETCH_TASKS_SUCCESS:
            console.log(action.tasks)
            return {
                ...state,
                tasks: action.tasks,
                isLoading: false
            }
        case actionTypes.FETCH_TASKS_FAILED:
            return {
                isLoading: false,
                error: action.error
            }
        case actionTypes.ADD_TASK_START:
            return {
                ...state,
                isLoading: true,
                modalShow: true
            }
        case actionTypes.ADD_TASK_SUCCESS:
            const newOrder = {
                ...action.data,
                id:action.id
            }
            return {
                ...state,
                tasks: state.tasks.concat(newOrder),
                isLoading: false,
                modalShow: false
            }
        case actionTypes.ADD_TASK_FAILED:
            return {
                ...state,
                isLoading: false,
                modalShow: false,
                error: action.error
            }

        case actionTypes.EDIT_TASK_INIT:
            return {
                ...state,
                editModalShow: true,
                taskToBeEdited: action.updatedtaskelement
            }
        case actionTypes.EDIT_TASK_START:
            return {
                ...state,
                isLoading: true,
            }
        case actionTypes.EDIT_TASK_SUCCESS:
            return {
                ...state,
                tasks: action.updatedtask,
                isLoading: false,
                editModalShow: false
            }
        case actionTypes.EDIT_TASK_FAILED:
            return {
                ...state,
                isLoading: false,
                editmodalShow: false,
                error: action.error
            }

        case actionTypes.DELETE_TASK_START:
            return {
                ...state,
                isLoading: true,
            }
        case actionTypes.DELETE_TASK_SUCCESS:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.id),
                isLoading: false,
                successfullydeleted:true
            }
        case actionTypes.DELETE_TASK_ALERT:
            return{
                ...state,
                successfullydeleted:false
            }
        case actionTypes.DELETE_TASK_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }

        case actionTypes.COMPLETED_TASK_START:
            return {
                ...state,
                isLoading: true,
            }
        case actionTypes.COMPLETED_TASK_SUCCESS:
            console.log(action.updatedTask)
            return {
                ...state,
                tasks: action.updatedtask,  
                isLoading: false,
            }
        case actionTypes.COMPLETED_TASK_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }

        case actionTypes.SEARCH_TASK_SUCCESS:
            return {
                ...state,
                tasks: searchfilter(action.searchtext,action.localTask),
            }
        case actionTypes.SEARCH_TASK_FAILED:
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}

export default reducer