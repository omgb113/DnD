import React from 'react';
import Board from './components/Board';
import Mesa from './components/Mesa';
import PicollaTemplate from './image/PicollaTemplate1920-full.jpg';


function App() {

  return (
    <div style={{  backgroundImage: `url(${PicollaTemplate})` }} className= "App" >

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


        {/* <Mesa id="mesa_8" className="mesa" draggable = "true">
          <p>Mesa 8</p>
        </Mesa> */}

        </Board>



        <Board id="board-2" className="board">

        <Mesa id="mesa_5" className="mesa" draggable = "true">
          <p>Mesa 5</p>
        </Mesa>
        <Mesa id="mesa_6" className="mesa" draggable = "true">
          <p>Mesa 6</p>
        </Mesa>
        <Mesa id="mesa_7" className="mesa" draggable = "true">
          <p>Mesa 7</p>
        </Mesa>
        <Mesa id="mesa_22" className="mesa" draggable = "true">
          <p>Mesa 22</p>
        </Mesa>

        </Board>

        <Board id="board-3" className="board">

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
        {/* <Mesa id="mesa_16" className="mesa" draggable = "true">
          <p>Mesa 16</p>
        </Mesa> */}

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

        {/* <Mesa id="mesa_23" className="mesa" draggable = "true">
          <p>Mesa 23</p>
        </Mesa> */}

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

          


        </Board>

      </main>

    </div>
  );
}

export default App;


