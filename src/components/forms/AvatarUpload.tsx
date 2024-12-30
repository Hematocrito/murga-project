import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';

interface AvatarUploadProps {
  onChange: (file: File | null) => void;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ onChange }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log('ARCHIVE ', file);
    if (file) {
      onChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Avatar
      </label>
      <div className="relative">
        {preview ? (
          <>
            <img
              src={preview}
              alt="Avatar preview"
              className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
            <Upload className="w-8 h-8 text-gray-400" />
          </div>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="avatar-upload"
      />
      {!preview && (
        <label
          htmlFor="avatar-upload"
          className="mt-2 cursor-pointer text-sm text-blue-600 hover:text-blue-700"
        >
          Subir Foto
        </label>
      )}
    </div>
  );
};

export default AvatarUpload;