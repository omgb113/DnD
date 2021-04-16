import React from 'react'

function Board(props) {
    
    const drop = e =>{

        e.preventDefault();
        const mesa_id = e.dataTransfer.getData('mesa_id');
        
        const mesa = document.getElementById(mesa_id);
        
        mesa.style.display = 'block';

        e.target.appendChild(mesa);

    }

    const dragOver = e =>{

        e.preventDefault();


    }
    
    
    
    return (
        <div 
        
        id={props.id}
        onDrop = {drop}
        onDragOver = {dragOver}
        className={props.className}
        >

        {props.children}    

        </div>
    )
}

export default Board
