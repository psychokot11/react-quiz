import React from 'react';
import { useQuiz } from "../contexts/QuizContext";

function Options() {
    const { questions, index: questionIndex, answer, dispatch } = useQuiz();
    const hasAnswer = answer !== null;
  return (
    <>
      <div className='options'>
        {questions[questionIndex].options.map((option, index) => (  
            <button className={`btn btn-option ${index === answer ? "answer" : ""} 
                    ${hasAnswer ? 
                        index === questions[questionIndex].correctOption 
                        ? "correct" 
                        : "wrong"
                    : ""
                }`} 
                    key={option}
                    onClick={(e) => dispatch({ type: "newAnswer", payload: index})}
                    disabled={hasAnswer}
            >
                {option}
            </button>
        ))}
      </div>
    </>
  );
};

export default Options;