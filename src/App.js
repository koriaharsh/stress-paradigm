import PlayState from './Context/PlayState';
import ScoreState from './Context/ScoreState';
import Quiz from './components/Quiz/Quiz';

function App() {
  return (
    <ScoreState>
      <PlayState>
        <div>
          <Quiz />
        </div>
      </PlayState>
    </ScoreState>
  );
}

export default App;
