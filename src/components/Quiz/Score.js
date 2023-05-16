import React from 'react';
import { BsTrophy } from 'react-icons/bs';
import { useContext } from 'react';
import { questionsAndAnswers, getLength } from '../Questions/Questions';
import ScoreContext from '../../Context/ScoreContext';
import './Score.css';

function Score(props) {
  const { score } = useContext(ScoreContext);

  return (
    <div className="score-container">
      <BsTrophy size="2em" />
      <h3 style={{ marginLeft: '10px' }}>
        {score} / {getLength()}
      </h3>
    </div>
  );
}

export default Score;
