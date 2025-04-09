import { useEffect, useState } from 'react';

import { EVENT_TIME_CHECK_INTERVAL_MS } from '../const';

export const useEventTimer = () => {
  const [serverTime, setServerTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setServerTime(Date.now());
    }, EVENT_TIME_CHECK_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return { serverTime };
};
