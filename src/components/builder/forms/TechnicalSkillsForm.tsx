
import React from 'react';
import { useResume, TechnicalSkill } from '../../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

const TechnicalSkillsForm = () => {
  const { state, dispatch } = useResume();
  const { technicalSkills } = state.resume;

  const addTechnicalSkill = () => {
    const newSkill: TechnicalSkill = {
      id: Date.now().toString(),
      category: 'Programming Languages',
      skills: []
    };
    dispatch({ type: 'ADD_TECHNICAL_SKILL', payload: newSkill });
  };

  const updateTechnicalSkill = (id: string, field: string, value: string | string[]) => {
    dispatch({
      type: 'UPDATE_TECHNICAL_SKILL',
      payload: { id, data: { [field]: value } }
    });
  };

  const deleteTechnicalSkill = (id: string) => {
    dispatch({ type: 'DELETE_TECHNICAL_SKILL', payload: id });
  };

  const categoryOptions = [
    'Programming Languages',
    'Web Development',
    'Databases',
    'Tools & Platforms',
    'Others'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">Technical Skills</h3>
        <button
          onClick={addTechnicalSkill}
          className="flex items-center space-x-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      {technicalSkills.map((skillCategory) => (
        <div key={skillCategory.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
          <div className="flex justify-between items-start">
            <h4 className="text-sm font-medium text-gray-700">Skill Category</h4>
            <button
              onClick={() => deleteTechnicalSkill(skillCategory.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Category
            </label>
            <select
              value={skillCategory.category}
              onChange={(e) => updateTechnicalSkill(skillCategory.id, 'category', e.target.value)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Skills (comma-separated)
            </label>
            <textarea
              value={skillCategory.skills.join(', ')}
              onChange={(e) => {
                const skillsArray = e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);
                updateTechnicalSkill(skillCategory.id, 'skills', skillsArray);
              }}
              rows={2}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Java, Python, JavaScript, React"
            />
          </div>
        </div>
      ))}

      {technicalSkills.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">No technical skills added yet.</p>
          <button
            onClick={addTechnicalSkill}
            className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
          >
            Add your first skill category
          </button>
        </div>
      )}
    </div>
  );
};

export default TechnicalSkillsForm;
