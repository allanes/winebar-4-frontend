import { useEffect, useState } from 'react';
import { fetchVitteStatus, VitteStatus } from '../services/vitteStatusService';

const POLL_INTERVAL_MS = 15000;

export const useVitteStatus = (enabled = true) => {
  const [status, setStatus] = useState<VitteStatus | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setStatus(null);
      setFailed(false);
      return;
    }

    let isMounted = true;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const poll = async () => {
      try {
        const nextStatus = await fetchVitteStatus();
        if (isMounted) {
          setStatus(nextStatus);
          setFailed(false);
        }
      } catch (error) {
        console.error('Failed to check Vitte status:', error);
        if (isMounted) {
          setFailed(true);
        }
      } finally {
        if (isMounted) {
          timeoutId = setTimeout(poll, POLL_INTERVAL_MS);
        }
      }
    };

    poll();

    return () => {
      isMounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [enabled]);

  return {
    status,
    isOnline: Boolean(status?.online) && !failed,
    failed,
  };
};

