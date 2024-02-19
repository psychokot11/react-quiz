import React from 'react';
import Options from './Options';

function Question({ question, answer, dispatch }) {
  return (
    <>
      <h4>{question.question}</h4>
      <Options questions={question} answer={answer} dispatch={dispatch}/>
    </>
  );
};

export default Question;