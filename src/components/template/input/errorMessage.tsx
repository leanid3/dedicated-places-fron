import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ErrorType = 'error' | 'warning' | 'info';

interface ErrorMessageProps {
  type: ErrorType;
  message: string;
  className?: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ type, message, className = '' }) => {
  const getTypeStyles = (type: ErrorType) => {
    switch (type) {
      case 'error':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'warning':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'info':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-red-50 text-red-700 border-red-200';
    }
  };

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={`w-full max-w-md mx-auto mt-2 ${className}`}
        >
          <div
            className={`px-4 py-2 rounded-lg border ${getTypeStyles(type)} 
              text-sm font-medium shadow-sm
              sm:text-base
              md:py-2.5
              lg:py-3`}
          >
            {message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorMessage;
