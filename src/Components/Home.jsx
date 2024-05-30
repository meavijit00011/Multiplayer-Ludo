import React, { useContext } from 'react'
import { AppContext } from '../Context/AppContext'
import classes from './Home.module.css';
import { FaPlay } from "react-icons/fa6";
const Home = () => {
  const appContext = useContext(AppContext)
  return (
    <div>
      <div className={classes.actions}>
        <button className={classes.home_action_btn1}>Play Online</button>
        <button onClick={appContext.setIsGameActive.bind(null, true)} className={classes.home_action_btn2}>Play Offline</button>
      </div>
      <div>
        <h3>Previous Games - </h3>
      </div>
      <div className={classes.list_container}>
        {appContext.gameList.map((game, ind) => {
          return <div key={ind} className={classes.list_content}>
            <div>Game {ind}</div>
            <div>Player - {Math.max(...game.winning)}</div>
            <div onClick={appContext.playPreviousGame.bind(null,ind)} className={classes.play_saved_game_btn}><FaPlay size={25} color='blue' /></div>
          </div>
        })}

      </div>
    </div>
  )
}

export default Home