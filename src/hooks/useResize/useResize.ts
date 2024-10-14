import { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

const useResize = (callback: () => void, delay = 300) => {
  const handleResize = useDebouncedCallback(() => {
    callback();
  }, delay);

  useEffect(() => {
    callback(); // Call the callback immediately
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      handleResize.flush(); // Immediately invoke pending function invocations
    };
  }, [handleResize, callback]);
};

export default useResize;
