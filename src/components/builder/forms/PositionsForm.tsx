
import React from 'react';
import { useResume, Position } from '../../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

const PositionsForm = () => {
  const { state, dispatch } = useResume();
  const { positions } = state.resume;

  const addPosition = () => {
    const newPosition: Position = {
      id: Date.now().toString(),
      title: '',
      organization: '',
      description: ''
    };
    dispatch({ type: 'ADD_POSITION', payload: newPosition });
  };

  const updatePosition = (id: string, field: string, value: string) => {
    dispatch({
      type: 'UPDATE_POSITION',
      payload: { id, data: { [field]: value } }
    });
  };

  const deletePosition = (id: string) => {
    dispatch({ type: 'DELETE_POSITION', payload: id });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">Positions of Responsibility</h3>
        <button
          onClick={addPosition}
          className="flex items-center space-x-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
        >
          <Plus className="w-4 h-4" />
          <span>Add Position</span>
        </button>
      </div>

      {positions.map((position) => (
        <div key={position.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
          <div className="flex justify-between items-start">
            <h4 className="text-sm font-medium text-gray-700">Position Entry</h4>
            <button
              onClick={() => deletePosition(position.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Position Title
              </label>
              <input
                type="text"
                value={position.title}
                onChange={(e) => updatePosition(position.id, 'title', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Founder, TechVerse Nexus"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Organization/Context
              </label>
              <input
                type="text"
                value={position.organization}
                onChange={(e) => updatePosition(position.id, 'organization', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Student Organization, College"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Description & Achievements
            </label>
            <textarea
              value={position.description}
              onChange={(e) => updatePosition(position.id, 'description', e.target.value)}
              rows={3}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Mentored 1K+ students; curated tech opportunities & fostering a collaborative learning community."
            />
          </div>
        </div>
      ))}

      {positions.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">No positions added yet.</p>
          <button
            onClick={addPosition}
            className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
          >
            Add your first position
          </button>
        </div>
      )}
    </div>
  );
};

export default PositionsForm;
