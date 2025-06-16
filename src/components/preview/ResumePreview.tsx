
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
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 min-h-[600px] rounded-lg">
        <div className="text-center p-6 sm:p-8 max-w-md mx-auto">
          <div className="text-5xl sm:text-6xl mb-4 animate-bounce">📄</div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3">Your Professional Resume</h3>
          <p className="text-gray-500 mb-6 text-sm sm:text-base leading-relaxed">
            Start building your ATS-friendly resume by filling out your information in the builder sections
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-gray-400">
            <div className="flex items-center justify-center space-x-2 bg-white/50 rounded-lg p-3">
              <span className="text-green-600">✓</span>
              <span>ATS Optimized</span>
            </div>
            <div className="flex items-center justify-center space-x-2 bg-white/50 rounded-lg p-3">
              <span className="text-blue-600">✓</span>
              <span>Professional Layout</span>
            </div>
            <div className="flex items-center justify-center space-x-2 bg-white/50 rounded-lg p-3">
              <span className="text-purple-600">✓</span>
              <span>A4 Print Ready</span>
            </div>
            <div className="flex items-center justify-center space-x-2 bg-white/50 rounded-lg p-3">
              <span className="text-orange-600">✓</span>
              <span>Mobile Responsive</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white shadow-xl rounded-lg overflow-hidden">
      <div 
        className="mx-auto bg-white text-black font-sans leading-tight overflow-hidden print:shadow-none"
        id="resume-preview"
        style={{
          width: '100%',
          maxWidth: '794px',
          minHeight: '600px',
          padding: window.innerWidth < 640 ? '20px' : window.innerWidth < 1024 ? '28px' : '40px',
          fontSize: window.innerWidth < 640 ? '10px' : '11px',
          lineHeight: '1.4'
        }}
      >
        {/* Header Section */}
        <header className="text-center mb-4 sm:mb-6 border-b border-gray-300 pb-3 sm:pb-4">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 tracking-wide uppercase break-words">
            {resume.personalInfo.fullName || 'YOUR FULL NAME'}
          </h1>
          
          <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 text-xs text-gray-700 mb-2">
            {resume.personalInfo.email && (
              <span className="flex items-center gap-1 break-all">
                <Mail className="w-3 h-3 flex-shrink-0" />
                <span className="truncate max-w-[150px] sm:max-w-none">{resume.personalInfo.email}</span>
              </span>
            )}
            {resume.personalInfo.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 flex-shrink-0" />
                <span>{resume.personalInfo.phone}</span>
              </span>
            )}
            {resume.personalInfo.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{resume.personalInfo.location}</span>
              </span>
            )}
          </div>

          {/* Social Links - Fixed alignment and made clickable in preview only */}
          {resume.socialLinks && resume.socialLinks.length > 0 && (
            <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 text-xs text-blue-700 mb-2">
              {resume.socialLinks.map((link) => (
                <span key={link.id} className="flex items-center gap-1 break-all print:pointer-events-none">
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate max-w-[120px] sm:max-w-none hover:underline print:no-underline print:text-blue-700"
                    onClick={(e) => {
                      // Prevent clicks during PDF generation
                      if (window.location.pathname.includes('pdf')) {
                        e.preventDefault();
                      }
                    }}
                  >
                    {link.platform}: {link.username || link.url}
                  </a>
                </span>
              ))}
            </div>
          )}

          {/* Professional Summary */}
          {resume.personalInfo.summary && (
            <div className="mt-3 sm:mt-4 text-xs text-gray-800 max-w-full mx-auto">
              <p className="text-justify leading-relaxed break-words">{resume.personalInfo.summary}</p>
            </div>
          )}
        </header>

        {/* Dynamic Sections */}
        <div className="space-y-3 sm:space-y-4">
          {resume.sections
            .filter(section => section.isVisible)
            .map((section) => {
              switch (section.type) {
                case 'education':
                  return resume.education.length > 0 ? (
                    <section key={section.id} className="break-inside-avoid">
                      <h2 className="text-sm font-bold text-gray-900 mb-2 sm:mb-3 uppercase tracking-wider border-b border-gray-400 pb-1">
                        EDUCATION
                      </h2>
                      <div className="space-y-2 sm:space-y-3">
                        {resume.education.map((edu) => (
                          <div key={edu.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-0 break-inside-avoid">
                            <div className="flex-1">
                              <h3 className="font-semibold text-xs text-gray-900 break-words">
                                {edu.degree} {edu.field && `in ${edu.field}`}
                              </h3>
                              <p className="text-xs text-gray-700 font-medium break-words">
                                {edu.institution}
                              </p>
                              {edu.cgpa && (
                                <p className="text-xs text-gray-600">
                                  CGPA: {edu.cgpa}
                                </p>
                              )}
                            </div>
                            {edu.graduationDate && (
                              <div className="text-xs text-gray-600 sm:text-right flex-shrink-0">
                                {formatDate(edu.graduationDate)}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </section>
                  ) : null;

                case 'technicalSkills':
                  return resume.technicalSkills.length > 0 ? (
                    <section key={section.id} className="break-inside-avoid">
                      <h2 className="text-sm font-bold text-gray-900 mb-2 sm:mb-3 uppercase tracking-wider border-b border-gray-400 pb-1">
                        TECHNICAL SKILLS
                      </h2>
                      <div className="space-y-1 sm:space-y-2">
                        {resume.technicalSkills.map((skillCategory) => (
                          <div key={skillCategory.id} className="flex flex-col sm:flex-row gap-1 sm:gap-0 break-inside-avoid">
                            <span className="font-semibold text-xs text-gray-900 sm:w-32 flex-shrink-0">
                              {skillCategory.category}:
                            </span>
                            <span className="text-xs text-gray-700 flex-1 break-words">
                              {skillCategory.skills.join(', ')}
                            </span>
                          </div>
                        ))}
                      </div>
                    </section>
                  ) : null;

                case 'experience':
                  return resume.experience.length > 0 ? (
                    <section key={section.id} className="break-inside-avoid">
                      <h2 className="text-sm font-bold text-gray-900 mb-2 sm:mb-3 uppercase tracking-wider border-b border-gray-400 pb-1">
                        WORK EXPERIENCE
                      </h2>
                      <div className="space-y-3 sm:space-y-4">
                        {resume.experience.map((exp) => (
                          <div key={exp.id} className="break-inside-avoid">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-0 mb-1">
                              <div className="flex-1">
                                <h3 className="font-semibold text-xs text-gray-900 break-words">
                                  {exp.position}
                                </h3>
                                <p className="text-xs text-gray-700 font-medium break-words">
                                  {exp.company}
                                </p>
                              </div>
                              {(exp.startDate || exp.endDate) && (
                                <div className="text-xs text-gray-600 sm:text-right flex-shrink-0">
                                  {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                                </div>
                              )}
                            </div>
                            {exp.description && (
                              <div className="text-xs text-gray-700 leading-relaxed ml-0">
                                {exp.description.split('\n').map((line, index) => (
                                  line.trim() && <p key={index} className="mb-1 break-words">• {line.trim()}</p>
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
                    <section key={section.id} className="break-inside-avoid">
                      <h2 className="text-sm font-bold text-gray-900 mb-2 sm:mb-3 uppercase tracking-wider border-b border-gray-400 pb-1">
                        ACADEMIC PROJECTS
                      </h2>
                      <div className="space-y-2 sm:space-y-3">
                        {resume.projects.map((project, index) => (
                          <div key={project.id} className="break-inside-avoid">
                            <h3 className="font-semibold text-xs text-gray-900 break-words">
                              {index + 1}. {project.title}
                              {project.technologies && (
                                <span className="font-normal text-gray-600 ml-1">
                                  ({project.technologies})
                                </span>
                              )}
                            </h3>
                            {project.description && (
                              <p className="text-xs text-gray-700 mb-1 leading-relaxed break-words">
                                {project.description}
                              </p>
                            )}
                            {project.highlights.length > 0 && (
                              <div className="text-xs text-gray-700">
                                {project.highlights.map((highlight, idx) => (
                                  <p key={idx} className="mb-1 break-words">• {highlight}</p>
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
                    <section key={section.id} className="break-inside-avoid">
                      <h2 className="text-sm font-bold text-gray-900 mb-2 sm:mb-3 uppercase tracking-wider border-b border-gray-400 pb-1">
                        POSITIONS OF RESPONSIBILITY
                      </h2>
                      <div className="space-y-1 sm:space-y-2">
                        {resume.positions.map((position) => (
                          <div key={position.id} className="break-inside-avoid">
                            <h3 className="font-semibold text-xs text-gray-900 break-words">
                              • {position.title}
                              {position.organization && (
                                <span className="font-normal text-gray-600"> - {position.organization}</span>
                              )}
                            </h3>
                            {position.description && (
                              <p className="text-xs text-gray-700 ml-3 leading-relaxed break-words">
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
                    <section key={section.id} className="break-inside-avoid">
                      <h2 className="text-sm font-bold text-gray-900 mb-2 sm:mb-3 uppercase tracking-wider border-b border-gray-400 pb-1">
                        CERTIFICATIONS
                      </h2>
                      <div className="space-y-1 sm:space-y-2">
                        {resume.certifications.map((cert) => (
                          <div key={cert.id} className="break-inside-avoid">
                            <h3 className="font-semibold text-xs text-gray-900 break-words">
                              • {cert.title}
                              {cert.provider && (
                                <span className="font-normal text-gray-600"> - {cert.provider}</span>
                              )}
                            </h3>
                            {cert.description && (
                              <p className="text-xs text-gray-700 ml-3 leading-relaxed break-words">
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
        <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-gray-200 break-inside-avoid">
          <p className="text-center text-xs text-gray-400 break-words">
            This resume is optimized for Applicant Tracking Systems (ATS)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
