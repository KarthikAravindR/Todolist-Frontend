import React, { useState, useEffect } from 'react';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'
import './EditModal.css'
import Backdrop from '../Backdrop/Backdrop'

const Modal = (props) => {
    const [editTitle, setEditTitle] = useState('')
    const [editDescription, setEditDescription] = useState('')
    useEffect(() => {
        setEditTitle(props.taskToBeEdited.title)
        setEditDescription(props.taskToBeEdited.description)
    },[props.taskToBeEdited.title,props.taskToBeEdited.description])
    const editSubmitHandler = event => {
        event.preventDefault()
        const updatedTask = {
            ...props.taskToBeEdited,
            title: editTitle,
            description: editDescription
        }
        props.editTask(updatedTask)
    }
    return (
        <div>
            <Backdrop show={props.show} clicked={props.modalclosed} />
            <div className="Modal" style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
                <form onSubmit={editSubmitHandler}>
                    <label>Title</label>
                    <div className="inputelement">
                        <input type="text" rows="2" onChange={event => { setEditTitle(event.target.value) }} value={editTitle || undefined} />
                    </div>
                    <label>Description</label>
                    <div className="inputelement">
                        <textarea rows="5" onChange={event => { setEditDescription(event.target.value) }} value={editDescription || undefined} />
                    </div>
                    <div className="addtask1">
                            {props.isloading && <LoadingIndicator />}
                            <button type="submit" className="task">UPDATE</button>
                        </div>
                </form>
            </div>
        </div >
    );
}

export default Modal