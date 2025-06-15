
import React from 'react';
import { useResume, Project } from '../../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

const ProjectsForm = () => {
  const { state, dispatch } = useResume();
  const { projects } = state.resume;

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: '',
      description: '',
      technologies: '',
      highlights: []
    };
    dispatch({ type: 'ADD_PROJECT', payload: newProject });
  };

  const updateProject = (id: string, field: string, value: string | string[]) => {
    dispatch({
      type: 'UPDATE_PROJECT',
      payload: { id, data: { [field]: value } }
    });
  };

  const deleteProject = (id: string) => {
    dispatch({ type: 'DELETE_PROJECT', payload: id });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">Academic Projects</h3>
        <button
          onClick={addProject}
          className="flex items-center space-x-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {projects.map((project) => (
        <div key={project.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
          <div className="flex justify-between items-start">
            <h4 className="text-sm font-medium text-gray-700">Project Entry</h4>
            <button
              onClick={() => deleteProject(project.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Project Title
            </label>
            <input
              type="text"
              value={project.title}
              onChange={(e) => updateProject(project.id, 'title', e.target.value)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Student Management System"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Technologies Used
            </label>
            <input
              type="text"
              value={project.technologies}
              onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Java, MySQL, CSS"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Project Description
            </label>
            <textarea
              value={project.description}
              onChange={(e) => updateProject(project.id, 'description', e.target.value)}
              rows={2}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Brief description of the project..."
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Key Highlights (one per line)
            </label>
            <textarea
              value={project.highlights.join('\n')}
              onChange={(e) => {
                const highlightsArray = e.target.value.split('\n').filter(highlight => highlight.trim().length > 0);
                updateProject(project.id, 'highlights', highlightsArray);
              }}
              rows={3}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="• Developed a console-based CRUD application&#10;• Implemented file handling and object-oriented design principles"
            />
          </div>
        </div>
      ))}

      {projects.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">No projects added yet.</p>
          <button
            onClick={addProject}
            className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
          >
            Add your first project
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectsForm;
