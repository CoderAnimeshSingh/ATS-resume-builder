
import React from 'react';
import { useResume, Certification } from '../../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

const CertificationsForm = () => {
  const { state, dispatch } = useResume();
  const { certifications } = state.resume;

  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      title: '',
      provider: '',
      date: '',
      description: ''
    };
    dispatch({ type: 'ADD_CERTIFICATION', payload: newCert });
  };

  const updateCertification = (id: string, field: string, value: string) => {
    dispatch({
      type: 'UPDATE_CERTIFICATION',
      payload: { id, data: { [field]: value } }
    });
  };

  const deleteCertification = (id: string) => {
    dispatch({ type: 'DELETE_CERTIFICATION', payload: id });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">Certifications</h3>
        <button
          onClick={addCertification}
          className="flex items-center space-x-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
        >
          <Plus className="w-4 h-4" />
          <span>Add Certification</span>
        </button>
      </div>

      {certifications.map((cert) => (
        <div key={cert.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
          <div className="flex justify-between items-start">
            <h4 className="text-sm font-medium text-gray-700">Certification Entry</h4>
            <button
              onClick={() => deleteCertification(cert.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Title
              </label>
              <input
                type="text"
                value={cert.title}
                onChange={(e) => updateCertification(cert.id, 'title', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Certification Title"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Provider
              </label>
              <input
                type="text"
                value={cert.provider}
                onChange={(e) => updateCertification(cert.id, 'provider', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Issuing Organization"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Date
              </label>
              <input
                type="month"
                value={cert.date}
                onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Description
            </label>
            <textarea
              value={cert.description}
              onChange={(e) => updateCertification(cert.id, 'description', e.target.value)}
              rows={2}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Summary, highlights, credential link..."
            />
          </div>
        </div>
      ))}

      {certifications.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">No certifications added yet.</p>
          <button
            onClick={addCertification}
            className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
          >
            Add your first certification
          </button>
        </div>
      )}
    </div>
  );
};

export default CertificationsForm;
