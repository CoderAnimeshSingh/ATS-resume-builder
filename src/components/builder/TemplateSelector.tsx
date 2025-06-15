
import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Check } from 'lucide-react';

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design',
    preview: '/templates/modern-preview.png'
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional professional layout',
    preview: '/templates/classic-preview.png'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold and artistic design',
    preview: '/templates/creative-preview.png'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant',
    preview: '/templates/minimal-preview.png'
  }
];

const TemplateSelector = () => {
  const { state, dispatch } = useResume();

  const selectTemplate = (templateId: string) => {
    dispatch({ type: 'SET_TEMPLATE', payload: templateId });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Choose Template</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`relative border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              state.resume.template === template.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => selectTemplate(template.id)}
          >
            <div className="p-4">
              <div className="aspect-[3/4] bg-gray-100 rounded mb-3 flex items-center justify-center">
                <span className="text-gray-500 text-sm">{template.name} Preview</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{template.name}</h4>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </div>
                
                {state.resume.template === template.id && (
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
