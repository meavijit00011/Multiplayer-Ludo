import React from 'react'
import Timer from './Timer'
import Dice from './Dice'
import Modal from './Modal'
import Board from './Board'
import Back from './Back'
import classes from './Game.module.css'
const Game = () => {
    return (
        <div className={classes.game_container}>
            <Timer></Timer>
            <Back></Back>
            <Board></Board>
            <Dice></Dice>
            <Modal></Modal>
        </div>
    )
}

export default Game