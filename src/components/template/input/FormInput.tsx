import { InputHTMLAttributes, forwardRef } from 'react';
import ErrorMessage from './errorMessage';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({
  label,
  error,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="flex flex-col w-full max-w-md">
      {label && (
        <label className="text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        ref={ref}
        {...props}
        className={`shadow-md rounded-md p-2 w-full transition-all duration-300 ${
          error ? 'border-2 border-red-500' : 'border-2 border-gray-300'
        } ${className}`}
      />
      {error && <ErrorMessage type="error" message={error} />}
    </div>
  );
});

FormInput.displayName = 'FormInput';

export default FormInput; 