import React from 'react';

// Modern Button Component
export function Button({ 
  variant = 'primary', 
  size = 'md',
  className = '', 
  disabled = false,
  loading = false,
  as = 'button',
  children,
  ...props 
}) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const Component = as;
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  if (as === 'a') {
    return (
      <Component
        className={classes}
        {...props}
      >
        {loading && <span className="spinner w-4 h-4" />}
        {children}
      </Component>
    );
  }

  return (
    <Component
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="spinner w-4 h-4" />}
      {children}
    </Component>
  );
}

// Modern Input Component
export const Input = React.forwardRef(function Input({ 
  className = '', 
  error = false,
  ...props 
}, ref) {
  const baseClasses = 'w-full px-3 py-2 border rounded-lg transition-colors duration-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500';
  const errorClasses = error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300';
  
  return (
    <input
      ref={ref}
      className={`${baseClasses} ${errorClasses} ${className}`}
      {...props}
    />
  );
});

// Modern Textarea Component
export function Textarea({ 
  className = '', 
  error = false,
  ...props 
}) {
  const baseClasses = 'w-full px-3 py-2 border rounded-lg transition-colors duration-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical';
  const errorClasses = error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300';
  
  return (
    <textarea
      className={`${baseClasses} ${errorClasses} ${className}`}
      {...props}
    />
  );
}

// Modern Card Component
export function Card({ className = '', children, ...props }) {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

// Modern Section Component
export function Section({ title, subtitle, children, className = '' }) {
  return (
    <section className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${className}`}>
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          {title && <h2 className="text-xl font-semibold text-gray-900">{title}</h2>}
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </section>
  );
}

// Badge Component
export function Badge({ variant = 'default', className = '', children }) {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    red: 'bg-red-100 text-red-800',
    purple: 'bg-purple-100 text-purple-800'
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

// Loading Spinner Component
export function Spinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };
  
  return (
    <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizes[size]} ${className}`} />
  );
}
