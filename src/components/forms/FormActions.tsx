import React from 'react';
import { useNavigate } from 'react-router-dom';

interface FormActionsProps {
  cancelPath: string;
  submitText: string;
}

const FormActions: React.FC<FormActionsProps> = ({ cancelPath, submitText }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-end space-x-4">
      <button
        type="button"
        onClick={() => navigate(cancelPath)}
        className="px-4 py-2 border rounded-lg hover:bg-gray-50"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        {submitText}
      </button>
    </div>
  );
};

export default FormActions;