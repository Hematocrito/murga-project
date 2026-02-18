import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Calendar, Plus, Clock, MapPin, User, Edit, Trash2 } from 'lucide-react';
import Modal from '../components/common/Modal';
import DeleteConfirmationModal from '../components/common/DeleteConfirmationModal';
import { CREAR_EVENTO_AGENDA } from '../graphql/mutations/agenda';
import { OBTENER_EVENTOS_AGENDA } from '../graphql/queries/agenda';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  client?: string;
  type: 'meeting' | 'call' | 'deadline' | 'other';
}

const AgendaPage = () => {
  const [events, setEvents] = useState<Event[]>([]);

  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [deleteEventId, setDeleteEventId] = useState<string | null>(null);
  const getLocalDateString = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [selectedDate, setSelectedDate] = useState(getLocalDateString());
  const [crearEventoAgenda] = useMutation(CREAR_EVENTO_AGENDA);
  const { data, refetch } = useQuery(OBTENER_EVENTOS_AGENDA, {
    variables: { fecha: selectedDate },
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    if (data?.obtenerEventosAgenda) {
      setEvents(data.obtenerEventosAgenda);
    }
  }, [data]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: getLocalDateString(),
    time: '',
    location: '',
    client: '',
    type: 'meeting' as Event['type']
  });

  const eventTypes = {
    meeting: { label: 'Reunión', color: 'bg-blue-100 text-blue-800' },
    call: { label: 'Llamada', color: 'bg-green-100 text-green-800' },
    deadline: { label: 'Vencimiento', color: 'bg-red-100 text-red-800' },
    other: { label: 'Otro', color: 'bg-gray-100 text-gray-800' }
  };

  const handleOpenModal = (event?: Event) => {
    if (event) {
      setEditingEvent(event);
      setFormData({
        title: event.title,
        description: event.description,
        date: event.date,
        time: event.time,
        location: event.location,
        client: event.client || '',
        type: event.type
      });
    } else {
      setEditingEvent(null);
      setFormData({
        title: '',
        description: '',
        date: selectedDate,
        time: '',
        location: '',
        client: '',
        type: 'meeting'
      });
    }
    setShowEventModal(true);
  };

  const handleCloseModal = () => {
    setShowEventModal(false);
    setEditingEvent(null);
    setFormData({
      title: '',
      description: '',
      date: getLocalDateString(),
      time: '',
      location: '',
      client: '',
      type: 'meeting'
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingEvent) {
      setEvents(events.map(event => 
        event.id === editingEvent.id 
          ? { ...formData, id: editingEvent.id, client: formData.client || undefined }
          : event
      ));
    } else {
      try {
        await crearEventoAgenda({
          variables: {
            input: {
              ...formData,
              client: formData.client || undefined
            }
          }
        });

        const newEvent: Event = {
          ...formData,
          id: Date.now().toString(),
          client: formData.client || undefined
        };
        setEvents([...events, newEvent]);
        await refetch({ fecha: selectedDate });
      } catch (error) {
        console.error('Error creando evento:', error);
        return;
      }
    }
    
    handleCloseModal();
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
    setDeleteEventId(null);
  };

  const filteredEvents = events.filter(event => event.date === selectedDate);
  const sortedEvents = filteredEvents.sort((a, b) => a.time.localeCompare(b.time));

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, (month || 1) - 1, day || 1);
    return date.toLocaleDateString('es-AR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('es-AR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Agenda</h1>
          <p className="text-gray-600 mt-1">Gestioná tus eventos y turnos</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nuevo evento
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Calendario
            </h2>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="mt-4">
              <h3 className="font-medium text-gray-700 mb-2">Tipos de evento</h3>
              <div className="space-y-2">
                {Object.entries(eventTypes).map(([type, config]) => (
                  <div key={type} className="flex items-center">
                    <span className={`px-2 py-1 text-xs rounded-full ${config.color}`}>
                      {config.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Events Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">
                Eventos del {formatDate(selectedDate)}
              </h2>
            </div>
            
            <div className="p-6">
              {sortedEvents.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No hay eventos para esta fecha</p>
                  <button
                    onClick={() => handleOpenModal()}
                    className="mt-2 text-blue-600 hover:text-blue-700"
                  >
                    Agendar un evento
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedEvents.map((event) => (
                    <div
                      key={event.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{event.title}</h3>
                            <span className={`px-2 py-1 text-xs rounded-full ${eventTypes[event.type].color}`}>
                              {eventTypes[event.type].label}
                            </span>
                          </div>
                          
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2" />
                              {formatTime(event.time)}
                            </div>
                            {event.location && (
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2" />
                                {event.location}
                              </div>
                            )}
                            {event.client && (
                              <div className="flex items-center">
                                <User className="w-4 h-4 mr-2" />
                                {event.client}
                              </div>
                            )}
                          </div>
                          
                          {event.description && (
                            <p className="mt-2 text-sm text-gray-700">{event.description}</p>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={() => handleOpenModal(event)}
                            className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteEventId(event.id)}
                            className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      <Modal isOpen={showEventModal} onClose={handleCloseModal}>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-6">
            {editingEvent ? 'Editar evento' : 'Nuevo evento'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hora *
                </label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as Event['type'] })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {Object.entries(eventTypes).map(([value, config]) => (
                    <option key={value} value={value}>
                      {config.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cliente
                </label>
                <input
                  type="text"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  placeholder="Opcional"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ubicación
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingEvent ? 'Actualizar evento' : 'Crear evento'}
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={!!deleteEventId}
        onClose={() => setDeleteEventId(null)}
        onConfirm={() => deleteEventId && handleDeleteEvent(deleteEventId)}
        title="Eliminar evento"
        message="¿Seguro que querés eliminar este evento? Esta acción no se puede deshacer."
      />
    </div>
  );
};

export default AgendaPage;
