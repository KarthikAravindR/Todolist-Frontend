import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../store/actions/index'
import Toast from '../../components/UI/Toasts/Toast'
import Modal from '../../components/UI/Modal/Modal'
import EditModal from '../../components/UI/EditModal/Editmodal'
import Search from '../../components/UI/Search/Search'
import Todolist from '../../components/Todolist/Todolist'
import './Todolistbuilder.css'

const Todolistbuilder = (props) => {
    const {onFetchTasks} = props;
    const {token} = props;
    const {isAuthenticated} = props;
    const {userid} = props;
    useEffect(() => {
        console.log("FETCHING")
        onFetchTasks(token,userid)
    },[token,onFetchTasks,isAuthenticated,userid])

    const modalShowHandler = () => {
        props.onModalShow()
    }
    const modalclosehandler = () => {
        props.onModalClose()
    }
    const searchtaskHandler = (event) => {
        const searchtext = event.target.value
        props.onSearchTasks(searchtext,props.token)
    }
    const addTaskHandler = task => {
        props.onAddTasks(task,props.token)
    }
    const editClickedHandler = (id) => {
        const index = props.task.findIndex((el) => el.id === id);
        const updatedtask = [...props.task]
        const updatedtaskelement = {
            ...updatedtask[index]
        }
        props.onEditInit(updatedtaskelement)
    }
    const deleteClickedHandler = (id) => {
        props.onDeleteTasks(id,props.token)
    }
    const completedClickedHandler = (id) => {
        const index = props.task.findIndex((el) => el.id === id);
        const updatedtask = [...props.task]
        const updatedtaskelement = {
            ...updatedtask[index]
        }
        updatedtaskelement.completed = true
        updatedtask[index] = updatedtaskelement
        props.onCompletedTasks(id,index,updatedtask,props.token)
    }
    const updateEditedHandler = editTask => {
        let id = editTask.id
        const index = props.task.findIndex((el) => el.id === id);
        const updatedtask = [...props.task]
        let updatedtaskelement = {
            ...updatedtask[index]
        }
        updatedtaskelement = editTask
        updatedtask[index] = updatedtaskelement
        props.onEditTasks(editTask,updatedtask,props.token)
    }
    const askToSignHandler = () => {
        props.history.replace('/')
    }
    return (
        <div>
            {props.isAuthenticated? <div>
                <div className="controls">
                    <button className="addtask" onClick={modalShowHandler}>+ New Task</button>
                    <Search Changed={searchtaskHandler} />
                </div>
                <Toast />
                <Modal
                    show={props.modalShow}
                    isloading={props.isLoading}
                    addTask={addTaskHandler}
                    modalclosed={modalclosehandler} />
                <EditModal 
                    show={props.editModalShow}
                    isloading={props.isLoading}
                    taskToBeEdited={props.taskToBeEdited}
                    editTask={updateEditedHandler}
                    modalclosed={modalclosehandler} />
                {/* {!props.task[0] ? <div className="empty">Your Task to Do List is Empty.</div> : null} */}
                <Todolist
                    alltask={props.task}
                    editclicked={editClickedHandler}
                    deleteclicked={deleteClickedHandler}
                    completedclicked={completedClickedHandler}
                />
            </div> 
            :<div className="askToSignHandler">
                <button onClick={askToSignHandler} type="button" className="btn btn-light">Sign In To Be Productive.It Just Takes Two Minutes</button>
            </div> }
        </div>
    )
}
const mapStateToProps = state => {
    return{
        task: state.task.tasks,
        modalShow: state.task.modalShow,
        editModalShow: state.task.editModalShow,
        isLoading: state.task.isLoading,
        taskToBeEdited: state.task.taskToBeEdited,
        token: state.auth.token,
        isAuthenticated: state.auth.token !== null,
        userid: state.auth.userid
    }
}
const mapDispatchToState = dispatch => {
    return{
        onFetchTasks: (token,userid) => {dispatch(actions.Tasks(token,userid))},
        onAddTasks: (task,token) => {dispatch(actions.addTask(task,token))},
        onEditInit: (updatedtaskelement) => {dispatch(actions.editTaskInit(updatedtaskelement))},
        onEditTasks: (editTask, updatedtask,token) => {dispatch(actions.editTask(editTask, updatedtask,token))},
        onDeleteTasks: (id,token) => {dispatch(actions.deleteTask(id,token))},
        onCompletedTasks: (id,index,updatedtask,token) => {dispatch(actions.completedTask(id,index,updatedtask,token))},
        onSearchTasks: (searchtext,token) => {dispatch(actions.searchTask(searchtext,token))},
        onModalShow: () => {dispatch(actions.modalShow())},
        onModalClose: () => {dispatch(actions.modalClose())},
    }
}
export default connect(mapStateToProps,mapDispatchToState)(Todolistbuilder)