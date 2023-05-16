import React, { useContext } from 'react';
import { BsPlayCircleFill } from 'react-icons/bs';
import PlayContext from '../../Context/PlayContext';
import './FrontScreen.css';

function FrontScreen(props) {
  const { play, setPlay } = useContext(PlayContext);

  return (
    <div className="frontscreen-container">
      <span className="start-text">Click on the button to start</span>
      <BsPlayCircleFill
        className="start-btn"
        onClick={() => {
          setPlay(true);
          props?.selectRandomQuestion();
        }}
        size="3rem"
      />
      {/* <button>START</button> */}
    </div>
  );
}

export default FrontScreen;
