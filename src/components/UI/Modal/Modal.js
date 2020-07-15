import React, { Component } from 'react';

import './Modal.css'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {

    shouldComponentUpdate (nextProps,nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }
    render() {
        console.log(this.props.editid)
        console.log(this.props.alltask)
        return (
            <div>
                <Backdrop show={this.props.show} clicked={this.props.modalclosed} />
                {this.props.edit 
                ? <div className="Modal" style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                    <form>
                        <label>Title</label> 
                        <div className="inputelement">
                            <input type="text" rows="2" onChange={this.props.edittitlechanged} defaultValue={this.props.edittitle}/>
                        </div>
                        <label>Description</label> 
                        <div className="inputelement">
                            <textarea rows="5" onChange={this.props.editdeschanged} defaultValue={this.props.editdescription}/>
                        </div>
                        <button onClick={this.props.doneclicked} className="task">Done</button>
                    </form>
            </div>
                : <div className="Modal" style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                    <form>
                        <label>Title</label> 
                        <div className="inputelement">
                            <input type="text" rows="2" onChange={this.props.titlechanged}/>
                        </div>
                        <label>Description</label> 
                        <div className="inputelement">
                            <textarea rows="5" onChange={this.props.deschanged}/>
                        </div>
                        <button onClick={this.props.clicked} className="task">Add Task</button>
                    </form>
            </div> }
            </div >
        );
    }
}

export default Modal