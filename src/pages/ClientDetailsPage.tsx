//import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  User,
  Globe,
  AlertCircle,
  CreditCard,
  Pencil,
  Download,
  FileText,
  Image as ImageIcon
} from 'lucide-react';
import { useClientDetails } from '../hooks/useClientDetails';
import { useAdminClientDetails } from '../hooks/useAdminClientDetails';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ClientStatusBadge from '../components/clients/ClientStatusBadge';
import { CLIENT_STATUS, CLIENT_STATUS_LABELS } from '../constants/clientStatus';

interface AttachmentItem {
  id: string;
  name: string;
  type: string;
  url: string;
}

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
  if (extension === 'pdf') {
    return 'application/pdf';
  }
  if (extension === 'doc') {
    return 'application/msword';
  }
  if (extension === 'docx') {
    return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  }
  if (extension === 'jpg' || extension === 'jpeg') {
    return 'image/jpeg';
  }
  if (extension === 'png') {
    return 'image/png';
  }
  return 'application/octet-stream';
};

const getAttachmentLabel = (type: string): string => {
  if (type === 'application/pdf') {
    return 'Documento PDF';
  }
  if (type === 'application/msword' || type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return 'Documento Word';
  }
  if (type.startsWith('image/')) {
    return 'Imagen';
  }
  return 'Archivo';
};

const getFileIcon = (type: string) => {
  if (type === 'application/pdf') {
    return <FileText className="w-8 h-8 text-red-500" />;
  }
  if (type.startsWith('image/')) {
    return <ImageIcon className="w-8 h-8 text-green-500" />;
  }
  return <FileText className="w-8 h-8 text-blue-500" />;
};

const createAttachmentItems = (sources?: Array<string>): AttachmentItem[] =>
  Array.isArray(sources)
    ? sources
        .filter((value): value is string => typeof value === 'string' && value.trim().length > 0)
        .map((value, index) => {
          const name = getNameFromSource(value, index);
          return {
            id: `attachment-${index}`,
            name,
            type: getMimeFromName(name),
            url: value
          };
        })
    : [];

const STATUS_LABEL_MAP = CLIENT_STATUS_LABELS as Record<string, string>;
const STATUS_VALUES = Object.values(CLIENT_STATUS) as string[];
const FALLBACK_STATUS = CLIENT_STATUS.PENDIENTE;

const getStatusLabel = (status?: string): string => {
  if (!status) {
    return STATUS_LABEL_MAP[FALLBACK_STATUS];
  }

  const normalizedStatus = status.toLowerCase();
  const matchedStatus = STATUS_VALUES.find((value) => value === normalizedStatus);

  if (matchedStatus) {
    return STATUS_LABEL_MAP[matchedStatus];
  }

  return status;
};

const ClientDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  // Use the appropriate hook based on user role
  const {
    client,
    loading,
    error
  } = isAdmin ? useAdminClientDetails(id!) : useClientDetails(id!);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !client) {
    return (
      <div className="bg-red-50 text-red-500 p-4 rounded-lg flex items-center">
        <AlertCircle className="w-5 h-5 mr-2" />
        {error?.message || 'Cliente no encontrado'}
      </div>
    );
  }

  const attachments = createAttachmentItems(client.archivos);
  const statusLabel = getStatusLabel(client.estado);

  const handleDownloadFile = (attachment: AttachmentItem) => {
    const link = document.createElement('a');
    link.href = attachment.url;
    link.download = attachment.name;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(isAdmin ? '/admin' : '/clientes')}
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver a {isAdmin ? 'Panel de Administración' : 'Clientes'}
        </button>
        <button
          onClick={() => navigate(`/clientes/${id}/editar`)}
          className="inline-flex items-center px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Pencil className="w-5 h-5 mr-2" />
          Editar Cliente
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        {/* Header Section */}
        <div className="p-6 border-b">
          <div className="flex items-center space-x-4">
            {client.avatar ? (
              <img
                src={client.avatar}
                alt={`${client.nombre} ${client.apellido}`}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-8 h-8 text-gray-400" />
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold">
                {client.nombre} {client.apellido}
              </h1>
              <div className="flex items-center mt-2 space-x-3">
                {client.estado &&
                  <ClientStatusBadge status={client.estado} />
                }
                <span className="text-black">{client.empresa}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold mb-4">Información de Contacto</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <Mail className="w-5 h-5 mr-3" />
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <a
                    href={`mailto:${client.email}`}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    {client.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="w-5 h-5 mr-3" />
                <div>
                  <div className="text-sm text-gray-500">Teléfono</div>
                  <a
                    href={`tel:${client.telefono}`}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    {client.telefono}
                  </a>
                </div>
              </div>
              <div className="flex items-center text-gray-600">
                <CreditCard className="w-5 h-5 mr-3" />
                <div>
                  <div className="text-sm text-gray-500">DNI</div>
                  <div className='text-black'>{client.dni || 'Dato inexistente'}</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <Building2 className="w-5 h-5 mr-3" />
                <div>
                  <div className="text-sm text-gray-500">Empresa</div>
                  <div className='text-black'>{client.empresa}</div>
                </div>
              </div>
              <div className="flex items-center text-gray-600">
                <Globe className="w-5 h-5 mr-3" />
                <div>
                  <div className="text-sm text-gray-500">Estado</div>
                  <div className='text-black'>{statusLabel}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Attachments Section */}
        <div className="p-6 border-t">
          <h2 className="text-lg font-semibold mb-4">Adjuntos</h2>

          {attachments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {attachments.map((attachment) => (
                <div key={attachment.id} className="flex h-full flex-col justify-between p-1 bg-gray-50 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {getFileIcon(attachment.type)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate" title={attachment.name}>
                        {attachment.name}
                      </p>
                      <p className="text-xs text-gray-500">{getAttachmentLabel(attachment.type)}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDownloadFile(attachment)}
                    className="mt-3 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 self-start"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Descargar
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No hay archivos adjuntos</p>
            </div>
          )}
        </div>

        {/* Notes Section */}
        {client.notas && (
          <div className="p-6 border-t">
            <h2 className="text-lg font-semibold mb-4">Notas</h2>
            <div
              className="prose max-w-none bg-gray-50 p-4 rounded-lg text-justify"
              dangerouslySetInnerHTML={{ __html: client.notas }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientDetailsPage;
