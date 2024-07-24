import React from 'react';

import { useQuiz } from "../contexts/QuizContext";

function FinishScreen() {
    const { points, maxPoints, highscore, dispatch } = useQuiz();
    const percentage = (points / maxPoints) * 100;

    let emoji;

    if (percentage === 100) emoji = '👍';
    if (percentage >= 50 && percentage > 100) emoji = '👌';
    if (percentage >= 0 && percentage < 50) emoji = '🙂';

  return (
    <>
      <p className='result'>
          <span>{emoji}</span>You scored <strong>{points}</strong> out of {maxPoints} points!
          ({Math.round(percentage)}%)
      </p>
      <p className='highscore'>(Highscore: {highscore} points)</p>
      <button className='btn btn-ui' onClick={() => dispatch({ type: "restart" })}>Restart
      </button>
    </>
  );
};

export default FinishScreen;