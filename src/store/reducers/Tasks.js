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
            let id = action.editTask._id
            const index = state.tasks.findIndex((el) => el._id === id);
            const updatedtask = [...state.tasks]
            let updatedtaskelement = {
                ...updatedtask[index]
            }
            updatedtaskelement = action.editTask
            updatedtask[index] = updatedtaskelement
            return {
                ...state,
                tasks: updatedtask,
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
                tasks: state.tasks.filter(task => task._id !== action.id),
                isLoading: false,
                successfullydeleted: true
            }
        case actionTypes.DELETE_TASK_ALERT:
            return {
                ...state,
                successfullydeleted: false
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
            const index1 = state.tasks.findIndex((el) => el._id === action.id)
            const updatedtask1 = [...state.tasks]
            const updatedtaskelement1 = {
                ...updatedtask1[index1]
            }
            updatedtaskelement1.completed = true
            updatedtask1[index1] = updatedtaskelement1
            return {
                ...state,
                tasks: updatedtask1,
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
                tasks: searchfilter(action.searchtext, action.localTask),
            }
        case actionTypes.SEARCH_TASK_FAILED:
            return {
                ...state,
                error: action.error
            }
        case actionTypes.AUTH_LOGOUT_2:
            return {
                ...state,
                tasks: [],
                modalShow: false,
                editModalShow: false,
                isLoading: false,
                error: null,
                taskToBeEdited: {},
                successfullydeleted: false
            }
        default:
            return state
    }
}

export default reducer