interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`input ${error ? 'border-red-500' : ''} ${className}`}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
} 