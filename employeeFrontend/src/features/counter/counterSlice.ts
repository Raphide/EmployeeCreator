import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface CounterState {
  value: number;
}

const initialState = {
  value: 0,
} as CounterState;

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incrememnt: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { incrememnt, decrement, incrementByAmount } =
  counterSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
