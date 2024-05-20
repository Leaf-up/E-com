import { useRef, useEffect } from 'react';
import message from './message';

export const MessageHolder = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.appendChild(message.el);
  }, []);

  return <div ref={ref} />;
};
