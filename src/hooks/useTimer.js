import { useEffect } from 'react';
import { useState } from 'react';

export const useBlinker = () => {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(prev => !prev);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return {
    blink,
  };
};
