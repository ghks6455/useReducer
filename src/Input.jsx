import { useRef, useReducer } from "react";

export default function Input() {
  const inputRef = useRef();

  return (
    <>
      <input type="text" ref={inputRef} />
    </>
  );
}
