import React, { useContext } from 'react'
import { CiStar } from 'react-icons/ci'
import { GameContext } from '../Context/GameContext';
import classes from './Piece.module.css';
const Piece = ({ style, pieceId, playerId }) => {
  const context = useContext(GameContext);
  let canMoveArr = context.piecesThatCanMove[playerId];
  let classList = {};
  if (canMoveArr[pieceId]) {
    classList = classes.animate;
  }
  const handleClick = () => {
    context.changePiecePosition({ playerId, pieceId })
  }
  return (
    <div style={style} className={classList} onClick={handleClick}><CiStar color='white' /></div>
  )
}

export default Piece;

