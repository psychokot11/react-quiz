import React from 'react';

function FinishScreen({ points, maxPoints, highscore, dispatch }) {
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