import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTheaterMasks, faUserCircle } from '@fortawesome/free-solid-svg-icons';

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
                    <Link className="dropdown-item" to="/mytasks">My Tasks To Do</Link>
                    <div className="dropdown-divider"></div>
                    {!props.isAuthenticated ?
                    <Link className="dropdown-item" to="/">Authentication</Link>
                    :
                    <Link className="dropdown-item" to="/logout">Log Out</Link>}
                    </div>
            </div>
        </header>
    )
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
}

export default connect(mapStateToProps)(toolbar)
