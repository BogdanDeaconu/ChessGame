import React from "react";

import "./Piece.css";
  

const Piece = ({ imgURL }) => {
    if (imgURL === null) {
           return <div></div>; 
         } else {
           return <img id="piece" src={imgURL} draggable="true" alt="Piece" />;
         }
};

export default Piece;