import * as actionTypes from './actionTypes'
import axios from 'axios'

export const fetchTasksStart = () => {
    return {
        type: actionTypes.FETCH_TASKS_START
    }
}
export const fetchTasksSuccess = (localTask) => {
    console.log(localTask)
    return {
        type: actionTypes.FETCH_TASKS_SUCCESS,
        tasks: localTask
    }
}
export const fetchTasksFailed = (error) => {
    return {
        type: actionTypes.FETCH_TASKS_FAILED,
        error: error
    }
}
export const Tasks = (token, id) => {
    return dispatch => {
        dispatch(fetchTasksStart())
        let config = {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        }
        axios.get(process.env.REACT_APP_BACKEND_URL + '/gettasks/' + id, config)
            .then(response => {
                console.log(response)
                dispatch(fetchTasksSuccess(response.data.userTasks))
            }).catch(error => {
                dispatch(fetchTasksFailed(error))
            })
    }
}

export const addTaskStart = () => {
    return {
        type: actionTypes.ADD_TASK_START
    }
}
export const addTaskSuccess = (data) => {
    return {
        type: actionTypes.ADD_TASK_SUCCESS,
        data: data
    }
}
export const addTaskFailed = (error) => {
    return {
        type: actionTypes.ADD_TASK_FAILED,
        error: error
    }
}
export const addTask = (task, token, id) => {
    return dispatch => {
        dispatch(addTaskStart())
        let config = {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        }
        axios.post(process.env.REACT_APP_BACKEND_URL + '/task/new/' + id, task, config)
            .then(response => {
                console.log(response)
                dispatch(addTaskSuccess(response.data.userTasks))
            }).catch(error => {
                dispatch(addTaskFailed(error))
            })
    }
}

export const editTaskInit = (updatedtaskelement) => {
    return {
        type: actionTypes.EDIT_TASK_INIT,
        updatedtaskelement: updatedtaskelement
    }
}
export const editTaskStart = () => {
    return {
        type: actionTypes.EDIT_TASK_START
    }
}
export const editTaskSuccess = (editTask) => {
    return {
        type: actionTypes.EDIT_TASK_SUCCESS,
        editTask: editTask
    }
}
export const editTaskFailed = (error) => {
    return {
        type: actionTypes.EDIT_TASK_FAILED,
        error: error
    }
}
export const editTask = (editTask, id, token) => {
    console.log(editTask, id)
    return dispatch => {
        let config = {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        }
        let data = {
            editTask: editTask
        }
        axios.post(process.env.REACT_APP_BACKEND_URL + '/task/edit/' + id, data, config)
            .then(response => {
                dispatch(editTaskSuccess(editTask))
            })
            .catch(error => {
                dispatch(editTaskFailed(error))
            })
    }
}
export const deleteTaskStart = () => {
    return {
        type: actionTypes.DELETE_TASK_START
    }
}
export const deleteTaskSuccess = (id) => {
    return {
        type: actionTypes.DELETE_TASK_SUCCESS,
        id: id
    }
}
export const deleteTaskFailed = (error) => {
    return {
        type: actionTypes.DELETE_TASK_FAILED,
        error: error
    }
}
export const deleteTask = (taskid, token, id) => {
    return dispatch => {
        dispatch(deleteTaskStart())
        let config = {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        }
        let data = {
            taskid: taskid
        }
        axios.post(process.env.REACT_APP_BACKEND_URL + '/task/delete/' + id, data, config)
            .then(response => {
                dispatch(deleteTaskSuccess(taskid))
            })
            .catch(error => {
                dispatch(deleteTaskFailed(error))
            })
    }
}
export const deleteTaskAlert = () => {
    return {
        type: actionTypes.DELETE_TASK_ALERT,
    }
}

export const completedTaskStart = () => {
    return {
        type: actionTypes.COMPLETED_TASK_START
    }
}
export const completedTaskSuccess = (id) => {
    return {
        type: actionTypes.COMPLETED_TASK_SUCCESS,
        id: id
    }
}
export const completedTaskFailed = () => {
    return {
        type: actionTypes.COMPLETED_TASK_FAILED
    }
}
export const completedTask = (taskid, id, token) => {
    return dispatch => {
        dispatch(completedTaskStart())
        let config = {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        }
        let data = {
            taskid: taskid
        }
        axios.post(process.env.REACT_APP_BACKEND_URL + '/task/editcomplete/' + id, data, config)
            .then(response => {
                console.log(response)
                dispatch(completedTaskSuccess(taskid))
            })
            .catch(error => {
                dispatch(completedTaskFailed(error))
            })
    }
}

export const searchTaskSuccess = (searchtext, localTask) => {
    return {
        type: actionTypes.SEARCH_TASK_SUCCESS,
        searchtext: searchtext,
        localTask: localTask,
    }
}
export const searchTaskFailed = (error) => {
    return {
        type: actionTypes.SEARCH_TASK_FAILED,
        error: error
    }
}
export const searchTask = (searchtext, token, id) => {
    return dispatch => {
        let config = {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        }
        axios.get(process.env.REACT_APP_BACKEND_URL + '/gettasks/' + id, config)
            .then(response => {
                dispatch(searchTaskSuccess(searchtext, response.data.userTasks))
            }).catch(error => {
                dispatch(searchTaskFailed(error))
            })
    }
}

export const modalShow = () => {
    return {
        type: actionTypes.MODAL_SHOW
    }
}
export const modalClose = () => {
    return {
        type: actionTypes.MODAL_CLOSE
    }
}