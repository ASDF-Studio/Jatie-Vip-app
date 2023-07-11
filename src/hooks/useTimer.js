import { useEffect, useMemo } from 'react';
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

export const useBackgroundFetch = ({
  callback = () => console.log('callback'),
  delay = 10,
  isFocused,
}) => {
  const delaySeconds = useMemo(() => delay * 1000, [delay]);

  let interval;

  useEffect(() => {
    if (!isFocused) {
      console.log('clearing background fetch');
      clearInterval(interval);

      return;
    }
    interval = setInterval(() => {
      callback && callback();
    }, delaySeconds);

    return () => {
      clearInterval(interval);
    };
  }, [isFocused]);

  const unSubscribe = () => clearInterval(interval);

  return {
    unSubscribe,
  };
};
