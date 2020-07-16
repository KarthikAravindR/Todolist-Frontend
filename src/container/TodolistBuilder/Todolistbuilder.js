import React, { Component } from 'react'

import Paginationpage from '../../components/UI/Pagination/Pagination'
import Toolbar from '../../components/Toolbar/Toolbar'
import Search from '../../components/UI/Search/Search'
import searchfilter from '../../components/UI/Search/Searchfilter'
import Modal from '../../components/UI/Modal/Modal'
import Todolist from '../../components/Todolist/Todolist'
import './Todolistbuilder.css'

class Todolistbuilder extends Component {
    state = {
        searchtask: null,
        addingtask: false,
        title: null,
        description: null,
        edittitle: null,
        editdescription: null,
        task: [],
        duplicatetask: [],
        editid: null,
        edit: false,
    }
    modalShowHandler = () => {
        this.setState({ addingtask: true })
    }
    modalclosehandler = () => {
        this.setState({ addingtask: false })
    }
    searchtaskHandler = (event) => {
        if (event.target.value === "") {
            this.setState({ task: this.state.duplicatetask })
        } else {
            this.setState({ task: searchfilter(event.target.value, this.state.task) })
        }
    }
    backspaceHandler = (event) => {
        if(event.key === 'Backspace'){
            this.setState({
                task:this.state.duplicatetask
            })
        }
    }
    titleChangeHandler = (event) => {
        this.setState({ title: event.target.value })
    }
    editTitleHandler = (event) => {
        this.setState({ edittitle: event.target.value })
    }
    descriptionChangeHandler = (event) => {
        this.setState({ description: event.target.value })
    }
    editDescriptionHandler = (event) => {
        this.setState({ editdescription: event.target.value })
    }
    addTaskHandler = (event) => {
        event.preventDefault()
        let newtask = {
            title: this.state.title,
            description: this.state.description,
            completed: false
        }
        const updatedtask = this.state.task.slice()
        updatedtask.push(newtask)
        updatedtask.forEach((val, i, self) => {
            self[i].id = i
        })
        this.setState({
            task: updatedtask,
            duplicatetask: updatedtask,
            addingtask: false
        })
    }
    editClickedHandler = (id) => {
        const updatedtask = this.state.task.slice()
        const edittitle = updatedtask[id].title
        const editdescription = updatedtask[id].description
        this.setState({
            editid: id,
            edit: true,
            edittitle: edittitle,
            editdescription: editdescription,
            addingtask: true,
        })
    }
    deleteClickedHandler = (id) => {
        let newTask = this.state.task.slice();
        newTask.splice(id, 1);
        this.setState({
            editid: null,
            edit: false,
            edittitle: null,
            editdescription: null,
            task: newTask,
            duplicatetask: newTask
        },() => this.idChangeHandler())
    }
    idChangeHandler = () => {
        let newTask = this.state.task.slice();
        newTask.forEach((val, i, self) => {
            self[i].id = i
        })
        console.log(newTask)
        this.setState({
            task: newTask,
        })
    }
    completedClickedHandler = (id) => {
        let newTask = this.state.task.slice();
        newTask[id].completed = true
        this.setState({
            task: newTask,
            duplicatetask: newTask,
        })
    }
    updateEditedHandler = (event) => {
        event.preventDefault()
        let id = this.state.editid
        const updatedtask = this.state.task.slice()
        updatedtask[id].title = this.state.edittitle
        updatedtask[id].description = this.state.editdescription
        this.setState({
            task: updatedtask,
            duplicatetask: updatedtask,
            addingtask: false
        })
    }
    render() {
        return (
            <div>
                <Toolbar />
                <div className="controls">
                    <button className="addtask" onClick={this.modalShowHandler}>+ New Task</button>
                    <Search Changed={this.searchtaskHandler} backspace={this.backspaceHandler}/>
                </div>
                {this.state.addingtask ? <Modal
                    show={this.state.addingtask}
                    editid={this.state.editid}
                    edit={this.state.edit}
                    edittitle={this.state.edittitle}
                    editdescription={this.state.editdescription}
                    clicked={this.addTaskHandler}
                    doneclicked={this.updateEditedHandler}
                    titlechanged={this.titleChangeHandler}
                    edittitlechanged={this.editTitleHandler}
                    deschanged={this.descriptionChangeHandler}
                    editdeschanged={this.editDescriptionHandler}
                    modalclosed={this.modalclosehandler} /> : null}
                {!this.state.duplicatetask[0] ? <div className="empty">Your Task to Do List is Empty.</div> : null}
                <Todolist
                    alltask={this.state.task}
                    editclicked={this.editClickedHandler}
                    deleteclicked={this.deleteClickedHandler}
                    completedclicked={this.completedClickedHandler} />
                <div className="pagination1"> 
                    <Paginationpage task={this.state.duplicatetask}/>
                </div>
            </div>
        )
    }
}

export default Todolistbuilder