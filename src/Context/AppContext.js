import { createContext, useContext, useState } from "react";

export const AppContext = createContext({})

const AppContextProvider = (props) => {
    const [isGameActive, setIsGameActive] = useState(false);
    const [gameList, setGameList] = useState([]);
    const [previousGamePlayOrder, setPreviousGamePlayOrder] = useState(null);
    const addNewGame = (game) => {
        setGameList((prev) => {
            prev.push(game);
            return [...prev];
        })
    }

    const playPreviousGame = (gameListInd) => {
        let gamePlayOrder = gameList[gameListInd];
        setIsGameActive(true);
        setPreviousGamePlayOrder(gamePlayOrder)
    }
    return (
        <AppContext.Provider value={{ gameList, previousGamePlayOrder, playPreviousGame, isGameActive, setIsGameActive, addNewGame,setPreviousGamePlayOrder }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;