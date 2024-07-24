import { createContext, useContext, useEffect, useReducer  } from "react"

const QuizContext = createContext()

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  remainingSeconds: null
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
        status: "active",
        remainingSeconds: state.questions.length * SECS_PER_QUESTION
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
        highscore: state.points > state.highscore ? state.points : state.highscore,
      }
    case "restart":
      return {
        ...state,
        status: "ready",
        index: 0,
        answer: null,
        points: 0,
      }
    case "tick":
      return {
        ...state,
        remainingSeconds: state.remainingSeconds - 1,
        status: state.remainingSeconds === 0 ? "finished" : state.status
      }
    default:
      throw new Error("Invalid action type")
  }
}

function QuizProvider({children}) {
    const [{ questions, status, index, answer, points, highscore, remainingSeconds }, dispatch] = useReducer(reducer, initialState);
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
        <QuizContext.Provider value={{
            questions,
            status,
            index,
            answer,
            points,
            highscore,
            remainingSeconds,
            numQuestions,
            maxPoints,
            dispatch
        }}>
            {children}
        </QuizContext.Provider>
    )
}

function useQuiz() {
    const context = useContext(QuizContext)

    if (!context) {
        throw new Error("QuizContext was used outside of the QuizProvider")
    }

    return context
}

export { QuizProvider, useQuiz }