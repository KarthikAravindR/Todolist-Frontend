import React, { useState } from 'react';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'
import './Modal.css'
import Backdrop from '../Backdrop/Backdrop'

const Modal = (props) =>  {
        const [ title,setTitle ] = useState('')
        const [ description,setDescription ] = useState('')
        const submitHandler = event => {
            event.preventDefault()
            props.addTask({title: title, description: description, completed: false})
            setTitle('')
            setDescription('')
        }
        return (
            <div>
                <Backdrop show={props.show} clicked={props.modalclosed} />
                <div className="Modal" style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                    <form onSubmit={submitHandler}>
                        <label>Title</label> 
                        <div className="inputelement">
                            <input type="text" rows="2"  value={title} onChange={event => {setTitle(event.target.value)}}/>
                        </div>
                        <label>Description</label> 
                        <div className="inputelement">
                            <textarea rows="5"  value={description} onChange={event => {setDescription(event.target.value)}}/>
                        </div>
                        <div className="addtask1">
                            {props.isloading && <LoadingIndicator />}
                            <button type="submit" className="task">ADD TASK</button>
                        </div>
                    </form>
                </div>
            </div >
        );
}

export default Modal