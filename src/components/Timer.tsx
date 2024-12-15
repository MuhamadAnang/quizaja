import React, { useEffect } from 'react';

interface TimerProps {
  timeLeft: number;
  onTimeout: () => void;
}

const Timer: React.FC<TimerProps> = ({ timeLeft, onTimeout }) => {
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeout();
    }
  }, [timeLeft, onTimeout]);

  return (
    <div className="text-right">
      Time left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
    </div>
  );
};

export default Timer;
