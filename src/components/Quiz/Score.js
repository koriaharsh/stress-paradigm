import React from 'react';
import { BsTrophy } from 'react-icons/bs';
import { useContext } from 'react';
import ScoreContext from '../../Context/ScoreContext';
import './Score.css';

function Score(props) {
  const { score } = useContext(ScoreContext);
  return (
    <div className="score-container">
      <BsTrophy size="2em" />
      <h3 style={{ marginLeft: '10px' }}>{score} / 10</h3>
    </div>
  );
}

export default Score;
