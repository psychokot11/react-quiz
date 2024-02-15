import React from 'react';
import Options from './Options';

function Question({ question }) {
  return (
    <>
      <h4>{question.question}</h4>
      <Options options={question.options} />
    </>
  );
};

export default Question;