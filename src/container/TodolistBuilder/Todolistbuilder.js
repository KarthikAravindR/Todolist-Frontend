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
    const {userId} = props;
    useEffect(() => {
        console.log("FETCHING")
        onFetchTasks(token,userId)
    },[token,onFetchTasks,isAuthenticated,userId])

    const modalShowHandler = () => {
        props.onModalShow()
    }
    const modalclosehandler = () => {
        props.onModalClose()
    }
    const searchtaskHandler = (event) => {
        const searchtext = event.target.value
        props.onSearchTasks(searchtext,props.token, userId)
    }
    const addTaskHandler = task => {
        props.onAddTasks(task,props.token,userId)
    }
    const editClickedHandler = (id) => {
        const index = props.task.findIndex((el) => el._id === id);
        const updatedtask = [...props.task]
        const updatedtaskelement = {
            ...updatedtask[index]
        }
        props.onEditInit(updatedtaskelement)
    }
    const deleteClickedHandler = (id) => {
        props.onDeleteTasks(id,props.token, userId)
    }
    const completedClickedHandler = (id) => {
        props.onCompletedTasks(id,userId,props.token)
    }
    const updateEditedHandler = editTask => {
        props.onEditTasks(editTask,userId,props.token)
    }
    const askToSignHandler = () => {
        props.history.replace('/')
    }
    return (
        <div>
            {props.isAuthenticated? <div className="Toolbar_container">
                <div className="controls">
                    <button className="addtask" onClick={modalShowHandler}>+ New Task</button>
                    <Search Changed={searchtaskHandler} />
                </div>
                <Toast />
                {props.modalShow && <Modal
                    show={props.modalShow}
                    isloading={props.isLoading}
                    addTask={addTaskHandler}
                    modalclosed={modalclosehandler} />}
                {props.editModalShow && <EditModal 
                    show={props.editModalShow}
                    isloading={props.isLoading}
                    taskToBeEdited={props.taskToBeEdited}
                    editTask={updateEditedHandler}
                    modalclosed={modalclosehandler} />}
                {/* {!props.task[0] ? <div className="empty">Your Task to Do List is Empty.</div> : null} */}
                {props.task && <Todolist
                    alltask={props.task}
                    editclicked={editClickedHandler}
                    deleteclicked={deleteClickedHandler}
                    completedclicked={completedClickedHandler}
                />}
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
        userId: state.auth.userId
    }
}
const mapDispatchToState = dispatch => {
    return{
        onFetchTasks: (token,userId) => {dispatch(actions.Tasks(token,userId))},
        onAddTasks: (task,token,userId) => {dispatch(actions.addTask(task,token,userId))},
        onEditInit: (updatedtaskelement) => {dispatch(actions.editTaskInit(updatedtaskelement))},
        onEditTasks: (editTask,userId,token) => {dispatch(actions.editTask(editTask,userId,token))},
        onDeleteTasks: (id,token,userId) => {dispatch(actions.deleteTask(id,token,userId))},
        onCompletedTasks: (id,userId,token) => {dispatch(actions.completedTask(id,userId,token))},
        onSearchTasks: (searchtext,token,userId) => {dispatch(actions.searchTask(searchtext,token,userId))},
        onModalShow: () => {dispatch(actions.modalShow())},
        onModalClose: () => {dispatch(actions.modalClose())},
    }
}
export default connect(mapStateToProps,mapDispatchToState)(Todolistbuilder)