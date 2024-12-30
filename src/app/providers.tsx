"use client";
import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store";
import { useAppDispatch } from "@/store/hooks";
import { Provider } from "react-redux";
import { GlobalRefsProvider } from "@/hooks/useGlobalRefs/useGlobalRefs";
import { useHotkeys } from "react-hotkeys-hook";
import { toggleShowDevtools } from "@/store/slices/devtools.slice";

const KeyCombos = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useHotkeys("ctrl+shift+d", () => {
    dispatch(toggleShowDevtools());
  });

  return children;
};

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <KeyCombos>
          <GlobalRefsProvider>{children}</GlobalRefsProvider>
        </KeyCombos>
      </PersistGate>
    </Provider>
  );
};

export default Providers;
