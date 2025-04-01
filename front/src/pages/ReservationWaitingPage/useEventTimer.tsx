import { useEffect, useState } from 'react';

const INTERVAL_TIME = 1000;
export default function useEventTimer() {
  const [serverTime, setServerTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setServerTime(Date.now());
    }, INTERVAL_TIME);
    return () => clearInterval(interval);
  }, []);

  return { serverTime };
}
