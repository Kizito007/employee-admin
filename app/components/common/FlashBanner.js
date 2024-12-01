import React, { useEffect } from 'react';

export default function FlashBanner({ message, type = 'error', onClose, timeout = 5000 }) {
  const bannerStyles = {
    error: 'bg-red-100 text-red-900',
    success: 'bg-green-100 text-green-900',
  };

  // Automatically close the banner after the specified timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, timeout);

    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, [timeout, onClose]);

  return (
    <div className={`block w-full border-0 p-4 rounded-md ${bannerStyles[type]} flex items-center justify-end`}>
      <span>{message}</span>
      <button
        onClick={onClose}
        className="text-sm font-semibold  hover:underline ml-4"
      >
        <span>X</span>
      </button>
    </div>
  );
}
