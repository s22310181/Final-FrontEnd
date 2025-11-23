import React from 'react';

const Notification = ({ message, show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed top-24 right-4 z-[100] animate-slide-in-right">
      <div className="flex items-center gap-3 bg-white dark:bg-background-dark/95 backdrop-blur-md rounded-2xl px-6 py-4 shadow-2xl border border-gray-200 dark:border-white/10 min-w-[300px] max-w-md">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20">
            <span className="material-symbols-outlined text-primary text-xl">
              check_circle
            </span>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-sm font-normal dark:text-white" style={{ color: '#000000' }}>
            {message}
          </p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>
      </div>
    </div>
  );
};

export default Notification;

