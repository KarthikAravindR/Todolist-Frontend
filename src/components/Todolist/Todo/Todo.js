import React from 'react'

import './Todo.css' 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {  } from '@fortawesome/free-regular-svg-icons';
import { faTrashAlt,faThumbtack,faEdit,faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import { } from '@fortawesome/free-brands-svg-icons'


const todo = (props) => {
    return(
        <div className="todo" style={props.completed ? {backgroundColor:"rgba(0,255,0,0.2)"}: {backgroundColor:"rgba(255,0,0,0.2)"}}>
            <div className="taskicon"><FontAwesomeIcon icon={faThumbtack} style={{fontSize:"1.2rem"}}/></div>
            <div className="eachtask">
                <p style={{fontSize:"2rem"}}>{props.title}</p>
                <p style={{color:"rgba(0,0,0,0.5",marginBottom:"12px"}}>{props.description}</p>  
            </div>
            <div className="completion">&#9679; {props.completed ? "Completed" : "In Progress"}</div>
            {!props.completed ?<div className="edit" onClick={() => props.editclicked(props.id)}><FontAwesomeIcon icon={faEdit}/></div>: null }
            <div className="delete" style={!props.completed ? {margin:"0 8px"}: {margin:"0 8px 0 auto"}} onClick={() => props.deleteclicked(props.id)}><FontAwesomeIcon icon={faTrashAlt}/></div>
            {!props.completed ? <div className="completed" onClick={() => props.completedclicked(props.id)}><FontAwesomeIcon icon={faCheckCircle}/></div>: null}
        </div>
    )
}

export default todo