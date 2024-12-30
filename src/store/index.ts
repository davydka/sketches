import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { devtoolsSlice } from "@/store/slices/devtools.slice";
import { projectSlice } from "@/store/slices/project.slice";
import { uiSlice } from "@/store/slices/ui.slice";

const devToolsPersistConfig = {
  key: "root",
  storage,
};

const appReducer = combineReducers({
  devtools: persistReducer<ReturnType<typeof devtoolsSlice.reducer>>(
    devToolsPersistConfig,
    devtoolsSlice.reducer,
  ),
  project: projectSlice.reducer,
  ui: uiSlice.reducer,
});

export const store = configureStore({
  reducer: appReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // Ignore these field paths in all actions
        // ignoredActionPaths: [],
        // Ignore these paths in the state
        ignoredPaths: [],
      },
    }).concat([
      // Add other middleware as needed
    ]);
  },
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
