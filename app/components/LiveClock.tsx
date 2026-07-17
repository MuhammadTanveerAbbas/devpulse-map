'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';

function detectTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  } catch {
    return 'UTC';
  }
}

function formatTime(date: Date, tz: string): string {
  try {
    return date.toLocaleString('en-US', {
      timeZone: tz,
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZoneName: 'short',
    });
  } catch {
    return date.toUTCString();
  }
}

let cachedTz: string | null = null;

function subscribeTz(callback: () => void) {
  callback();
  return () => {};
}

function getSnapshotTz(): string {
  if (cachedTz === null) {
    cachedTz = detectTimezone();
  }
  return cachedTz;
}

function getServerSnapshotTz(): string {
  return 'UTC';
}

export default function LiveClock() {
  const [now, setNow] = useState(() => new Date());
  const tz = useSyncExternalStore(subscribeTz, getSnapshotTz, getServerSnapshotTz);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('devpulse-tz');
    if (stored !== tz) {
      localStorage.setItem('devpulse-tz', tz);
    }
  }, [tz]);

  return (
    <span className="text-[10px] text-[var(--ds-gray-500)] font-mono tabular-nums">
      {formatTime(now, tz)}
    </span>
  );
}
