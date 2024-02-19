import React from 'react';

function Options({ questions, answer, dispatch }) {
    const hasAnswer = answer !== null;
  return (
    <>
      <div className='options'>
        {questions.options.map((option, index) => (  
            <button className={`btn btn-option ${index === answer ? "answer" : ""} 
                    ${hasAnswer ? 
                        index === questions.correctOption 
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