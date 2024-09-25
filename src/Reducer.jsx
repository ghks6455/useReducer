import { useState, useReducer } from "react";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0);
  // useReduer는 2개의 인수를 받은
  // 첫번째 : 상태 변경을 처리하는 함수
  // 두번째 : 초기상태
  // state : 현재 상태
  // dispatch : 특정 액션을 실행해서 상태를 업데이트 하는 함수(액션전달)
  const initState = { value: 0 };
  const [state, dispatch] = useReducer(reducer, initState);

  function reducer(state, action) {
    // 첫번째 parameter : 현재 상태
    // 두번째 parameter : 액션 객체
    switch (action.type) {
      case "INCREMENT":
        console.log(action.name);
        return { value: state.value + 1 };
      case "DECREMENT":
        alert(action.false);
        return { value: state.value - 1 };

      default:
        throw new Error("정의되지 않은 액션");
    }
  }

  return (
    <>
      <div>
        <h2>카운트: {state.value}</h2>
        <button
          onClick={() => {
            dispatch({ type: "INCREMENT", name: "so" });
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            dispatch({ type: "DECREMENT", false: "실패!" });
          }}
        >
          -
        </button>
        <button
          onClick={() => {
            dispatch({ type: "ho" });
          }}
        >
          에러 메세지 확인
        </button>
      </div>
    </>
  );
}

export default App;
