
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useResume } from '../../context/ResumeContext';
import PersonalInfoForm from './forms/PersonalInfoForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
import ResumePreview from '../preview/ResumePreview';
import { GripVertical, FileText, User, Briefcase, GraduationCap, Award } from 'lucide-react';

const ResumeBuilder = () => {
  const { state, dispatch } = useResume();

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(state.resume.sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch({ type: 'REORDER_SECTIONS', payload: items });
  };

  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'personal': return <User className="w-4 h-4" />;
      case 'experience': return <Briefcase className="w-4 h-4" />;
      case 'education': return <GraduationCap className="w-4 h-4" />;
      case 'skills': return <Award className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const renderSectionForm = (sectionType: string) => {
    switch (sectionType) {
      case 'personal':
        return <PersonalInfoForm />;
      case 'experience':
        return <ExperienceForm />;
      case 'education':
        return <EducationForm />;
      case 'skills':
        return <SkillsForm />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Export PDF
          </button>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - Builder */}
        <div className="w-1/2 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Resume Sections</h2>
            
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="sections">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                    {state.resume.sections.map((section, index) => (
                      <Draggable key={section.id} draggableId={section.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`border rounded-lg overflow-hidden transition-all duration-200 ${
                              snapshot.isDragging 
                                ? 'shadow-lg bg-blue-50 border-blue-300 transform rotate-2' 
                                : 'bg-white border-gray-200 hover:border-gray-300'
                            } ${
                              state.activeSection === section.id 
                                ? 'ring-2 ring-blue-500 border-blue-500' 
                                : ''
                            }`}
                          >
                            <div
                              {...provided.dragHandleProps}
                              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                              onClick={() => dispatch({ type: 'SET_ACTIVE_SECTION', payload: section.id })}
                            >
                              <div className="flex items-center space-x-3">
                                {getSectionIcon(section.type)}
                                <span className="font-medium text-gray-900">{section.title}</span>
                              </div>
                              <GripVertical className="w-5 h-5 text-gray-400" />
                            </div>
                            
                            {state.activeSection === section.id && (
                              <div className="border-t border-gray-200 p-4 bg-gray-50">
                                {renderSectionForm(section.type)}
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>

        {/* Right Side - Preview */}
        <div className="w-1/2 bg-gray-100 overflow-y-auto">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h2>
            <div className="bg-white rounded-lg shadow-lg">
              <ResumePreview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
