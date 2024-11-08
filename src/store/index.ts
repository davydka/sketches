import { configureStore } from "@reduxjs/toolkit";
import { devtoolsSlice } from "@/store/slices/devtools.slice";
import { projectSlice } from "@/store/slices/project.slice";
import { uiSlice } from "@/store/slices/ui.slice";

export const store = configureStore({
  reducer: {
    devtools: devtoolsSlice.reducer,
    project: projectSlice.reducer,
    ui: uiSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
