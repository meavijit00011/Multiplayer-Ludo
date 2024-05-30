import React, { useContext, useEffect, useState } from 'react';
import classes from './MovementsBox.module.css'
import { GameContext } from '../Context/GameContext';
import Piece from './Piece';
import { cellId, playerColor, safeZone, safeZoneColor, safeZoneStartAfter, starCell, startCell } from '../utils/Pattern';
import { IoMdStarOutline } from "react-icons/io";
import { MdSubdirectoryArrowLeft } from "react-icons/md";
import { useMediaQuery } from 'react-responsive';
let arr = new Array(18);
arr.fill(1)
const MovementsBox = ({ row }) => {
  const isMobile = useMediaQuery({ query: `(max-width: 400px)` });
  const { currPosition } = useContext(GameContext);

  let style = {}
  if (row == 2 | row == -2) {
    style = { width: '100%', gridTemplateRows: 'repeat(3,1fr)', gridTemplateColumns: 'repeat(6,1fr' }
  }
  let text = 'a'
  if (row == 1) {
    text = 'c'
  }
  else if (row == 2) {
    text = 'b';
  }
  else if (row == -2) {
    text = 'd';
  }
  else if (row == 3) {
    text = 'a'
  }

  let cell = {
  }
  // for each cell how many pieces exist.
  for (let i = 0; i < currPosition.length; i++) {
    for (let j = 0; j < currPosition.length; j++) {
      if (currPosition[i][j] != 0) {
        let pos = currPosition[i][j];
        if (cell[pos]) {
          cell[pos] = [...cell[pos], [i, j]]
        }
        else {
          cell[pos] = [[i, j]]
        }
      }
    }
  }
  // for each cell how many pieces,star,entrytosafezone sign needed to be rendered.

  const render = (id) => {
    let piecesArr = [];
    let style = { border: 'none', height: '16px', width: '16px' };
    if (id == 'b6') {
      style.rotate = '-180deg';
    }
    else if (id == 'c1') {
      style.rotate = '-90deg'
    }
    else if (id == 'd11') {
      style.rotate = '360deg'
    }
    else {
      style.rotate = '90deg'
    }
    if (cell[id]) {
      piecesArr = cell[id];
    }
    return <div className={classes.cell_content_container}>

      {(safeZoneStartAfter['p0'] == id || safeZoneStartAfter['p1'] == id || safeZoneStartAfter['p2'] == id || safeZoneStartAfter['p3'] == id) && <div style={style} className={classes.arrow_container}><MdSubdirectoryArrowLeft size={20} /></div>}

      {starCell.map(cell => {
        if (cell == id && Object.values(startCell).indexOf(id) == -1) {
          return <div key={Math.random()} className={classes.star_container}><IoMdStarOutline size={30}></IoMdStarOutline></div>
        }
      })}

      {piecesArr.map((p, ind) => {
        let style = { backgroundColor: playerColor[`p${p[0]}`], height: '15px', width: '15px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' };
        if (isMobile) {
          style.height = '10px';
          style.width = '10px'
        }
        return <Piece key={ind} style={style} pieceId={p[1]} playerId={p[0]} ></Piece>
      })}
    </div>

  }

  const cellColor = (id) => {
    let cellBackgroundColor = {
      backgroundColor: safeZoneColor[id]
    }
    Object.keys(startCell).forEach(cell => {
      if (startCell[cell] == id) {
        cellBackgroundColor.backgroundColor = playerColor[cell]
      }
    });
    return cellBackgroundColor;
  }

  return (
    <div className={classes.movements_box_container} style={style}>
      {arr.map((val, ind) => <div className={classes.cell} style={cellColor(`${text}${ind}`)} key={`${text}${ind}`} id={`${text}${ind}`}>{render(`${text}${ind}`)}</div>)}
    </div>
  )
}

export default MovementsBox