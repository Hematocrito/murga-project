import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle, MoreVertical } from 'lucide-react';
import DeleteConfirmationModal from './DeleteConfirmationModal';

interface ThreeDotsMenuProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

const ThreeDotsMenu: React.FC<ThreeDotsMenuProps> = ({ onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDelete = () => {
    setIsOpen(false);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (onDelete) {
      await onDelete();
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    }
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-4" />
          <h2 className="text-base font-bold mb-4">Acción completada</h2>
          <p className="text-gray-600">
            El cliente ya no está en la base de datos. Todo listo!
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
      >
        <MoreVertical className="w-5 h-5 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute right-full mr-1 top-0 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-10">
          <ul className="py-1">
            {onEdit && (
              <li>
                <button
                  onClick={() => {
                    onEdit();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Editar
                </button>
              </li>
            )}
            {onDelete && (
              <li>
                <button
                    onClick={handleDelete}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                  >
                    Eliminar
                  </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
    <DeleteConfirmationModal
      isOpen={showDeleteModal}
      onClose={() => setShowDeleteModal(false)}
      onConfirm={handleConfirmDelete}
      title="Eliminar Cliente"
      message="¿Estás seguro eliminar este cliente? Esta acción no se puede deshacer."
    />
  </>
  );
};

export default ThreeDotsMenu;