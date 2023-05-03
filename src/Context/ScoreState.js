import React, { useState } from 'react';
import ScoreContext from './ScoreContext';

function ScoreState(props) {
  const [score, setScore] = useState(0);

  return (
    <ScoreContext.Provider value={{ score, setScore }}>
      {props.children}
    </ScoreContext.Provider>
  );
}

export default ScoreState;
