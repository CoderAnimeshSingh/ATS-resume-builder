
import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Mail, Phone, MapPin, Calendar } from 'lucide-react';

const ResumePreview = () => {
  const { state } = useResume();
  const { resume } = state;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const getTemplateStyles = () => {
    switch (resume.template) {
      case 'classic':
        return {
          headerBg: 'bg-gray-100',
          primaryColor: 'text-gray-800',
          accentColor: 'text-gray-600',
          borderColor: 'border-gray-300'
        };
      case 'creative':
        return {
          headerBg: 'bg-gradient-to-r from-purple-600 to-blue-600',
          primaryColor: 'text-white',
          accentColor: 'text-purple-100',
          borderColor: 'border-purple-300'
        };
      case 'minimal':
        return {
          headerBg: 'bg-white',
          primaryColor: 'text-black',
          accentColor: 'text-gray-500',
          borderColor: 'border-gray-200'
        };
      default: // modern
        return {
          headerBg: 'bg-white',
          primaryColor: 'text-gray-900',
          accentColor: 'text-blue-600',
          borderColor: 'border-blue-200'
        };
    }
  };

  const styles = getTemplateStyles();

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white min-h-[11in]" id="resume-preview">
      {/* Header - Name and Contact Info */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">
          {resume.personalInfo.fullName || 'Your Full Name'}
        </h1>
        
        <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-700 mb-3">
          {resume.personalInfo.email && (
            <div className="flex items-center space-x-1">
              <span>Email: {resume.personalInfo.email}</span>
            </div>
          )}
          {resume.personalInfo.phone && (
            <div className="flex items-center space-x-1">
              <span>| {resume.personalInfo.phone}</span>
            </div>
          )}
        </div>

        {/* Social Links */}
        {resume.socialLinks && resume.socialLinks.length > 0 && (
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-blue-600 mb-4">
            {resume.socialLinks.map((link, index) => (
              <span key={link.id}>
                {index > 0 && ' | '}
                <span className="text-blue-600">{link.platform}</span>
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Dynamic Sections */}
      {resume.sections
        .filter(section => section.isVisible)
        .map((section) => {
          switch (section.type) {
            case 'education':
              return resume.education.length > 0 ? (
                <section key={section.id} className="mb-6">
                  <h2 className="text-lg font-bold text-blue-600 mb-3 flex items-center">
                    🎓 EDUCATION
                  </h2>
                  <div className="space-y-3">
                    {resume.education.map((edu) => (
                      <div key={edu.id}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-gray-900">
                              {edu.degree || 'Degree'} {edu.field && `(${edu.field})`}
                            </h3>
                            <p className="text-gray-700 font-medium">
                              {edu.institution || 'Institution Name'}
                            </p>
                            {edu.cgpa && (
                              <p className="text-gray-600 text-sm">
                                Current CGPA: {edu.cgpa}
                              </p>
                            )}
                          </div>
                          {edu.graduationDate && (
                            <div className="text-gray-600 text-sm">
                              [{formatDate(edu.graduationDate)} – Present]
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;

            case 'technicalSkills':
              return resume.technicalSkills.length > 0 ? (
                <section key={section.id} className="mb-6">
                  <h2 className="text-lg font-bold text-blue-600 mb-3 flex items-center">
                    ⚙️ TECHNICAL SKILLS
                  </h2>
                  <div className="space-y-2">
                    {resume.technicalSkills.map((skillCategory) => (
                      <div key={skillCategory.id}>
                        <p className="text-gray-900">
                          <span className="font-semibold">{skillCategory.category}:</span>{' '}
                          {skillCategory.skills.join(', ')}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;

            case 'experience':
              return resume.experience.length > 0 ? (
                <section key={section.id} className="mb-6">
                  <h2 className="text-lg font-bold text-blue-600 mb-3 flex items-center">
                    💼 WORK EXPERIENCE
                  </h2>
                  <div className="space-y-4">
                    {resume.experience.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <h3 className="font-bold text-gray-900">
                              {exp.position || 'Position Title'}
                            </h3>
                            <p className="text-gray-700 font-medium">
                              {exp.company || 'Company Name'}
                            </p>
                          </div>
                          {(exp.startDate || exp.endDate) && (
                            <div className="text-gray-600 text-sm">
                              [{formatDate(exp.startDate)} – {exp.endDate ? formatDate(exp.endDate) : 'Present'}]
                            </div>
                          )}
                        </div>
                        {exp.description && (
                          <div className="text-gray-700 text-sm leading-relaxed">
                            {exp.description.split('\n').map((line, index) => (
                              <p key={index} className="mb-1">• {line}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;

            case 'projects':
              return resume.projects.length > 0 ? (
                <section key={section.id} className="mb-6">
                  <h2 className="text-lg font-bold text-blue-600 mb-3 flex items-center">
                    📁 ACADEMIC PROJECTS
                  </h2>
                  <div className="space-y-4">
                    {resume.projects.map((project, index) => (
                      <div key={project.id}>
                        <h3 className="font-bold text-gray-900">
                          {index + 1}. {project.title || 'Project Title'}
                          {project.technologies && (
                            <span className="font-normal text-gray-700">
                              {' '}({project.technologies})
                            </span>
                          )}
                        </h3>
                        {project.description && (
                          <p className="text-gray-700 text-sm mb-1">
                            {project.description}
                          </p>
                        )}
                        {project.highlights.length > 0 && (
                          <div className="text-gray-700 text-sm">
                            {project.highlights.map((highlight, idx) => (
                              <p key={idx} className="mb-1">• {highlight}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;

            case 'positions':
              return resume.positions.length > 0 ? (
                <section key={section.id} className="mb-6">
                  <h2 className="text-lg font-bold text-blue-600 mb-3 flex items-center">
                    🤝 POSITIONS OF RESPONSIBILITY
                  </h2>
                  <div className="space-y-3">
                    {resume.positions.map((position) => (
                      <div key={position.id}>
                        <p className="text-gray-900">
                          <span className="font-bold">• {position.title || 'Position Title'}</span>
                          {position.organization && (
                            <span className="text-gray-700"> – {position.organization}</span>
                          )}
                        </p>
                        {position.description && (
                          <p className="text-gray-700 text-sm ml-4">
                            {position.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;

            case 'certifications':
              return resume.certifications && resume.certifications.length > 0 ? (
                <section key={section.id} className="mb-6">
                  <h2 className="text-lg font-bold text-blue-600 mb-3 flex items-center">
                    🏆 CERTIFICATIONS
                  </h2>
                  <div className="space-y-2">
                    {resume.certifications.map((cert) => (
                      <div key={cert.id}>
                        <p className="text-gray-900">
                          <span className="font-bold">• {cert.title || 'Certification Title'}</span>
                          {cert.provider && (
                            <span className="text-gray-700"> – {cert.provider}</span>
                          )}
                        </p>
                        {cert.description && (
                          <p className="text-gray-700 text-sm ml-4">
                            {cert.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;

            default:
              return null;
          }
        })}

      {/* Empty State */}
      {resume.sections.every(section => {
        switch (section.type) {
          case 'experience': return resume.experience.length === 0;
          case 'education': return resume.education.length === 0;
          case 'technicalSkills': return resume.technicalSkills.length === 0;
          case 'projects': return resume.projects.length === 0;
          case 'positions': return resume.positions.length === 0;
          case 'certifications': return resume.certifications.length === 0;
          default: return true;
        }
      }) && !resume.personalInfo.fullName && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg mb-2">Your resume preview will appear here</p>
          <p className="text-sm">Start by filling out your personal information in the left panel</p>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
