
import React from 'react';
import { useResume, Skill } from '../../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

const SkillsForm = () => {
  const { state, dispatch } = useResume();
  const { skills } = state.resume;

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 'intermediate'
    };
    dispatch({ type: 'ADD_SKILL', payload: newSkill });
  };

  const updateSkill = (id: string, field: string, value: string) => {
    dispatch({
      type: 'UPDATE_SKILL',
      payload: { id, data: { [field]: value } }
    });
  };

  const deleteSkill = (id: string) => {
    dispatch({ type: 'DELETE_SKILL', payload: id });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">Skills</h3>
        <button
          onClick={addSkill}
          className="flex items-center space-x-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      <div className="grid gap-3">
        {skills.map((skill) => (
          <div key={skill.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
            <input
              type="text"
              value={skill.name}
              onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
              className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Skill name (e.g., JavaScript, Design, etc.)"
            />
            
            <select
              value={skill.level}
              onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
              className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>

            <button
              onClick={() => deleteSkill(skill.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {skills.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">No skills added yet.</p>
          <button
            onClick={addSkill}
            className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
          >
            Add your first skill
          </button>
        </div>
      )}
    </div>
  );
};

export default SkillsForm;
