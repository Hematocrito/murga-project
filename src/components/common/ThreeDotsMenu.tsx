import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';
import DeleteConfirmationModal from './DeleteConfirmationModal';

interface ThreeDotsMenuProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

const ThreeDotsMenu: React.FC<ThreeDotsMenuProps> = ({ onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
                  Edit
                </button>
              </li>
            )}
            {onDelete && (
              <li>
                <button
                    onClick={handleDelete}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                  >
                    Delete
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
      onConfirm={onDelete || (() => {})}
      title="Delete Client"
      message="Are you sure you want to delete this client? This action cannot be undone."
    />
  </>
  );
};

export default ThreeDotsMenu;