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
export const Tasks = (token,userId) => {
    return dispatch => {
        dispatch(fetchTasksStart())
        const queryparams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
        axios.get('https://todolist-karthik.firebaseio.com/tasks.json' + queryparams)
            .then(response => {
                const localTask = []
                for (let key in response.data) {
                    localTask.push({
                        id: key,
                        title: response.data[key].title,
                        description: response.data[key].description,
                        completed: response.data[key].completed,
                    })
                }
                dispatch(fetchTasksSuccess(localTask))
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
export const addTaskSuccess = (id,data) => {
    return {
        type: actionTypes.ADD_TASK_SUCCESS,
        id: id,
        data: data
    }
}
export const addTaskFailed = (error) => {
    return {
        type: actionTypes.ADD_TASK_FAILED,
        error: error
    }
}
export const addTask = (task,token) => {
    return dispatch => {
        dispatch(addTaskStart())
        axios.post('https://todolist-karthik.firebaseio.com/tasks.json?auth=' + token, task)
            .then(response => {
                console.log(response.data.name,task)
                dispatch(addTaskSuccess(response.data.name,task))
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
export const editTaskSuccess = (updatedtask) => {
    return {
        type: actionTypes.EDIT_TASK_SUCCESS,
        updatedtask: updatedtask
    }
}
export const editTaskFailed = (error) => {
    return {
        type: actionTypes.EDIT_TASK_FAILED,
        error: error
    }
}
export const editTask = (editTask, updatedtask,token) => {
    return dispatch => {
        axios.put(`https://todolist-karthik.firebaseio.com/tasks/${editTask.id}.json?auth=` + token, editTask)
            .then(response => {
                dispatch(editTaskSuccess(updatedtask))
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
export const deleteTask = (id,token) => {
    return dispatch => {
        dispatch(deleteTaskStart())
        axios.delete(`https://todolist-karthik.firebaseio.com/tasks/${id}.json?auth=`+ token)
            .then(response => {
                dispatch(deleteTaskSuccess(id))
                setTimeout(() => {
                    dispatch(deleteTaskAlert())
                },2000)
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
export const completedTaskSuccess = (updatedtask) => {
    return {
        type: actionTypes.COMPLETED_TASK_SUCCESS,
        updatedtask: updatedtask
    }
}
export const completedTaskFailed = () => {
    return {
        type: actionTypes.COMPLETED_TASK_FAILED
    }
}
export const completedTask = (id,index,updatedtask,token) => {
    return dispatch => {
        dispatch(completedTaskStart())
        axios.put(`https://todolist-karthik.firebaseio.com/tasks/${id}.json?auth=` + token, updatedtask[index])
            .then(response => {
                dispatch(completedTaskSuccess(updatedtask))
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
export const searchTask = (searchtext,token) => {
    return dispatch => {
        axios.get('https://todolist-karthik.firebaseio.com/tasks.json?auth=' + token)
            .then(response => {
                const localTask = []
                for (let key in response.data) {
                    localTask.push({
                        id: key,
                        title: response.data[key].title,
                        description: response.data[key].description,
                        completed: response.data[key].completed,
                    })
                }
                dispatch(searchTaskSuccess(searchtext, localTask))
            }).catch(error => {
                dispatch(searchTaskFailed(error))
            })
}}

export const modalShow = () => {
    return{
        type:actionTypes.MODAL_SHOW
    }
}
export const modalClose = () => {
    return{
        type:actionTypes.MODAL_CLOSE
    }
}