import React from 'react';
import Options from './Options';
import { useQuiz } from "../contexts/QuizContext";

function Question() {
  const { questions, index, answer, dispatch } = useQuiz();
  const question = questions[index];
  
  return (
    <>
      <h4>{question.question}</h4>
      <Options questions={questions} answer={answer} dispatch={dispatch}/>
    </>
  );
};

export default Question;