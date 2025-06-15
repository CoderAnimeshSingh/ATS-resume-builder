
import React from 'react';
import { useResume, Education } from '../../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

const EducationForm = () => {
  const { state, dispatch } = useResume();
  const { education } = state.resume;

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      graduationDate: ''
    };
    dispatch({ type: 'ADD_EDUCATION', payload: newEducation });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    dispatch({
      type: 'UPDATE_EDUCATION',
      payload: { id, data: { [field]: value } }
    });
  };

  const deleteEducation = (id: string) => {
    dispatch({ type: 'DELETE_EDUCATION', payload: id });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">Education</h3>
        <button
          onClick={addEducation}
          className="flex items-center space-x-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education</span>
        </button>
      </div>

      {education.map((edu) => (
        <div key={edu.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
          <div className="flex justify-between items-start">
            <h4 className="text-sm font-medium text-gray-700">Education Entry</h4>
            <button
              onClick={() => deleteEducation(edu.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Institution
              </label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="University Name"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Degree
              </label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Bachelor's, Master's, etc."
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Field of Study
              </label>
              <input
                type="text"
                value={edu.field}
                onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Computer Science, Business, etc."
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Graduation Date
              </label>
              <input
                type="month"
                value={edu.graduationDate}
                onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      ))}

      {education.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">No education added yet.</p>
          <button
            onClick={addEducation}
            className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
          >
            Add your first education
          </button>
        </div>
      )}
    </div>
  );
};

export default EducationForm;
