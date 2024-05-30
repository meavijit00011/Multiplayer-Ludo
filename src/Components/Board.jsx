import React from 'react'
import classes from './Board.module.css'
import PlayerBox from './PlayerBox'
import MovementsBox from './MovementsBox'
import Centre from './Centre'
const Board = () => {
    return (
        <div className={classes.board_container}>
            <div className={classes.row_1}>
                <PlayerBox color={'red'} id={1}></PlayerBox>
                <MovementsBox row={1}></MovementsBox>
                <PlayerBox color={'green'} id={2}></PlayerBox>
            </div>
            <div className={classes.row_2}>
                <MovementsBox row={2}></MovementsBox>
                <Centre></Centre>
                <MovementsBox row={-2}></MovementsBox>
            </div>
            <div className={classes.row_3}>
                <PlayerBox color={'blue'} id={0}></PlayerBox>
                <MovementsBox row={3}></MovementsBox>
                <PlayerBox color={'#F1C40F'} id={3}></PlayerBox>
            </div>
        </div>
    )
}

export default Board