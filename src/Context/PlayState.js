import React, { useState } from 'react';
import PlayContext from './PlayContext';

function PlayState(props) {
  const [play, setPlay] = useState(false);

  return (
    <PlayContext.Provider value={{ play, setPlay }}>
      {props.children}
    </PlayContext.Provider>
  );
}

export default PlayState;
