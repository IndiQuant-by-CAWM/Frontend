import { useEffect, useState } from "react";

// A shared ticking clock. Lives here rather than inside Countdown.tsx so a page
// that has to *gate* on a deadline (disabling the upload control once the
// submission window closes) ticks off the same clock the visible countdown
// does, instead of running a second interval that can disagree with what the
// user is reading.
export function useNow(intervalMs = 1000): number {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}
