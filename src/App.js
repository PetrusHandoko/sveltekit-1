
import { useState } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';


const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};

function Profile() {
  return (
    <div>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
    </div>
  );
}

function MyButton(props) {

  function handleClick(){
    alert("Button {props.label} ");
  }
  var myclick = props.onClick;
  if ( myclick == null){
    myclick = handleClick;
  }

  return (
    <button onClick={myclick}>
      {props.label}
    </button>
  );
}

function AboutPage() {
  return (
    <div>
      <h1>About</h1>
      <p>Hello there.<br />How do you do?</p>
    </div>
  );
}

function Square({value, onSquareClick}){

  var boxvalue = (value==null)?" ":value;

  return (
    <>
      <button 
        onClick={onSquareClick} 
        className="square">
          {boxvalue}
      </button>
    </>
  )
}

export default function Board() {

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isPlayer1, setPlayer] = useState(true);
  const [winner, setWinner] = useState(null);
  
  function resetBoard(){
    setPlayer(true);
    setWinner(null);
    setSquares(Array(9).fill(null));
  }

  function handleClick(i) {
    if ( winner ) return;
    if ( squares[i]) return;
    const nextSquares = squares.slice();
    if ( isPlayer1)
      nextSquares[i] = "X";
    else
      nextSquares[i] = "O";
    
    setSquares(nextSquares);
    setPlayer(!isPlayer1);
    setWinner(calculateWinner(nextSquares));
  }

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (isPlayer1 ? "X" : "O");
  }


  return (
    <>
      <div>
        <span align="right">
          <Profile/>
        </span>
        <span align="left">
          <div className="board-row">
            <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
            <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
            <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
          </div>
          <div className="board-row">
            <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
            <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
            <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
          </div>
          <div className="board-row">
            <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
            <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
            <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
          </div>
        </span>
      </div>
      <br/>
      <div><MyButton onClick={resetBoard} label="Reset" /></div>
      <div> {status} </div>
    </>
  );
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}