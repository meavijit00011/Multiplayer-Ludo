import React, { useContext, useEffect, useState } from 'react'
import classes from './Centre.module.css';
import { GameContext } from '../Context/GameContext';
import Piece from './Piece';

import centreImg from '../centre.png';
import { useMediaQuery } from 'react-responsive';

const Centre = () => {
    const { currPosition, playerFinished } = useContext(GameContext);
    const [show, setShow] = useState(false);
    let style = { height: '20px', width: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid yellow' };
    const isMobile = useMediaQuery({ query: `(max-width: 400px)` });
    if (isMobile) {
        style.height = '7px';
        style.width = '7px';
        style.justifyContent = 'bottom'
    }
    const render = (playerId) => {
        let posArr = currPosition[playerId];
        return <>
            {posArr.map((pos, ind) => pos == 1 && <Piece key={ind} style={style} pieceId={ind} playerId={playerId}></Piece>)}
        </>
    }




    return (
        <div className={classes.centre_container}>
            <div className={classes.oblong}>
                <img src={centreImg}></img>
            </div>
            <div className={classes.pieces_finished_container}>
                <div className={classes.div1}>{render(2)}</div>
                <div className={classes.div2}>{render(0)}</div>
                <div className={classes.div3}>{render(1)}</div>
                <div className={classes.div4}>{render(3)}</div>
            </div>
        </div>
    )
}

export default Centre