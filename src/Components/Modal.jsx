import React, { useContext } from 'react'
import classes from './Modal.module.css';
import { IoHome } from "react-icons/io5";
import { FaPlay } from "react-icons/fa6";
import gif from '../celebrate.gif'
import { AppContext } from '../Context/AppContext';
import { GameContext } from '../Context/GameContext';
const Modal = ({ showBack,setShowModal }) => {
    const appContext = useContext(AppContext);
    const { playerFinished, time, resetGame, gameFinished } = useContext(GameContext);

    if (!gameFinished && !showBack) {
        return;
    }

    const handleCancelGame = ()=>{
        appContext.setIsGameActive(false);
    }

    const cancelBack = ()=>{
        setShowModal(false);
    }
    return (
        <div className={classes.modal_container}>
            <div className={classes.content}>
                {showBack && <div className={classes.quit}>
                    <h3>Do you want to quit ??</h3>
                    <div className={classes.quit_btns_container}>
                        <button onClick={handleCancelGame}>Yes</button>
                        <button onClick={cancelBack}>Cancel</button>
                    </div>

                </div>}
                {gameFinished && <>
                    <div className={classes.gif_container}><img src={gif}></img></div>
                    <h3>Game Finished</h3>
                    <div><span>Time Taken - </span><span>{`${time.min} : ${time.sec}`}</span></div>
                    <div><span>Winner - </span><span>{playerFinished.indexOf(1) + 1}</span></div>
                    <div><span>Second Position - </span><span>{playerFinished.indexOf(2) + 1}</span></div>
                    <div><span>Third Position - </span><span>{playerFinished.indexOf(3) + 1}</span></div>
                    <div><span>Looser - </span><span>{playerFinished.indexOf(0) + 1}</span></div>
                    <div className={classes.actions}>
                        <div onClick={appContext.setIsGameActive.bind(null, false)}><IoHome size={25} color='red'></IoHome></div>
                        <div onClick={resetGame}><FaPlay size={25} color='blue'></FaPlay></div>
                    </div>
                </>}
            </div>

        </div>
    )
}

export default Modal