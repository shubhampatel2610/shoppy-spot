import { useEffect, useState } from 'react';

// Returns `value` re-emitted `delayMs` after it stops changing - the same debounce
// timing Navbar's product search already uses, pulled out so any search input can share it.
const useDebouncedValue = (value, delayMs = 400) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}

export default useDebouncedValue;
