
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useResume } from '../../context/ResumeContext';
import PersonalInfoForm from './forms/PersonalInfoForm';
import SocialLinksForm from './forms/SocialLinksForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
import TechnicalSkillsForm from './forms/TechnicalSkillsForm';
import ProjectsForm from './forms/ProjectsForm';
import PositionsForm from './forms/PositionsForm';
import CertificationsForm from './forms/CertificationsForm';
import TemplateSelector from './TemplateSelector';
import ResumeValidator from './ResumeValidator';
import ResumePreview from '../preview/ResumePreview';
import ExportButton from './ExportButton';
import ThemeToggle from './ThemeToggle';
import { GripVertical, FileText, User, Briefcase, GraduationCap, Award, Palette, Link, Code, FolderOpen, Users, Star, CheckSquare } from 'lucide-react';

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
      case 'links': return <Link className="w-4 h-4" />;
      case 'experience': return <Briefcase className="w-4 h-4" />;
      case 'education': return <GraduationCap className="w-4 h-4" />;
      case 'skills': return <Star className="w-4 h-4" />;
      case 'technicalSkills': return <Code className="w-4 h-4" />;
      case 'projects': return <FolderOpen className="w-4 h-4" />;
      case 'positions': return <Users className="w-4 h-4" />;
      case 'certifications': return <Award className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const renderSectionForm = (sectionType: string) => {
    switch (sectionType) {
      case 'personal':
        return <PersonalInfoForm />;
      case 'links':
        return <SocialLinksForm />;
      case 'experience':
        return <ExperienceForm />;
      case 'education':
        return <EducationForm />;
      case 'skills':
        return <SkillsForm />;
      case 'technicalSkills':
        return <TechnicalSkillsForm />;
      case 'projects':
        return <ProjectsForm />;
      case 'positions':
        return <PositionsForm />;
      case 'certifications':
        return <CertificationsForm />;
      case 'templates':
        return <TemplateSelector />;
      case 'validator':
        return <ResumeValidator />;
      default:
        return null;
    }
  };

  const allSections = [
    ...state.resume.sections,
    { id: 'templates', type: 'templates' as const, title: 'Templates', isVisible: true },
    { id: 'validator', type: 'validator' as const, title: 'Resume Score', isVisible: true }
  ];

  return (
    <div className={`min-h-screen ${state.resume.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <header className={`border-b px-6 py-4 ${state.resume.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className={`w-8 h-8 ${state.resume.theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
            <div>
              <h1 className={`text-2xl font-bold ${state.resume.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Resume Builder Pro
              </h1>
              <p className={`text-sm ${state.resume.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Create ATS-friendly professional resumes
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <ExportButton />
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-100px)]">
        {/* Left Sidebar - Builder */}
        <div className={`w-1/2 border-r overflow-y-auto ${state.resume.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="p-6">
            <h2 className={`text-lg font-semibold mb-4 ${state.resume.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Resume Sections
            </h2>
            
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="sections">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                    {allSections.map((section, index) => (
                      <Draggable 
                        key={section.id} 
                        draggableId={section.id} 
                        index={index}
                        isDragDisabled={section.type === 'templates' || section.type === 'validator'}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`border rounded-lg overflow-hidden transition-all duration-200 ${
                              snapshot.isDragging 
                                ? `shadow-lg transform rotate-2 ${state.resume.theme === 'dark' ? 'bg-gray-700 border-blue-400' : 'bg-blue-50 border-blue-300'}` 
                                : `${state.resume.theme === 'dark' ? 'bg-gray-800 border-gray-600 hover:border-gray-500' : 'bg-white border-gray-200 hover:border-gray-300'}`
                            } ${
                              state.activeSection === section.id 
                                ? `ring-2 ${state.resume.theme === 'dark' ? 'ring-blue-400 border-blue-400' : 'ring-blue-500 border-blue-500'}` 
                                : ''
                            }`}
                          >
                            <div
                              {...(section.type !== 'templates' && section.type !== 'validator' ? provided.dragHandleProps : {})}
                              className={`flex items-center justify-between p-4 cursor-pointer ${state.resume.theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                              onClick={() => dispatch({ type: 'SET_ACTIVE_SECTION', payload: section.id })}
                            >
                              <div className="flex items-center space-x-3">
                                {section.type === 'templates' ? (
                                  <Palette className="w-4 h-4" />
                                ) : section.type === 'validator' ? (
                                  <CheckSquare className="w-4 h-4" />
                                ) : (
                                  getSectionIcon(section.type)
                                )}
                                <span className={`font-medium ${state.resume.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                  {section.title}
                                </span>
                              </div>
                              {section.type !== 'templates' && section.type !== 'validator' && (
                                <GripVertical className={`w-5 h-5 ${state.resume.theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
                              )}
                            </div>
                            
                            {state.activeSection === section.id && (
                              <div className={`border-t p-4 ${state.resume.theme === 'dark' ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'}`}>
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
        <div className={`w-1/2 overflow-y-auto ${state.resume.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-semibold ${state.resume.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Live Preview
              </h2>
              <div className="text-xs text-gray-500 bg-green-100 px-2 py-1 rounded">
                A4 Format • ATS Optimized
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <ResumePreview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
