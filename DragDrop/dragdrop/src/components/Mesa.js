import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair, faUtensils } from '@fortawesome/free-solid-svg-icons'



function Mesa(props) {


    const [count, setcount] = useState(0);

    

    const dragStart = e=>{


        
        const target = e.target;
        e.dataTransfer.setData('mesa_id', target.id);
        

        

    }


    
    // const handleClient =()=>{

        

    //     //Add cliente

    // }

    const dragOver = e=>{


        e.stopPropagation();

    }

    return (
        <button

        id={props.id}
        className={props.className}
        draggable={props.draggable}
        onDragStart={dragStart}
        onDragOver={dragOver}
        onDoubleClick = {()=>setcount(count + 1)}
        > <FontAwesomeIcon icon={faChair} size="2x"></FontAwesomeIcon>
        <FontAwesomeIcon icon={faUtensils} size="2x"></FontAwesomeIcon>
            <p>you clicked {count} </p>

            {props.children}


        </button>
    )
}






export default Mesa
