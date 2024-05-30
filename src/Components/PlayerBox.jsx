import React, { useContext } from 'react'
import classes from './PlayerBox.module.css';
import Piece from './Piece';
import { GameContext } from '../Context/GameContext';



const PlayerBox = ({ color, id }) => {
  const { currPosition, activePlayer } = useContext(GameContext);
  let style = { backgroundColor: '', height: '30px', width: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }
  style.backgroundColor = color;

  return (
    <div className={`${classes.player_box_container} ${id == activePlayer ? classes.shadow : null}`} style={{ backgroundColor: color, animation: 'animate 3s infinite', }}>
      <div className={classes.piece_container}>
        <div className={classes.row_1}>
          <div className={classes.piece_background}>{currPosition[id][0] == 0 && <Piece playerId={id} pieceId={0} style={style}></Piece>}</div>
          <div className={classes.piece_background}>{currPosition[id][1] == 0 && <Piece playerId={id} pieceId={1} style={style}></Piece>}</div>

        </div>
        <div className={classes.row_2}>
          <div className={classes.piece_background}>
            {currPosition[id][2] == 0 && <Piece playerId={id} pieceId={2} style={style}></Piece>}
          </div>
          <div className={classes.piece_background}>
            {currPosition[id][3] == 0 && <Piece playerId={id} pieceId={3} style={style}></Piece>}
          </div>
        </div>
      </div>
      <span>Player {id + 1}</span>
    </div>
  )
}

export default PlayerBox