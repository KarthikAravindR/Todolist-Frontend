import React from 'react';
import { connect } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt} from '@fortawesome/free-solid-svg-icons';

import './Toast.css'

const Toast = (props) =>  {
        return (
            <div>
                <div className="Toast" style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                    <div className="delete1" style={!props.completed ? {margin:"0 8px"}: {margin:"0 8px 0 auto"}}><FontAwesomeIcon icon={faTrashAlt}/></div>
                    <div>Successfully Deleted</div>
                </div>
            </div >
        );
}
const mapStateToProps = state => {
    return{
        show: state.task.successfullydeleted
    }
}

export default connect(mapStateToProps)(Toast)
