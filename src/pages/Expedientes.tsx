import React from 'react';
import { FilePlus, Search } from 'lucide-react';

const Expedientes = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Expedientes</h1>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <FilePlus size={20} />
          <span>Nuevo Expediente</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Buscar expedientes..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Número
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">2024-001</td>
                <td className="px-6 py-4 whitespace-nowrap">Juan Pérez</td>
                <td className="px-6 py-4 whitespace-nowrap">Civil</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Activo
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">01/03/2024</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-800">Ver detalles</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Expedientes;