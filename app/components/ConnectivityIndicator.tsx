'use client';

import { useSyncExternalStore } from 'react';

function subscribe(callback: () => void) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

function getSnapshot() {
  return navigator.onLine;
}

function getServerSnapshot() {
  return true;
}

export default function ConnectivityIndicator() {
  const online = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (online) return null;

  return (
    <div className="w-full bg-red-500/10 border-b border-red-500/30 text-center py-1">
      <span className="text-[10px] font-mono text-red-400 tracking-widest uppercase">
        You are offline. Some features may be unavailable.
      </span>
    </div>
  );
}
