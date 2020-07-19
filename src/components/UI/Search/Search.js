import React from 'react' 
import './Search.css'


const Search = (props) => {
    return (
        <form className="form1" onSubmit={props.clicked}>
            <input className="searchbar1" type="search" placeholder="Search Your Tasks" onChange={props.Changed}/>
            {/* <button className="button2" type="submit">Search</button> */}
        </form>
    )
}

export default Search