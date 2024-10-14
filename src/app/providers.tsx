"use client";
import React from "react";
import { store } from "@/store";
import { Provider } from "react-redux";
import { GlobalRefsProvider } from "@/hooks/useGlobalRefs/useGlobalRefs";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <GlobalRefsProvider>{children}</GlobalRefsProvider>
    </Provider>
  );
};

export default Providers;
