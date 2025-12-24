import React, { useEffect } from 'react';
import { useToastContext } from '../context/ToastContext';
import './Toast.css';

export default function Toast() {
  const { toasts, removeToast } = useToastContext();

  return (
    <div className="toast-container" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

function ToastItem({ toast, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    warning: '⚠️',
  };

  return (
    <div className={`toast toast-${toast.type}`} role="status" aria-live="polite">
      <span className="toast-icon" aria-hidden>{icons[toast.type]}</span>
      <span className="toast-message">{toast.message}</span>
      <button onClick={onClose} className="toast-close" aria-label="Dismiss notification">×</button>
    </div>
  );
}
