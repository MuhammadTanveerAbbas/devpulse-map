'use client';

import { useState, useEffect } from 'react';

function calcTimeAgo(unixTs: number, nowSec: number): string {
  const diff = nowSec - unixTs;
  if (diff < 0) return 'just now';
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function TimeAgo({ timestamp }: { timestamp: number }) {
  const [label, setLabel] = useState(() => calcTimeAgo(timestamp, Math.floor(Date.now() / 1000)));

  useEffect(() => {
    const update = () => setLabel(calcTimeAgo(timestamp, Math.floor(Date.now() / 1000)));
    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, [timestamp]);

  return <span>{label}</span>;
}
