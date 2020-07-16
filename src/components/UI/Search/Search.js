import React from 'react' 
import './Search.css'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { library } from '@fortawesome/fontawesome-svg-core';

// import your icons
// import { faMoneyBill } from '@fortawesome/pro-solid-svg-icons';
// import {  } from '@fortawesome/free-regular-svg-icons';
// import { faSearchLocation as fasearch } from '@fortawesome/free-solid-svg-icons';

// library.add(
//     fasearch
    // <FontAwesomeIcon icon={fasearch} style={{fontSize:"1rem"}}/>
// );

const search = (props) => {
    return (
        <form className="form1" onSubmit={props.clicked}>
            <input className="searchbar1" type="search" placeholder="Search Your Tasks" onKeyDown={props.backspace} onChange={props.Changed}/>
            {/* <button className="button2" type="submit">Search</button> */}
        </form>
    )
}

export default search