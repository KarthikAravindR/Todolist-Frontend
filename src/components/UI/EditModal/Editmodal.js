import React, { useEffect } from 'react';
import { connect } from 'react-redux'

import * as actions from '../../../store/actions/index'
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'
import './EditModal.css'
import Backdrop from '../Backdrop/Backdrop'

const Modal = (props) => {
    console.log(props.show)
    const {onSetEditTitle} = props;
    const {onSetEditDescription} = props;
    useEffect(() => {
        onSetEditTitle(props.taskToBeEdited.title)
        onSetEditDescription(props.taskToBeEdited.description)
    },[props.taskToBeEdited.title,props.taskToBeEdited.description,onSetEditTitle,onSetEditDescription])
    const editSubmitHandler = event => {
        event.preventDefault()
        const updatedTask = {
            ...props.taskToBeEdited,
            title: props.edittitle,
            description: props.editdescription
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
                        <input type="text" rows="2" onChange={event => { props.onSetEditTitle(event.target.value) }} value={props.edittitle || undefined} />
                    </div>
                    <label>Description</label>
                    <div className="inputelement">
                        <textarea rows="5" onChange={event => { props.onSetEditDescription(event.target.value) }} value={props.editdescription || undefined} />
                    </div>
                    <div className="addtask1">
                            {props.isloading && <LoadingIndicator />}
                            <button type="submit" className="task2">UPDATE</button>
                        </div>
                </form>
            </div>
        </div >
    );
}

const mapStateToProps = state => {
    return{
        edittitle: state.modal.edittitle,
        editdescription: state.modal.editdescription
    }
}
const mapDispatchToState = dispatch => {
    return{
        onSetEditTitle: (title) => {dispatch(actions.setEditTitle(title))},
        onSetEditDescription: (description) => {dispatch(actions.setEditDescription(description))},
    }
}
export default connect(mapStateToProps,mapDispatchToState)(Modal)