import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface DevtoolsState {
  showDevtools: boolean;
}

const initialState: DevtoolsState = {
  showDevtools: false,
};

export const devtoolsSlice = createSlice({
  name: "devtools",
  initialState,
  reducers: {
    toggleShowDevtools: (state, action: PayloadAction<boolean | undefined>) => {
      state.showDevtools =
        typeof action.payload === "undefined"
          ? !state.showDevtools
          : action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleShowDevtools } = devtoolsSlice.actions;

export default devtoolsSlice.reducer;
