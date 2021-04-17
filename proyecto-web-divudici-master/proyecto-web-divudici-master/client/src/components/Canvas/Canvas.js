
import React, { useState, useEffect } from 'react';

import Board from './board/Board';
import Mesa from './board/Mesa';
import PicollaTemplate from './image/PicollaTemplate1110.jpg';
import maincss from'./css/main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair, faUtensils } from '@fortawesome/free-solid-svg-icons'


import { useDispatch, useSelector} from 'react-redux';
import CanvasData from '../CanvasData/CanvasData';
import CanvasForm from '../CanvasForm/CanvasForm';

import { getConsecutivos } from '../../actions/consecutivos';
import { getClientes } from '../../actions/clientes';
import { getRestaurantes } from '../../actions/restaurantes';
import { Link } from 'react-router-dom';

import { Button, Row, Col, FormControl, Form, InputGroup} from 'react-bootstrap';



const Canvas =()=> {

  return (
    <div style={{  backgroundImage: `url(${PicollaTemplate})` }} className= "Canvas" >

        <div>
        
        {/* botones */}

        <div style={{ float: 'left', }} className="divl"> 
        <button ></button>
        <FontAwesomeIcon icon={faChair} size="2x"></FontAwesomeIcon>
        </div> 
        
      <main className="flexbox">


        <Board id="board-1" className="board">

        <Mesa id="mesa_1" className="mesa" draggable = "true">
          <p>Mesa 1</p>
        </Mesa>
        <Mesa id="mesa_2" className="mesa" draggable = "true">
          <p>Mesa 2</p>
        </Mesa>
        <Mesa id="mesa_3" className="mesa" draggable = "true">
          <p>Mesa 3</p>
        </Mesa>

        </Board>

        



        <Board id="board-2" className="board">

        <Mesa id="mesa_5" className="mesa" draggable = "true">
          <p>Mesa 5</p>
        </Mesa>
        {/* <Mesa id="mesa_6" className="mesa" draggable = "true">
          <p>Mesa 6</p>
        </Mesa>
        <Mesa id="mesa_7" className="mesa" draggable = "true">
          <p>Mesa 7</p>
        </Mesa>
        <Mesa id="mesa_22" className="mesa" draggable = "true">
          <p>Mesa 22</p>
        </Mesa> */}

        </Board>

        {/* <Board id="board-3" className="board">

        <Mesa id="mesa_9" className="mesa" draggable = "true">
          <p>Mesa 9</p>
        </Mesa>
        <Mesa id="mesa_10" className="mesa" draggable = "true">
          <p>Mesa 10</p>
        </Mesa>
        <Mesa id="mesa_11" className="mesa" draggable = "true">
          <p>Mesa 11</p>
        </Mesa>

        <Mesa id="mesa_14" className="mesa" draggable = "true">
          <p>Mesa 14</p>
        </Mesa>
        <Mesa id="mesa_15" className="mesa" draggable = "true">
          <p>Mesa 15</p>
        </Mesa>

        </Board>



        <Board id="board-3" className="board">

        <Mesa id="mesa_17" className="mesa" draggable = "true">
          <p>Mesa 17</p>
        </Mesa>
        <Mesa id="mesa_18" className="mesa" draggable = "true">
          <p>Mesa 18</p>
        </Mesa>
        <Mesa id="mesa_19" className="mesa" draggable = "true">
          <p>Mesa 19</p>
        </Mesa>
        <Mesa id="mesa_20" className="mesa" draggable = "true">
          <p>Mesa 20</p>
        </Mesa>
        <Mesa id="mesa_21" className="mesa" draggable = "true">
          <p>Mesa 21</p>
        </Mesa>


        </Board>
          <Board id="board-4" className="board">

          <Mesa id="mesa_4" className="mesa" draggable = "true">
          <p>Mesa 4</p>
        </Mesa>

        <Mesa id="mesa_12" className="mesa" draggable = "true">
        <p>Mesa 12</p>
        </Mesa>
        <Mesa id="mesa_13" className="mesa" draggable = "true">
        <p>Mesa 13</p>
        </Mesa>

          


        </Board> */}

      </main>

      </div>

    </div>
  );
}

export default Canvas;


