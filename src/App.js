import { useContext } from "react";
import Game from "./Components/Game";
import ContextProvider, { GameContext } from "./Context/GameContext";
import Dice from "./Components/Dice";
import Timer from "./Components/Timer";
import Modal from "./Components/Modal";
import Home from "./Components/Home";
import { AppContext } from "./Context/AppContext";
import Back from "./Components/Back";

function App() {

  const appContext = useContext(AppContext);
  console.log(appContext)
  return (
    <div className="App">
      {!appContext.isGameActive && <Home></Home>}
      {appContext.isGameActive && <ContextProvider>
        <Game></Game>
      </ContextProvider>}

    </div>
  );
}

export default App;
