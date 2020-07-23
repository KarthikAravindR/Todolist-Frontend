import React, { } from 'react';
import { connect } from 'react-redux'

import * as actions from '../../../store/actions/index'
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'
import './Modal.css'
import Backdrop from '../Backdrop/Backdrop'

const Modal = (props) =>  {
        const submitHandler = event => {
            event.preventDefault()
            props.addTask({title: props.title, description: props.description, completed: false, userId: props.userId})
            props.onSetTitle('')
            props.onSetDescription('')
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
                            <input type="text" rows="2"  value={props.title} onChange={event => {props.onSetTitle(event.target.value)}}/>
                        </div>
                        <label>Description</label> 
                        <div className="inputelement">
                            <textarea rows="5"  value={props.description} onChange={event => {props.onSetDescription(event.target.value)}}/>
                        </div>
                        <div className="addtask1">
                            {props.isloading && <LoadingIndicator />}
                            <button type="submit" className="task1">ADD TASK</button>
                        </div>
                    </form>
                </div>
            </div >
        );
}
const mapStateToProps = state => {
    return{
        title: state.modal.title,
        description: state.modal.description,
        userId: state.auth.userid
    }
}
const mapDispatchToState = dispatch => {
    return{
        onSetTitle: (title) => {dispatch(actions.setTitle(title))},
        onSetDescription: (description) => {dispatch(actions.setDescription(description))},
    }
}
export default connect(mapStateToProps,mapDispatchToState)(Modal)
