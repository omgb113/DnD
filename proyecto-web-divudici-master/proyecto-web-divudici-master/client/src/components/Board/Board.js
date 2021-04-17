import React from 'react'
import './Board.css';

function Board ({children, id}) {
    return (
        <div className="board" id={id}>
            {children}
        </div>
    )
}

export default Board;
