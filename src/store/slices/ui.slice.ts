import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface UIState {
  centerColumnTarget: number;
}

const initialState: UIState = {
  centerColumnTarget: 0,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setCenterColumnTarget: (state, action: PayloadAction<number>) => {
      state.centerColumnTarget = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCenterColumnTarget } = uiSlice.actions;

export default uiSlice.reducer;
