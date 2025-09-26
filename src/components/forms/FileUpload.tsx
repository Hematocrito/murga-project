import React, { useRef } from 'react';
import { Upload, X, FileText, Download, Image as ImageIcon } from 'lucide-react';

interface FileAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  data: string; // base64 data
}

interface ExistingFile {
  id: string;
  name: string;
  type: string;
  url: string;
  size?: number | null;
  isExisting: true;
}

type DisplayFile = FileAttachment | ExistingFile;

interface FileUploadProps {
  files: FileAttachment[];
  onChange: (files: FileAttachment[]) => void;
  maxFiles?: number;
  archs?: string[]; // existing files from the server
  onRemoveExisting?: (fileUrl: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ files, onChange, maxFiles = 3, archs, onRemoveExisting }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes?: number | null): string => {
    if (typeof bytes !== 'number' || Number.isNaN(bytes) || bytes < 0) {
      return 'Size unavailable';
    }
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const isExistingFile = (file: DisplayFile): file is ExistingFile =>
    (file as ExistingFile).isExisting === true;

  const getNameFromSource = (source: string, index: number): string => {
    try {
      const sanitized = decodeURIComponent(source);
      const segment = sanitized.split('/').pop() || '';
      const cleanSegment = segment.split('?')[0];
      return cleanSegment || `Archivo ${index + 1}`;
    } catch {
      return `Archivo ${index + 1}`;
    }
  };

  const getMimeFromName = (name: string): string => {
    const extension = name.split('.').pop()?.toLowerCase();
    if (extension === 'pdf') return 'application/pdf';
    if (extension === 'doc') return 'application/msword';
    if (extension === 'docx') {
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    }
    if (extension === 'jpg' || extension === 'jpeg') return 'image/jpeg';
    if (extension === 'png') return 'image/png';
    return 'application/octet-stream';
  };

  const existingFiles: ExistingFile[] = (archs ?? [])
    .filter((value): value is string => typeof value === 'string' && value.trim().length > 0)
    .map((value, index) => {
      const name = getNameFromSource(value, index);
      return {
        id: `existing-${index}`,
        name,
        type: getMimeFromName(name),
        url: value,
        isExisting: true,
      };
    });

  const displayFiles: DisplayFile[] = [...existingFiles, ...files];
  const totalFiles = displayFiles.length;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const remainingSlots = maxFiles - existingFiles.length - files.length;

    if (remainingSlots <= 0) {
      alert(`You can only upload up to ${maxFiles} files`);
      return;
    }

    if (selectedFiles.length > remainingSlots) {
      alert(`You can only upload ${remainingSlots} more file${remainingSlots > 1 ? 's' : ''}`);
      return;
    }

    let uploadedFiles = files;

    selectedFiles.forEach(file => {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/png'
      ];

      if (!allowedTypes.includes(file.type)) {
        alert('Solo se permiten archivos PDF, Word o imagenes JPG/PNG');
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const newFile: FileAttachment = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
          data: reader.result as string
        };

        uploadedFiles = [...uploadedFiles, newFile];
        onChange(uploadedFiles);
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveFile = (fileId: string) => {
    onChange(files.filter(file => file.id !== fileId));
  };

  const handleDownloadFile = (file: DisplayFile) => {
    const link = document.createElement('a');
    if (isExistingFile(file)) {
      link.href = file.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    } else {
      link.href = file.data;
    }
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getFileIcon = (type: string) => {
    if (type === 'application/pdf') {
      return <FileText className="w-5 h-5 text-red-500" />;
    }
    if (type.startsWith('image/')) {
      return <ImageIcon className="w-5 h-5 text-green-500" />;
    }
    return <FileText className="w-5 h-5 text-blue-500" />;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Archivos ({totalFiles}/{maxFiles})
        </label>
        {totalFiles < maxFiles && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Upload className="w-4 h-4 mr-2" />
            Subir Archivo
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />

      {totalFiles === 0 ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-1 text-center">
          <Upload className="mx-auto h-8 w-12 text-gray-400" />
          <div className="mt-2">
            <p className="text-sm text-gray-600">No hay archivos</p>            
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {displayFiles.map((file) => {
            const existing = isExistingFile(file);
            const existingFile = existing ? file : null;

            return (
              <div
                key={file.id}
                className="flex h-full items-start justify-between gap-2 p-2 bg-gray-50 rounded-lg border"
              >
                <div className="flex w-full items-start space-x-3 overflow-hidden">
                  {getFileIcon(file.type)}
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <p className="truncate text-sm font-medium text-gray-900" title={file.name}>{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {existing ? 'Guardado' : formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-shrink-0 items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => handleDownloadFile(file)}
                    className="p-1 text-gray-400 hover:text-blue-500"
                    title="Download file"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  {existing ? (
                    onRemoveExisting && existingFile && (
                      <button
                        type="button"
                        onClick={() => onRemoveExisting(existingFile.url)}
                        className="p-1 text-gray-400 hover:text-red-500"
                        title="Remove file"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(file.id)}
                      className="p-1 text-gray-400 hover:text-red-500"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p className="text-xs text-gray-500">
        Formatos soportados: PDF, DOC, DOCX, JPG, JPEG, PNG. Máximo tamaño de archivo: 10MB cada uno.
      </p>
    </div>
  );
};

export default FileUpload;

