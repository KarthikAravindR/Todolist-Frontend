import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTheaterMasks, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { } from '@fortawesome/free-brands-svg-icons'
import './Toolbar.css'

const toolbar = (props) => {
    return (
        <header className="headertodo">
            <div className="toolbarTitle"><FontAwesomeIcon style={{ fontSize: "1.5rem" }} icon={faTheaterMasks} /> Do To Do</div>
            {/* <div className="">
                <FontAwesomeIcon style={{fontSize: "2rem"}} icon={faUserCircle}/>
            </div> */}
            <div className="btn-group">
                <FontAwesomeIcon style={{fontSize: "3.5rem"}} icon={faUserCircle} type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>
                <div className="dropdown-menu">
                    <a className="dropdown-item" href="/">My Tasks To Do</a>
                    <a className="dropdown-item" href="/">Another action</a>
                    <a className="dropdown-item" href="/">Something else here</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="/">Log Out</a>
                </div>
            </div>
        </header>
    )
}

export default toolbar