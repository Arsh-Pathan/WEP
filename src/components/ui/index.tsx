import type { ReactNode, InputHTMLAttributes } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'outline' | 'danger' | 'ghost';
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  className = '', 
  disabled = false,
  style 
}: ButtonProps) => {
  const baseStyles = 'px-6 py-2.5 rounded-md font-medium transition-all duration-200 text-sm active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-google-blue text-white hover:bg-blue-700 shadow-sm',
    outline: 'border border-gray-300 text-google-grey hover:bg-gray-50',
    danger: 'bg-google-red text-white hover:bg-red-700 shadow-sm',
    ghost: 'text-google-grey hover:bg-gray-100',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={style}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  error?: string;
  icon?: any;
}

export const Input = ({ label, id, error, icon: Icon, ...props }: InputProps) => {
  return (
    <div className="mb-4">
      {label && <label htmlFor={id} className="block text-sm font-medium text-google-grey mb-1.5">{label}</label>}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon size={18} />
          </div>
        )}
        <input
          id={id}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2 border rounded-md outline-none transition-all focus:border-google-blue focus:ring-1 focus:ring-google-blue ${error ? 'border-google-red' : 'border-gray-300'}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-google-red">{error}</p>}
    </div>
  );
};

export const Card = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-sm p-6 ${className}`}>
      {children}
    </div>
  );
};
