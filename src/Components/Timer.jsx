import React, { useContext, useMemo, useReducer } from 'react';
import { GameContext } from '../Context/GameContext';

const Timer = () => {
    const {time} = useContext(GameContext);

    return (
        <div style={{width:'fit-content',margin:'20px auto',fontWeight:'500'}}>
            Timer - {`${time.min} : ${time.sec}`}
        </div>
    )
}

export default Timer