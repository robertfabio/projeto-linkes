import { useState, useEffect } from 'react';

interface AlertProps {
  message: string;
  type?: 'success' | 'error' | null;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

export function Alert({
  message,
  type = null,
  onClose,
  autoClose = true,
  duration = 3000,
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose?.(), 300);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose?.(), 300);
  };

  const bgColor = type === 'success' 
    ? 'bg-green-500' 
    : type === 'error' 
    ? 'bg-red-500' 
    : 'bg-white';

  return (
    <div
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300 ease-out
        ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
      `}
    >
      <div className={`${bgColor} text-black py-3 px-4 flex items-center justify-center w-fit mx-auto rounded-b-lg shadow-lg`}>
        <p className="text-sm font-medium flex-1 text-center pr-8">
          {message}
        </p>
        
        <button
          onClick={handleClose}
          className="hover:opacity-70 transition-opacity"
          aria-label="Fechar"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export const Toast = Alert;
