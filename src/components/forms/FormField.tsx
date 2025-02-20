interface FormFieldProps {
  label: React.ReactNode;
  type?: string;
  required?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type = 'text',
  required = false,
  className = '',
  children,
}) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      {children || (
        <input
          type={type}
          required={required}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      )}
    </div>
  );
};

export default FormField;