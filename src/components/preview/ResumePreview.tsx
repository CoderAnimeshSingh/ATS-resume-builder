
import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Mail, Phone, MapPin, Calendar, ExternalLink } from 'lucide-react';

const ResumePreview = () => {
  const { state } = useResume();
  const { resume } = state;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const isResumeEmpty = () => {
    return !resume.personalInfo.fullName && 
           resume.experience.length === 0 && 
           resume.education.length === 0 && 
           resume.projects.length === 0 &&
           resume.technicalSkills.length === 0;
  };

  if (isResumeEmpty()) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">📄</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Your Professional Resume</h3>
          <p className="text-gray-500 mb-4">Start building your ATS-friendly resume by filling out your information</p>
          <div className="text-sm text-gray-400">
            <p>✓ ATS Optimized Format</p>
            <p>✓ Professional Layout</p>
            <p>✓ A4 Print Ready</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white shadow-lg">
      {/* A4 sized container - 210mm x 297mm = 8.27" x 11.69" at 96 DPI */}
      <div 
        className="mx-auto bg-white text-black font-sans leading-tight"
        id="resume-preview"
        style={{
          width: '794px', // A4 width at 96 DPI
          minHeight: '1123px', // A4 height at 96 DPI
          padding: '48px',
          fontSize: '11px',
          lineHeight: '1.4'
        }}
      >
        {/* Header Section */}
        <header className="text-center mb-6 border-b border-gray-300 pb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 tracking-wide uppercase">
            {resume.personalInfo.fullName || 'YOUR FULL NAME'}
          </h1>
          
          <div className="flex flex-wrap justify-center items-center gap-3 text-xs text-gray-700">
            {resume.personalInfo.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                {resume.personalInfo.email}
              </span>
            )}
            {resume.personalInfo.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {resume.personalInfo.phone}
              </span>
            )}
            {resume.personalInfo.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {resume.personalInfo.location}
              </span>
            )}
          </div>

          {/* Social Links */}
          {resume.socialLinks && resume.socialLinks.length > 0 && (
            <div className="flex flex-wrap justify-center items-center gap-3 text-xs text-blue-700 mt-2">
              {resume.socialLinks.map((link, index) => (
                <span key={link.id} className="flex items-center gap-1">
                  <ExternalLink className="w-3 h-3" />
                  {link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}: {link.username || link.url}
                </span>
              ))}
            </div>
          )}

          {/* Professional Summary */}
          {resume.personalInfo.summary && (
            <div className="mt-4 text-xs text-gray-800 max-w-4xl mx-auto">
              <p className="text-justify leading-relaxed">{resume.personalInfo.summary}</p>
            </div>
          )}
        </header>

        {/* Dynamic Sections */}
        <div className="space-y-5">
          {resume.sections
            .filter(section => section.isVisible)
            .map((section) => {
              switch (section.type) {
                case 'education':
                  return resume.education.length > 0 ? (
                    <section key={section.id}>
                      <h2 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider border-b border-gray-400 pb-1">
                        EDUCATION
                      </h2>
                      <div className="space-y-3">
                        {resume.education.map((edu) => (
                          <div key={edu.id} className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="font-semibold text-xs text-gray-900">
                                {edu.degree} {edu.field && `in ${edu.field}`}
                              </h3>
                              <p className="text-xs text-gray-700 font-medium">
                                {edu.institution}
                              </p>
                              {edu.cgpa && (
                                <p className="text-xs text-gray-600">
                                  CGPA: {edu.cgpa}
                                </p>
                              )}
                            </div>
                            {edu.graduationDate && (
                              <div className="text-xs text-gray-600 text-right">
                                {formatDate(edu.graduationDate)} - Present
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </section>
                  ) : null;

                case 'technicalSkills':
                  return resume.technicalSkills.length > 0 ? (
                    <section key={section.id}>
                      <h2 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider border-b border-gray-400 pb-1">
                        TECHNICAL SKILLS
                      </h2>
                      <div className="space-y-2">
                        {resume.technicalSkills.map((skillCategory) => (
                          <div key={skillCategory.id} className="flex">
                            <span className="font-semibold text-xs text-gray-900 w-32 flex-shrink-0">
                              {skillCategory.category}:
                            </span>
                            <span className="text-xs text-gray-700 flex-1">
                              {skillCategory.skills.join(', ')}
                            </span>
                          </div>
                        ))}
                      </div>
                    </section>
                  ) : null;

                case 'experience':
                  return resume.experience.length > 0 ? (
                    <section key={section.id}>
                      <h2 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider border-b border-gray-400 pb-1">
                        WORK EXPERIENCE
                      </h2>
                      <div className="space-y-4">
                        {resume.experience.map((exp) => (
                          <div key={exp.id}>
                            <div className="flex justify-between items-start mb-1">
                              <div>
                                <h3 className="font-semibold text-xs text-gray-900">
                                  {exp.position}
                                </h3>
                                <p className="text-xs text-gray-700 font-medium">
                                  {exp.company}
                                </p>
                              </div>
                              {(exp.startDate || exp.endDate) && (
                                <div className="text-xs text-gray-600">
                                  {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                                </div>
                              )}
                            </div>
                            {exp.description && (
                              <div className="text-xs text-gray-700 leading-relaxed ml-0">
                                {exp.description.split('\n').map((line, index) => (
                                  line.trim() && <p key={index} className="mb-1">• {line.trim()}</p>
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
                    <section key={section.id}>
                      <h2 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider border-b border-gray-400 pb-1">
                        ACADEMIC PROJECTS
                      </h2>
                      <div className="space-y-3">
                        {resume.projects.map((project, index) => (
                          <div key={project.id}>
                            <h3 className="font-semibold text-xs text-gray-900">
                              {index + 1}. {project.title}
                              {project.technologies && (
                                <span className="font-normal text-gray-600 ml-1">
                                  ({project.technologies})
                                </span>
                              )}
                            </h3>
                            {project.description && (
                              <p className="text-xs text-gray-700 mb-1 leading-relaxed">
                                {project.description}
                              </p>
                            )}
                            {project.highlights.length > 0 && (
                              <div className="text-xs text-gray-700">
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
                    <section key={section.id}>
                      <h2 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider border-b border-gray-400 pb-1">
                        POSITIONS OF RESPONSIBILITY
                      </h2>
                      <div className="space-y-2">
                        {resume.positions.map((position) => (
                          <div key={position.id}>
                            <h3 className="font-semibold text-xs text-gray-900">
                              • {position.title}
                              {position.organization && (
                                <span className="font-normal text-gray-600"> - {position.organization}</span>
                              )}
                            </h3>
                            {position.description && (
                              <p className="text-xs text-gray-700 ml-3 leading-relaxed">
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
                    <section key={section.id}>
                      <h2 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider border-b border-gray-400 pb-1">
                        CERTIFICATIONS
                      </h2>
                      <div className="space-y-2">
                        {resume.certifications.map((cert) => (
                          <div key={cert.id}>
                            <h3 className="font-semibold text-xs text-gray-900">
                              • {cert.title}
                              {cert.provider && (
                                <span className="font-normal text-gray-600"> - {cert.provider}</span>
                              )}
                            </h3>
                            {cert.description && (
                              <p className="text-xs text-gray-700 ml-3 leading-relaxed">
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
        </div>

        {/* ATS Footer Note */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <p className="text-center text-xs text-gray-400">
            This resume is optimized for Applicant Tracking Systems (ATS)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
