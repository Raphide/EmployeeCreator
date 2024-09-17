import React from "react";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { decrement, incrememnt } from "./counterSlice";
import styles from "./Counter.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";

const Counter = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Incrememnt value"
          onClick={() => dispatch(incrememnt())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

export default Counter;
