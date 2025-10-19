import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface AlertProps {
  message: string;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
  href?: string;
  target?: '_blank' | '_self';
}

export function Alert({ 
  message, 
  onClose, 
  autoClose = false,
  duration = 3000,
  href,
  target = '_blank'
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setIsVisible(true), 50);
    
    if (autoClose) {
      const closeTimer = setTimeout(() => handleClose(), duration);
      return () => {
        clearTimeout(showTimer);
        clearTimeout(closeTimer);
      };
    }
    
    return () => clearTimeout(showTimer);
  }, [autoClose, duration]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose?.(), 250);
  };

  if (isClosing) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ease-out ${
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
    }`}>
      <div 
        className={`flex items-center gap-2.5 bg-sky-50/95 backdrop-blur-sm border border-sky-200/50 rounded-xl px-3.5 py-2.5 shadow-lg shadow-sky-500/10 min-w-[280px] max-w-sm ${
          href ? 'cursor-pointer hover:bg-sky-100/95 hover:shadow-xl transition-all duration-200' : ''
        }`}
        onClick={href ? () => window.open(href, target) : undefined}
      >
        <div className="w-4 h-4 bg-sky-500 rounded-full flex items-center justify-center flex-shrink-0">
          <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <p className="text-sky-900 text-[13px] font-medium flex-1">{message}</p>
        
        <button
          onClick={(e) => { e.stopPropagation(); handleClose(); }}
          className="text-sky-400 hover:text-sky-500 transition-colors duration-150 flex-shrink-0 p-0.5"
        >
          <X size={16} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

// =============================================
// MINIMAL ALERT - Alerta Minimalista
// =============================================

interface MinimalAlertProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

const alertStyles = {
  success: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    icon: 'text-emerald-600',
    text: 'text-emerald-900',
    iconBg: 'bg-emerald-100',
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: 'text-red-600',
    text: 'text-red-900',
    iconBg: 'bg-red-100',
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: 'text-amber-600',
    text: 'text-amber-900',
    iconBg: 'bg-amber-100',
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: 'text-blue-600',
    text: 'text-blue-900',
    iconBg: 'bg-blue-100',
  },
};

export function MinimalAlert({
  message,
  type = 'info',
  onClose,
  autoClose = true,
  duration = 5000,
}: MinimalAlertProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Animação de entrada
    setTimeout(() => setIsVisible(true), 10);

    if (autoClose) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };

  if (!isVisible && isLeaving) return null;

  const style = alertStyles[type];

  // Ícones SVG para cada tipo
  const icons = {
    success: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
        isVisible && !isLeaving
          ? 'translate-x-0 opacity-100'
          : 'translate-x-full opacity-0'
      }`}
    >
      <div
        className={`
          ${style.bg} ${style.border} border rounded-xl 
          p-4 shadow-lg backdrop-blur-sm
          min-w-[320px] max-w-md
          flex items-start gap-3
        `}
      >
        {/* Ícone */}
        <div className={`${style.iconBg} ${style.icon} p-2 rounded-lg flex-shrink-0`}>
          {icons[type]}
        </div>

        {/* Mensagem */}
        <p className={`${style.text} text-sm font-medium flex-1 pt-2`}>
          {message}
        </p>

        {/* Botão fechar */}
        <button
          onClick={handleClose}
          className={`${style.icon} hover:opacity-70 transition-opacity flex-shrink-0 p-1`}
          aria-label="Fechar"
        >
          <X size={18} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

// =============================================
// TOAST - Notificação Toast Minimalista
// =============================================

interface ToastProps {
  message: string;
  description?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center';
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

const positions = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
};

export function Toast({
  message,
  description,
  type = 'info',
  position = 'top-right',
  onClose,
  autoClose = true,
  duration = 4000,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);

    if (autoClose) {
      const timer = setTimeout(() => handleClose(), duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };

  if (!isVisible && isLeaving) return null;

  const style = alertStyles[type];

  return (
    <div
      className={`fixed ${positions[position]} z-50 transition-all duration-300 ${
        isVisible && !isLeaving ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}
    >
      <div
        className={`
          bg-white border ${style.border} rounded-2xl
          shadow-xl backdrop-blur-sm
          min-w-[300px] max-w-sm
          p-4
        `}
      >
        <div className="flex items-start gap-3">
          {/* Barra lateral colorida */}
          <div className={`w-1 h-full ${style.iconBg} rounded-full absolute left-0 top-0 bottom-0`} />

          {/* Conteúdo */}
          <div className="flex-1 ml-2">
            <div className="flex items-center gap-2 mb-1">
              <span className={`${style.icon} text-xs font-bold uppercase tracking-wider`}>
                {type}
              </span>
            </div>
            <p className="text-gray-900 font-semibold text-sm mb-1">{message}</p>
            {description && (
              <p className="text-gray-600 text-xs leading-relaxed">{description}</p>
            )}
          </div>

          {/* Botão fechar */}
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
            aria-label="Fechar"
          >
            <X size={16} strokeWidth={2} />
          </button>
        </div>

        {/* Barra de progresso */}
        {autoClose && (
          <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${style.iconBg} transition-all ease-linear`}
              style={{
                width: '100%',
                animation: `progress ${duration}ms linear forwards`,
              }}
            />
          </div>
        )}
      </div>

      <style>{`
        @keyframes progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}
