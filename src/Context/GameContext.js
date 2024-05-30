import { act, createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { cellId, playerColor, starCell, startCell } from "../utils/Pattern";
import { checkIfPlayerPiecesCanMove } from "../utils/checkIfCanMove";
import sound from '../sound2.mp3';
import { AppContext } from "./AppContext";

const PIECES_CURR_POSTION = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]

const PIECES_THAT_CAN_MOVE = [
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false]
]

export const GameContext = createContext({
    activePlayer: 1
});


const initial = {
    min: '00',
    sec: '00'
}
const reducres = (state, action) => {
    switch (action.type) {
        case 'setPreviousTime':
            return { min: action.payload.min, sec: action.payload.sec }
        case 'reset':
            return initial;
        case 'ups':
            if (state.sec == '00') {
                return { ...state, sec: 1 }
            }
            else if (state.sec == 60) {
                return { ...state, sec: 1, min: state.min == '00' ? 1 : state.min + 1 }
            }
            return { ...state, sec: state.sec + 1 }

    }
}
let interval;
const ContextProvider = (props) => {
    const { addNewGame, isGameActive, previousGamePlayOrder, setPreviousGamePlayOrder } = useContext(AppContext)
    const audio = new Audio(sound)
    // curr active player.
    const [activePlayer, setActivePlayer] = useState(0);
    // player finished ....
    const [playerFinished, setPlayerFinished] = useState([0, 0, 0, 0]);
    // curr dice number.
    const [currDiceNum, setCurrentDiceNum] = useState(null);
    // curr piece postion.
    const [currPosition, setCurrPosition] = useState(PIECES_CURR_POSTION);
    // pieces that can move 
    const [piecesThatCanMove, setPiecesThatCanMove] = useState(PIECES_THAT_CAN_MOVE);
    const [allowedToRoll, setAllowedToRoll] = useState(true);
    const [gameFinished, setGameFinished] = useState(false);
    const [time, dispatch] = useReducer(reducres, initial);
    const [save, setSave] = useState([]);

    useMemo(() => {
        if (isGameActive && !gameFinished) {
            dispatch({ type: 'reset' })
            interval = setInterval(() => {
                dispatch({
                    type: 'ups'
                })
            }, 1000);
        }
    }, [isGameActive, gameFinished]);

    useEffect(() => {
        if (gameFinished && !previousGamePlayOrder) {
            clearInterval(interval);
            addNewGame(
                { time, winning: playerFinished, save })
        }
        else if (gameFinished && previousGamePlayOrder) {
            setPreviousGamePlayOrder(null);
        }
    }, [gameFinished]);

    useEffect(() => {
        if (previousGamePlayOrder) {
            setAllowedToRoll(false);
            clearInterval(interval);
            dispatch({ type: 'setPreviousTime', payload: { min: previousGamePlayOrder.time.min, sec: previousGamePlayOrder.time.sec } })
            let previousGamePlayPosArr = previousGamePlayOrder.save;
            for (var i = 0; i < previousGamePlayPosArr.length; i++) {
                let pre = JSON.parse(JSON.stringify(previousGamePlayPosArr[i]));
                setTimeout(() => {
                    setCurrPosition(pre);
                }, i * 1000)
            }
        }

    }, [previousGamePlayOrder])

    // change current player.
    const changeActivePlayer = () => {
        let player = activePlayer == 3 ? 0 : activePlayer + 1;
        let checked = [false, false, false, false];
        checked[activePlayer] = true;
        while (!checked[player]) {
            checked[player] = true;
            if (playerFinished[player]) {
                player = player == 3 ? 0 : player + 1;
            }
            else {
                setActivePlayer(player);
                break;
            }
        }
        setPiecesThatCanMove(PIECES_THAT_CAN_MOVE);
        !previousGamePlayOrder && setAllowedToRoll(true);
        setCurrentDiceNum(null);
    }
    // every time currPostion of Pieces change check if the player is finished the game.
    useEffect(() => {
        for (let i = 0; i < currPosition.length; i++) {
            if (!playerFinished[i] && currPosition[i][0] == 1 && currPosition[i][1] == 1 && currPosition[i][2] == 1 && currPosition[i][3] == 1) {
                setPlayerFinished(prev => {
                    prev[i] = Math.max(...prev) + 1;
                    return [...prev];
                });
                break;
            }
        }
        setSave(prev => {
            let temp1 = JSON.parse(JSON.stringify(save));
            let temp2 = JSON.parse(JSON.stringify(currPosition))
            return [...temp1, temp2]
        })
    }, [currPosition]);

    // if player has finished the game then change the player and check if the game is finished.
    useEffect(() => {
        // check if three players is finished.
        // if finished then game is finished.
        if (Math.max(...playerFinished) == 3) {
            setGameFinished(true);
        }
        // if game is not finished then change the active player.
        else if (playerFinished.indexOf(1) != -1) {
            changeActivePlayer();
            setCurrentDiceNum(null);
        }
    }, [playerFinished]);

    const resetGame = () => {
        setCurrPosition(PIECES_CURR_POSTION);
        setActivePlayer(0);
        setPlayerFinished([0, 0, 0, 0]);
        setCurrentDiceNum(null);
        setPiecesThatCanMove(PIECES_THAT_CAN_MOVE);
        setGameFinished(false);
        setSave([]);
        setAllowedToRoll(true);
    }

    const changePiecePosition = ({ playerId, pieceId }) => {
        if (playerId != activePlayer) {
            return;
        }

        let canMoveArr = checkIfPlayerPiecesCanMove(currPosition[playerId], currDiceNum, activePlayer);
        console.log('canMoveArr', canMoveArr)
        if (canMoveArr[pieceId]) {
            let hasCutAnotherPiece = false;
            let nextCellId = canMoveArr[pieceId];
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    let currPiecePosition = currPosition[i][j];
                    if (nextCellId != 1 && nextCellId == currPiecePosition && i != playerId && Object.values(starCell).indexOf(nextCellId) == -1) {
                        audio.play()
                        hasCutAnotherPiece = true;
                        let tempArr = JSON.parse(JSON.stringify(currPosition));
                        tempArr[i][j] = 0;
                        setCurrPosition(tempArr);
                    }
                }
            }

            if (currDiceNum == 6) {
                setCurrPosition(prev => {
                    let tempCurrPos = JSON.parse(JSON.stringify(prev));
                    tempCurrPos[activePlayer][pieceId] = canMoveArr[pieceId];
                    return tempCurrPos;
                });
                setPiecesThatCanMove(PIECES_THAT_CAN_MOVE);
                setAllowedToRoll(true);
            }
            else if (currDiceNum != null) {
                setCurrPosition(prev => {
                    let tempCurrPos = JSON.parse(JSON.stringify(prev));
                    tempCurrPos[playerId][pieceId] = canMoveArr[pieceId];
                    return tempCurrPos;
                });
                
                if (!hasCutAnotherPiece && nextCellId != 1) {
                    changeActivePlayer();
                }
                else {
                    setPiecesThatCanMove(PIECES_THAT_CAN_MOVE);
                    setAllowedToRoll(true);
                }
            }
            setCurrentDiceNum(null);
        }
    }
    // when dice number change we will check if curr player's any one piece can move that much 
    // if not then change the current player

    const changeDiceNumber = (num) => {
        setCurrentDiceNum(num);
        // 1.check if curr player can play this number.
        // 2.else change the player.
        // 3.if curr player can play then change the piecesThatCanMove in order to highlight pieces that can move.
        let playersPiecesPositionArr = currPosition[activePlayer];
        let canMoveArr = checkIfPlayerPiecesCanMove(playersPiecesPositionArr, num, activePlayer);
        // if all the pieces of current player cannot move then change the currPlayer.
        if (!canMoveArr[0] && !canMoveArr[1] && !canMoveArr[2] && !canMoveArr[3]) {
            changeActivePlayer();
        }
        else {
            setPiecesThatCanMove(() => {
                let temp = JSON.parse(JSON.stringify(piecesThatCanMove));
                let tempCanMoveArr = JSON.parse(JSON.stringify(canMoveArr));
                // let temp = [...piecesThatCanMove];
                temp[activePlayer] = tempCanMoveArr
                return temp;
            })
        }
    }
   
    return (
        <GameContext.Provider value={{ activePlayer, currDiceNum, changePiecePosition, currPosition, playerFinished, changeDiceNumber, piecesThatCanMove, setAllowedToRoll, allowedToRoll, time, gameFinished, resetGame }}>
            {props.children}
        </GameContext.Provider>
    )
}

export default ContextProvider;
