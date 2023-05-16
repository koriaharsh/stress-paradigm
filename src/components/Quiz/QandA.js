import React, { useEffect, useState, useContext } from 'react';
import { questionsAndAnswers } from '../Questions/Questions';
import ScoreContext from '../../Context/ScoreContext';
import PlayContext from '../../Context/PlayContext';
import TICK from './ticki.mp3';
import './QA.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import FrontScreen from '../Play/FrontScreen';

function QandA() {
  const [asked, setAsked] = useState([]);
  const [selectedQue, setSelectedQue] = useState({});
  const [result, setResult] = useState('');
  const [correct, setCorrect] = useState(99);
  const [wrong, setWrong] = useState(99);
  const [progress, setProgress] = useState(100);
  const [seconds, setSeconds] = useState(15);
  const [progressInterval, setProgressInterval] = useState('');
  const [timeInterval, setTimeInterval] = useState('');
  const [tickSound, setTickSound] = useState('');
  const optionHeading = ['A', 'B', 'C', 'D', 'E', 'F'];
  const colorOptions = ['GREEN', 'RED', 'BLUE', 'YELLOW', 'BLACK'];
  const [queAns, setQueAns] = useState(questionsAndAnswers);

  const { score, setScore } = useContext(ScoreContext);
  const { play, setPlay } = useContext(PlayContext);

  // useEffect(() => {
  //   selectRandomQuestion();
  // }, []);

  useEffect(() => {
    if (progress === 0) {
      clearInterval(progressInterval);
      clearInterval(timeInterval);
      setSeconds(15);
      setProgress(100);
      selectRandomQuestion();
    }
  }, [progress]);

  const selectRandomQuestion = () => {
    setCorrect(99);
    setWrong(99);
    const randomIndex = Math.floor(Math.random() * queAns.length);
    setAsked((prev) => [...prev, randomIndex]);
    const QA = queAns[randomIndex];
    console.log(QA);
    setSelectedQue(QA);

    console.log(QA);
    let intervalTime = 150;
    if (QA?.questionType === 'math') {
      setSeconds(15);
      intervalTime = 150;
    } else if (QA?.questionType === 'stroop') {
      intervalTime = 50;
      setSeconds(5);
    }

    const interval = setInterval(() => {
      setProgress((val) => val - 1);
    }, intervalTime);

    const timeInterval = setInterval(() => {
      setSeconds((val) => val - 1);
      playTickSound();
    }, 1000);
    setProgressInterval(interval);
    setTimeInterval(timeInterval);

    if (queAns.length === 0) {
      setSelectedQue({
        question: 'Completed',
      });
      clearInterval(interval);
      clearInterval(timeInterval);
    }
    queAns.splice(randomIndex, 1);
  };

  const checkAnswer = (choosenAnswer, index) => {
    if (choosenAnswer === selectedQue.answer) {
      setResult('Correct');
      setCorrect(index);
      setScore((prev) => prev + 1);
      clearInterval(progressInterval);
      clearInterval(timeInterval);

      setTimeout(() => {
        setProgress(100);
        setSeconds(15);
        selectRandomQuestion();
      }, 2000);
    } else {
      setResult('Wrong');
      setWrong(index);
      clearInterval(progressInterval);
      clearInterval(timeInterval);

      setTimeout(() => {
        setProgress(100);
        setSeconds(15);
        selectRandomQuestion();
      }, 2000);
    }
  };

  const playTickSound = () => {
    const tickSound = new Audio(TICK);
    tickSound.play();
  };

  if (play === true) {
    return (
      <div className="QA-container">
        <div className="question">
          {`${selectedQue?.question}`}
          <span style={{ color: selectedQue.answer }}>
            {selectedQue?.key ? selectedQue.key : ''}
          </span>
        </div>
        {selectedQue.question === 'Completed' ? (
          <>
            <div style={{ fontSize: '3em', color: '#274C77' }}>
              <div>{`Final Score: ${score}`}</div>
            </div>
            {score >= 5 ? (
              <span
                style={{ color: 'green', fontSize: '2em', textAlign: 'center' }}
              >
                Congratulations you Passed the test!!
              </span>
            ) : (
              <span
                style={{ color: 'red', fontSize: '2em', textAlign: 'center' }}
              >
                You Failed the test, Better luck next time!
              </span>
            )}
          </>
        ) : (
          <>
            <div style={{ width: 150, height: 150, marginTop: '2%' }}>
              <CircularProgressbar
                value={progress}
                text={`${seconds}sec`}
                strokeWidth={4}
              />
            </div>
          </>
        )}
        <div className="options-container">
          {selectedQue?.options?.map((item, index) => (
            <div
              className="option"
              key={index}
              onClick={() => checkAnswer(item, index)}
              style={{
                backgroundColor:
                  correct === index ? 'green' : wrong === index ? 'red' : '',
                pointerEvents: correct !== 99 || wrong !== 99 ? 'none' : '',
              }}
            >
              {`${optionHeading[index]} ${item}`}
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <>
        <FrontScreen selectRandomQuestion={selectRandomQuestion} />
      </>
    );
  }
}

export default QandA;
