
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

  const handleSkillsChange = (id: string, value: string) => {
    // Allow normal typing including commas and spaces
    // Split by comma for processing, but preserve the raw input
    const skillsArray = value
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0);
    
    updateTechnicalSkill(id, 'skills', skillsArray);
  };

  const categoryOptions = [
    'Programming Languages',
    'Web Development',
    'Databases',
    'Tools & Platforms',
    'Cloud Technologies',
    'Mobile Development',
    'DevOps',
    'Machine Learning',
    'Data Science',
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
              Skills (separate with commas)
            </label>
            <textarea
              value={skillCategory.skills.join(', ')}
              onChange={(e) => handleSkillsChange(skillCategory.id, e.target.value)}
              onKeyDown={(e) => {
                // Allow all key presses including comma and space
                e.stopPropagation();
              }}
              rows={4}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
              placeholder="Java, Python, JavaScript, React, Node.js, Spring Boot"
              style={{ minHeight: '80px' }}
            />
            <p className="text-xs text-gray-500 mt-1">
              Type skills separated by commas. Press comma and space to separate skills clearly.
            </p>
            {skillCategory.skills.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {skillCategory.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full border"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
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
