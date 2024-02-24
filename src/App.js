import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import ProgressBar from "./components/ProgressBar";
import FinishScreen from "./components/FinishScreen";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0
}

function reducer(state, action) {
  switch(action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready"
      }
    case "dataFailed":
      return {
        ...state,
        status: "error"
      }
    case "start":
      return {
        ...state,
        status: "active"
      }
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption 
          ? state.points + question.points
          : state.points
      }
    case "nextQuestion":
      return {
        ...state, 
        index: state.index + 1,
        answer: null
      }
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore: state.points > state.highscore ? state.points : state.highscore
      }
    case "restart":
    return {
      ...state,
      status: "ready",
      index: 0,
      answer: null,
      points: 0,
    }
    default:
      throw new Error("Invalid action type")
  }
}

export default function App() {
  const [{ questions, status, index, answer, points, highscore }, dispatch] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(function() {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5000/questions");
        const data = await response.json();
        dispatch({ type: "dataReceived", payload: data })
      } catch (err) {
        dispatch({ type: "dataFailed" })
      }
    }
  
    fetchData();
  }, [])

  return (
    <div className="app">
      <Header />
     <Main>
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {status === "ready" && <StartScreen 
      numQuestions={numQuestions} dispatch={dispatch}/>}
      {status === "active" && 
        <>
          <ProgressBar 
            index={index} 
            numQuestions={numQuestions} 
            points={points}
            maxPoints={maxPoints}
            answer={answer} />
          <Question 
            question={questions[index]}
            answer={answer} 
            dispatch={dispatch} />
          <NextButton 
            dispatch={dispatch} 
            answer={answer}
            index={index}
            numQuestions={numQuestions} 
            />
        </>
      }
      {status === "finished" &&
        <FinishScreen 
          points={points} 
          maxPoints={maxPoints}
          highscore={highscore}
          dispatch={dispatch}
          />}
     </Main>
    </div>
  );
}
