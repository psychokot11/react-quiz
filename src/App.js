import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";

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
      <p>1/15</p>
      <p>Welcome :)</p>
     </Main>
    </div>
  );
}
