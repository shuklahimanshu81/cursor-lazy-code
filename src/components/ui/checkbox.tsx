interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Checkbox({ label, className = '', ...props }: CheckboxProps) {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        {...props}
        className={`checkbox ${className}`}
      />
      {label && (
        <label htmlFor={props.id} className="text-sm font-medium">
          {label}
        </label>
      )}
    </div>
  );
} 