import { useEffect, useState } from "react";

// Returns a debounced copy of `value` that updates only
// after `delay` ms of inactivity. Useful for live search.
const useDebounce = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
};

export default useDebounce;

