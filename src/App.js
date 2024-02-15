import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";

const initialState = {
  questions: [],
  status: "loading"
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
    default:
      throw new Error("Invalid action type")
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

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
      {state.status === "loading" && <Loader />}
      {state.status === "error" && <Error />}
     </Main>
    </div>
  );
}
