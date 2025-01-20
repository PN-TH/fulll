import { useState, useEffect } from "react";

const useDebounce = (value: string): string => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  // Use timer to wait 500ms before updating the debounced value
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);
    // Clear the timeout if the value change
    return () => {
      clearTimeout(timeoutId);
    };
  }, [value]);

  return debouncedValue;
};

export default useDebounce;
