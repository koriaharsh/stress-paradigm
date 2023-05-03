import React, { useEffect, useState, useContext } from 'react';
import { questionsAndAnswers } from '../Questions/Questions';
import ScoreContext from '../../Context/ScoreContext';
import './QA.css';

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
  const optionHeading = ['A', 'B', 'C', 'D'];
  const [queAns, setQueAns] = useState(questionsAndAnswers);

  const { setScore } = useContext(ScoreContext);

  useEffect(() => {
    // console.log(questionsAndAnswers);
    selectRandomQuestion();
  }, []);

  // const progress = 10;
  const trackProgress = {
    backgroundColor: '#274c77',
    borderRadius: '20px',
    width: `${progress}%`,
    height: '5px',
  };

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
    const interval = setInterval(() => {
      setProgress((val) => val - 1);
    }, 150);

    const timeInterval = setInterval(() => {
      setSeconds((val) => val - 1);
    }, 1000);

    setProgressInterval(interval);
    setTimeInterval(timeInterval);

    setCorrect(99);
    setWrong(99);
    const randomIndex = Math.floor(Math.random() * queAns.length);
    setAsked((prev) => [...prev, randomIndex]);
    const QA = queAns[randomIndex];
    console.log(QA);
    setSelectedQue(QA);

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
  return (
    <div className="QA-container">
      <div className="question">{`Que.  ${selectedQue?.question}`}</div>
      <span
        style={{
          marginTop: '2%',
          padding: '20px',
          color: '#274C77',
          fontSize: '20px',
        }}
      >{`${seconds} Seconds remaining`}</span>
      <div className="progress-bar-container">
        <div style={trackProgress}></div>
      </div>
      <div className="options-container">
        {selectedQue?.options?.map((item, index) => (
          <div
            className="option"
            key={index}
            onClick={() => checkAnswer(item, index)}
            style={{
              backgroundColor:
                correct === index ? 'green' : wrong === index ? 'red' : '',
            }}
          >
            {`${optionHeading[index]} ${item}`}
          </div>
        ))}
      </div>
    </div>
  );
}

export default QandA;
