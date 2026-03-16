'use client';

import { useState, useEffect } from 'react';
import { intervalToDuration, isBefore } from 'date-fns';

export function useCountdown(endTime: string, onEnd?: () => void) {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [isEnded, setIsEnded] = useState(false);
  const [isCritical, setIsCritical] = useState(false);

  useEffect(() => {
    const target = new Date(endTime);

    const updateTimer = () => {
      const now = new Date();
      if (isBefore(target, now)) {
        setTimeLeft('Ended');
        setIsEnded(true);
        onEnd?.();
        return;
      }

      const duration = intervalToDuration({ start: now, end: target });
      const { days, hours, minutes, seconds } = duration;

      const parts = [];
      if (days) parts.push(`${days}d`);
      if (hours || days) parts.push(`${hours}h`);
      parts.push(`${minutes}m`);
      parts.push(`${seconds}s`);

      setTimeLeft(parts.join(' '));
      
      // Critical if less than 2 minutes
      const diffMs = target.getTime() - now.getTime();
      setIsCritical(diffMs < 1000 * 60 * 2);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [endTime, onEnd]);

  return { timeLeft, isEnded, isCritical };
}
