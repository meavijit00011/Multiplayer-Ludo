import React, { useContext, useState } from 'react'
import { GameContext } from '../Context/GameContext';
import sound from '../sound.mp3'
import './dice.css';
let diceValArr = [null, 1, 5, 6, 3, 4, 2];
const Dice = () => {
    const audio = new Audio(sound)
    const {  changeDiceNumber, setAllowedToRoll, allowedToRoll } = useContext(GameContext);
    
    let classList = 'dice dice-one';
    const [randomNum,setRandomNum] = useState(null)
    const handleDiceClick = () => {
        audio.play()
        setAllowedToRoll(false)
         let num = Math.floor((Math.random() * 1) + 1);
        changeDiceNumber(num);
        setRandomNum(num)
    }

    classList = `dice dice-one show-${diceValArr.indexOf(randomNum)}`;


    return (
        <div className='dice-container'><button onClick={handleDiceClick} disabled={!allowedToRoll} className='roll-dice-btn'>Roll - </button>
            <div className="game">
                <div className="container">
                    <div id='dice1' className={classList}>
                        <div id="dice-one-side-one" className='side one'>
                            <div className="dot one-1"></div>
                        </div>
                        <div id="dice-one-side-two" className='side two'>
                            <div className="dot two-1"></div>
                            <div className="dot two-2"></div>
                        </div>
                        <div id="dice-one-side-three" className='side three'>
                            <div className="dot three-1"></div>
                            <div className="dot three-2"></div>
                            <div className="dot three-3"></div>
                        </div>
                        <div id="dice-one-side-four" className='side four'>
                            <div className="dot four-1"></div>
                            <div className="dot four-2"></div>
                            <div className="dot four-3"></div>
                            <div className="dot four-4"></div>
                        </div>
                        <div id="dice-one-side-five" className='side five'>
                            <div className="dot five-1"></div>
                            <div className="dot five-2"></div>
                            <div className="dot five-3"></div>
                            <div className="dot five-4"></div>
                            <div className="dot five-5"></div>
                        </div>
                        <div id="dice-one-side-six" className='side six'>
                            <div className="dot six-1"></div>
                            <div className="dot six-2"></div>
                            <div className="dot six-3"></div>
                            <div className="dot six-4"></div>
                            <div className="dot six-5"></div>
                            <div className="dot six-6"></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}


export default Dice