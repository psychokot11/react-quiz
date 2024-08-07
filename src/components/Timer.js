import React, { useEffect } from 'react';
import { useQuiz } from "../contexts/QuizContext";

function Timer() {
    const { remainingSeconds, dispatch } = useQuiz();
    const mins = Math.floor(remainingSeconds / 60);
    const secs = remainingSeconds % 60;

    useEffect(function() {
        const id = setInterval(function() {
            dispatch({ type: "tick" })
        }, 1000)

        return function() {
            clearInterval(id)
        }
    }, [dispatch])
  return (
    <div className='timer'>
      {mins < 10 && '0'}{mins}:{secs < 10 && '0'}{secs}
    </div>
  );
};

export default Timer;