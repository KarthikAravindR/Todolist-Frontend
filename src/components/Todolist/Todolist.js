import React from 'react' 

import Todo from './Todo/Todo'
import './Todolist.css'

const todolist = (props) => {
    console.log(props.alltask)
    return (
        <div className="todolist">
            {props.alltask.map((task) => {
                    return <Todo 
                                key={task.id}
                                id={task.id}
                                title={task.title} 
                                description={task.description}
                                completed={task.completed}
                                editclicked={(id) => props.editclicked(id)}
                                deleteclicked={(id) => props.deleteclicked(id)}
                                completedclicked={(id) => props.completedclicked(id)} />
                })}
        </div>
    )
}

export default todolist