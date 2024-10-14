import React, {
  createContext,
  useContext,
  useRef,
  ReactNode,
  RefObject,
} from "react";

export const GlobalRefKeys = {
  CENTER_COLUMN: "CENTER_COLUMN",
} as const;

// Extract the type of the keys to enforce type safety
export type GlobalRefKey = keyof typeof GlobalRefKeys;

type GlobalRefsContextType = {
  setRef: (key: GlobalRefKey, ref: RefObject<HTMLElement>) => void;
  getRef: (key: GlobalRefKey) => RefObject<HTMLElement> | null;
  refs: Map<GlobalRefKey, RefObject<HTMLElement>>;
};

const GlobalRefsContext = createContext<GlobalRefsContextType | null>(null);

export const useGlobalRefs = () => {
  const context = useContext(GlobalRefsContext);
  if (!context) {
    throw new Error("useGlobalRefs must be used within a GlobalRefsProvider");
  }
  return context;
};

export const GlobalRefsProvider = ({ children }: { children: ReactNode }) => {
  // Store refs in a Map with keys as strings
  const refs = useRef<Map<GlobalRefKey, RefObject<HTMLElement>>>(new Map());

  const setRef = (key: GlobalRefKey, ref: RefObject<HTMLElement>) => {
    refs.current.set(key, ref);
  };

  const getRef = (key: GlobalRefKey): RefObject<HTMLElement> | null => {
    return refs.current.get(key) || null;
  };

  const value = { setRef, getRef, refs: refs.current };

  return (
    <GlobalRefsContext.Provider value={value}>
      {children}
    </GlobalRefsContext.Provider>
  );
};
