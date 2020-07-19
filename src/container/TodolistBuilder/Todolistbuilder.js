import React, { useState, useEffect } from 'react'
import axios from 'axios'

import EditModal from '../../components/UI/EditModal/Editmodal'
import Toolbar from '../../components/Toolbar/Toolbar'
import Search from '../../components/UI/Search/Search'
import searchfilter from '../../components/UI/Search/Searchfilter'
import Modal from '../../components/UI/Modal/Modal'
import Todolist from '../../components/Todolist/Todolist'
import './Todolistbuilder.css'

const Todolistbuilder = () => {
    const [task, setTask] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [taskToBeEdited, setTaskToBeEdited] = useState({})

    useEffect(() => {
        axios.get('https://todolist-karthik.firebaseio.com/tasks.json')
            .then(response => {
                const localTask = []
                for (let key in response.data) {
                    localTask.push({
                        id: key,
                        title: response.data[key].title,
                        description: response.data[key].description
                    })
                }
                setTask(localTask)
            }).catch(error => [
                console.log(error)
            ])
    }, [])
    const modalShowHandler = () => {
        setModalShow(true)
    }
    const modalclosehandler = () => {
        setModalShow(false)
        setEditModalShow(false)
    }
    const searchtaskHandler = (event) => {
        const searchtext = event.target.value
        axios.get('https://todolist-karthik.firebaseio.com/tasks.json')
            .then(response => {
                const localTask = []
                for (let key in response.data) {
                    localTask.push({
                        id: key,
                        title: response.data[key].title,
                        description: response.data[key].description
                    })
                }
                setTask(searchfilter(searchtext, localTask))
            }).catch(error => [
                console.log(error)
            ])
    }
    const addTaskHandler = task => {
        setIsLoading(true)
        axios.post('https://todolist-karthik.firebaseio.com/tasks.json', task)
            .then(response => {
                setTask(prevState => [...prevState,
                {
                    id: response.data.name,
                    ...task
                }
                ])
                setModalShow(false)
                setIsLoading(false)
            }).catch(error => {
                console.log(error)
            })
    }
    const editClickedHandler = (id) => {
        const index = task.findIndex((el) => el.id === id);
        const updatedtask = [...task]
        const updatedtaskelement = {
            ...updatedtask[index]
        }
        setTaskToBeEdited(updatedtaskelement)
        setEditModalShow(true)
    }
    const deleteClickedHandler = (id) => {
        axios.delete(`https://todolist-karthik.firebaseio.com/tasks/${id}.json`)
            .then(response => {
                setTask(prevState => prevState.filter(task => task.id !== id))
            })
    }
    const completedClickedHandler = (id) => {
        const index = task.findIndex((el) => el.id === id);
        const updatedtask = [...task]
        const updatedtaskelement = {
            ...updatedtask[index]
        }
        updatedtaskelement.completed = true
        updatedtask[index] = updatedtaskelement
        axios.put(`https://todolist-karthik.firebaseio.com/tasks/${id}.json`, updatedtask[index])
            .then(response => {
                setTask(updatedtask)
            })
    }
    const updateEditedHandler = editTask => {
        setIsLoading(true)
        let id = editTask.id
        const index = task.findIndex((el) => el.id === id);
        const updatedtask = [...task]
        let updatedtaskelement = {
            ...updatedtask[index]
        }
        updatedtaskelement = editTask
        updatedtask[index] = updatedtaskelement
        axios.put(`https://todolist-karthik.firebaseio.com/tasks/${id}.json`, editTask)
            .then(response => {
                setTask(updatedtask)
                setEditModalShow(false)
                setIsLoading(false)
            })
    }
    return (
        <div>
            <Toolbar />
            <div className="controls">
                <button className="addtask" onClick={modalShowHandler}>+ New Task</button>
                <Search Changed={searchtaskHandler} />
            </div>
            <Modal
                show={modalShow}
                isloading={isLoading}
                addTask={addTaskHandler}
                modalclosed={modalclosehandler} />
            <EditModal 
                show={editModalShow}
                isloading={isLoading}
                taskToBeEdited={taskToBeEdited}
                editTask={updateEditedHandler}
                modalclosed={modalclosehandler} />
            {!task[0] ? <div className="empty">Your Task to Do List is Empty.</div> : null}
            <Todolist
                alltask={task}
                editclicked={editClickedHandler}
                deleteclicked={deleteClickedHandler}
                completedclicked={completedClickedHandler}
            />
        </div>
    )
}

export default Todolistbuilder