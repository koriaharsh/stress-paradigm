import ScoreState from './Context/ScoreState';
import Quiz from './components/Quiz/Quiz';

function App() {
  return (
    <ScoreState>
      <div>
        <Quiz />
      </div>
    </ScoreState>
  );
}

export default App;
