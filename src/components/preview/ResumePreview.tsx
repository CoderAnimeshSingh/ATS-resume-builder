
import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

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
          width: '210mm',
          maxWidth: '794px',
          minHeight: '297mm',
          padding: '20mm',
          fontSize: '11px',
          lineHeight: '1.4',
          fontFamily: 'Arial, sans-serif',
          color: '#000000',
          backgroundColor: '#ffffff'
        }}
      >
        {/* Header Section */}
        <header className="text-center mb-6 border-b-2 border-gray-800 pb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-3 tracking-wide uppercase">
            {resume.personalInfo.fullName || 'YOUR FULL NAME'}
          </h1>
          
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-gray-700 mb-2">
            {resume.personalInfo.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 flex-shrink-0" />
                <span>{resume.personalInfo.email}</span>
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
                <span>{resume.personalInfo.location}</span>
              </span>
            )}
          </div>

          {/* Social Links */}
          {resume.socialLinks && resume.socialLinks.length > 0 && (
            <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-gray-700 mb-3">
              {resume.socialLinks.map((link) => (
                <span key={link.id} className="flex items-center gap-1">
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                  <span>
                    {link.platform}: {link.url || 'URL not provided'}
                  </span>
                </span>
              ))}
            </div>
          )}

          {/* Professional Summary */}
          {resume.personalInfo.summary && (
            <div className="mt-4 text-xs text-gray-800 max-w-full mx-auto text-justify leading-relaxed">
              <p>{resume.personalInfo.summary}</p>
            </div>
          )}
        </header>

        {/* Dynamic Sections */}
        <div className="space-y-5">
          {/* Education Section */}
          {resume.education.length > 0 && (
            <section className="break-inside-avoid">
              <h2 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider border-b border-gray-600 pb-1">
                EDUCATION
              </h2>
              <div className="space-y-3">
                {resume.education.map((edu) => (
                  <div key={edu.id} className="break-inside-avoid">
                    <div className="flex justify-between items-start mb-1">
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
                        <div className="text-xs text-gray-600 text-right flex-shrink-0 ml-4">
                          {formatDate(edu.graduationDate)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Technical Skills Section */}
          {resume.technicalSkills.length > 0 && (
            <section className="break-inside-avoid">
              <h2 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider border-b border-gray-600 pb-1">
                TECHNICAL SKILLS
              </h2>
              <div className="space-y-2">
                {resume.technicalSkills.map((skillCategory) => (
                  <div key={skillCategory.id} className="flex break-inside-avoid">
                    <span className="font-semibold text-xs text-gray-900 w-32 flex-shrink-0">
                      {skillCategory.category}:
                    </span>
                    <span className="text-xs text-gray-700 flex-1 ml-2">
                      {skillCategory.skills.join(', ')}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Work Experience Section */}
          {resume.experience.length > 0 && (
            <section className="break-inside-avoid">
              <h2 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider border-b border-gray-600 pb-1">
                WORK EXPERIENCE
              </h2>
              <div className="space-y-4">
                {resume.experience.map((exp) => (
                  <div key={exp.id} className="break-inside-avoid">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex-1">
                        <h3 className="font-semibold text-xs text-gray-900">
                          {exp.position}
                        </h3>
                        <p className="text-xs text-gray-700 font-medium">
                          {exp.company}
                        </p>
                      </div>
                      {(exp.startDate || exp.endDate) && (
                        <div className="text-xs text-gray-600 text-right flex-shrink-0 ml-4">
                          {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                        </div>
                      )}
                    </div>
                    {exp.description && (
                      <div className="text-xs text-gray-700 leading-relaxed mt-2">
                        {exp.description.split('\n').map((line, index) => (
                          line.trim() && <p key={index} className="mb-1">• {line.trim()}</p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects Section */}
          {resume.projects.length > 0 && (
            <section className="break-inside-avoid">
              <h2 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider border-b border-gray-600 pb-1">
                ACADEMIC PROJECTS
              </h2>
              <div className="space-y-3">
                {resume.projects.map((project, index) => (
                  <div key={project.id} className="break-inside-avoid">
                    <h3 className="font-semibold text-xs text-gray-900 mb-1">
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
          )}

          {/* Positions Section */}
          {resume.positions.length > 0 && (
            <section className="break-inside-avoid">
              <h2 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider border-b border-gray-600 pb-1">
                POSITIONS OF RESPONSIBILITY
              </h2>
              <div className="space-y-2">
                {resume.positions.map((position) => (
                  <div key={position.id} className="break-inside-avoid">
                    <h3 className="font-semibold text-xs text-gray-900">
                      • {position.title}
                      {position.organization && (
                        <span className="font-normal text-gray-600"> - {position.organization}</span>
                      )}
                    </h3>
                    {position.description && (
                      <p className="text-xs text-gray-700 ml-3 leading-relaxed mt-1">
                        {position.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications Section */}
          {resume.certifications && resume.certifications.length > 0 && (
            <section className="break-inside-avoid">
              <h2 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider border-b border-gray-600 pb-1">
                CERTIFICATIONS
              </h2>
              <div className="space-y-2">
                {resume.certifications.map((cert) => (
                  <div key={cert.id} className="break-inside-avoid">
                    <h3 className="font-semibold text-xs text-gray-900">
                      • {cert.title}
                      {cert.provider && (
                        <span className="font-normal text-gray-600"> - {cert.provider}</span>
                      )}
                    </h3>
                    {cert.description && (
                      <p className="text-xs text-gray-700 ml-3 leading-relaxed mt-1">
                        {cert.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
