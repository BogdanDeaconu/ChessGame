import React from "react";

import "./Tile.css";
  
  
  
  //asezare piese pe tabla
  export default function Tile({imgURL}) {
    if (imgURL === null) {
      return <div style={{backgroundImage: 'none'}}></div>;
    } else {

          return (
              <div  id="piece" style={{ backgroundImage: `url(${imgURL})`} }> </div>
          );
        }
      }
