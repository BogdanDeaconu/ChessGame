import React, { useState, useEffect } from 'react';
import './ChessBoard.css';
import Tile from '../Piece/Piece';

const rows = ["1", "2", "3", "4", "5", "6", "7", "8"];
const cols = ["a", "b", "c", "d", "e", "f", "g", "h"];

// Clasa Type pentru tipul pieselor
const Type = {
  Pawn: 'Pawn',
  Rook: 'Rook',
  Knight: 'Knight',
  Bishop: 'Bishop',
  Queen: 'Queen',
  King: 'King'
};

// Clasa Color pentru culoarea pieselor
const Color = {
  White: 'White',
  Black: 'Black'
};


class Piece {
  constructor(id, color, type, imgURL, column, row) {
    this.id = id;
    this.color = color;
    this.type = type;
    this.imgURL = imgURL;
    this.column = column;
    this.row = row;
  }
}

let Pieces = [];

// Generare piese, o parte mai urata din cod :))
for (let i = 0; i < 8; i++) {
  Pieces.push(new Piece(Pieces.length + 1, Color.White, Type.Pawn, "assets/images/Chess_plt45.svg.png", i, 1));
  Pieces.push(new Piece(Pieces.length + 1, Color.Black, Type.Pawn, "assets/images/Chess_pdt45.svg.png", i, 6));
}

Pieces.push(new Piece(Pieces.length+1,Color.White, Type.Rook, "assets/images/Chess_rlt45.svg.png", 0, 0));
Pieces.push(new Piece(Pieces.length+1,Color.White, Type.Rook, "assets/images/Chess_rlt45.svg.png", 7, 0));

Pieces.push(new Piece(Pieces.length+1,Color.White, Type.Knight, "assets/images/Chess_nlt45.svg.png", 6, 0));
Pieces.push(new Piece(Pieces.length+1,Color.White, Type.Knight, "assets/images/Chess_nlt45.svg.png", 1, 0));

Pieces.push(new Piece(Pieces.length+1,Color.White, Type.Bishop, "assets/images/Chess_blt45.svg.png", 2, 0));
Pieces.push(new Piece(Pieces.length+1,Color.White, Type.Bishop, "assets/images/Chess_blt45.svg.png", 5, 0));

Pieces.push(new Piece(Pieces.length+1,Color.White, Type.Queen, "assets/images/Chess_qlt45.svg.png", 3, 0));
Pieces.push(new Piece(Pieces.length+1,Color.White, Type.King, "assets/images/Chess_klt45.svg.png", 4, 0));


Pieces.push(new Piece(Pieces.length+1,Color.Black, Type.Rook, "assets/images/Chess_rdt45.svg.png", 7, 7));
Pieces.push(new Piece(Pieces.length+1,Color.Black, Type.Rook, "assets/images/Chess_rdt45.svg.png", 0, 7));

Pieces.push(new Piece(Pieces.length+1,Color.Black, Type.Knight, "assets/images/Chess_ndt45.svg.png", 6, 7));
Pieces.push(new Piece(Pieces.length+1,Color.Black, Type.Knight, "assets/images/Chess_ndt45.svg.png", 1, 7));

Pieces.push(new Piece(Pieces.length+1,Color.Black, Type.Bishop, "assets/images/Chess_bdt45.svg.png", 2, 7));
Pieces.push(new Piece(Pieces.length+1,Color.Black, Type.Bishop, "assets/images/Chess_bdt45.svg.png", 5, 7));

Pieces.push(new Piece(Pieces.length+1,Color.Black, Type.Queen, "assets/images/Chess_qdt45.svg.png", 4, 7));
Pieces.push(new Piece(Pieces.length+1,Color.Black, Type.King, "assets/images/Chess_kdt45.svg.png", 3, 7));


const ChessBoard = () => {
  const [board, setBoard] = useState([]);

  
  useEffect(() => {
    setBoard(buildBoard());
  }, []);

  // Construirea tablei de șah și așezarea pieselor
  const buildBoard = () => {
    const updatedBoard = [];
    

    for (let row = rows.length - 1; row >= 0; row--) {
      for (let col = 0; col < cols.length; col++) {
        const squareColor = (row + col) % 2 === 0 ? 'black' : 'white';
        const piece = Pieces.find(p => p.column === col && p.row === row);
        const imgURL = piece ? piece.imgURL : null;

        

        const squareElement = ((squareId) => (
          <div
            key={`square_${squareId}`}
            id={`square_${squareId}`}
            className={squareColor}
            draggable='true'
            onDragStart={event => handleDragStart(event, piece)}
            onDragOver={handleDragOver}
            onDrop={event => handleDrop(event, squareId)}
          >
            <Tile imgURL={imgURL} />
          </div>
        ))(row * cols.length + col);
        updatedBoard.push(squareElement);
      }
    }

    return updatedBoard;
  };

  // Handlers pentru drag and drop
  const handleDragStart = (event, piece) => {
    event.dataTransfer.setData('text/plain', JSON.stringify(piece));
  };

  const handleDragOver = event => {
    event.preventDefault();
    
  };

  const handleDrop = (event, targetSquareId) => {
  event.preventDefault();
  const draggedPiece = JSON.parse(event.dataTransfer.getData('text/plain'));
  const targetColumn = parseInt(targetSquareId%8);
  const targetRow = parseInt(targetSquareId/8);
  const updatedPieces = Pieces.map(p => {
    if (p.id === draggedPiece.id) {
      return { ...p, column: targetColumn, row: targetRow };
    }
    return p;
  });
  Pieces = updatedPieces;
  setBoard(buildBoard());
  };

  
  return (
    <div id="chessboard">
      {board}
    </div>
  );
};

export default ChessBoard;
