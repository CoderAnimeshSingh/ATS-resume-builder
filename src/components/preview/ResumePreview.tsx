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

  const getSkillBars = (level: string) => {
    const levels = { beginner: 1, intermediate: 2, advanced: 3, expert: 4 };
    const skillLevel = levels[level as keyof typeof levels] || 2;
    
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4].map((bar) => (
          <div
            key={bar}
            className={`w-2 h-2 rounded-full ${
              bar <= skillLevel ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    );
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
      {/* Header with template-specific styling */}
      <header className={`mb-8 p-6 rounded-lg ${styles.headerBg} ${resume.template === 'creative' ? 'text-white' : ''}`}>
        <h1 className={`text-4xl font-bold mb-2 ${resume.template === 'creative' ? 'text-white' : styles.primaryColor}`}>
          {resume.personalInfo.fullName || 'Your Full Name'}
        </h1>
        
        <div className={`flex flex-wrap items-center gap-4 ${resume.template === 'creative' ? 'text-purple-100' : 'text-gray-600'}`}>
          {resume.personalInfo.email && (
            <div className="flex items-center space-x-1">
              <Mail className="w-4 h-4" />
              <span className="text-sm">{resume.personalInfo.email}</span>
            </div>
          )}
          {resume.personalInfo.phone && (
            <div className="flex items-center space-x-1">
              <Phone className="w-4 h-4" />
              <span className="text-sm">{resume.personalInfo.phone}</span>
            </div>
          )}
          {resume.personalInfo.location && (
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{resume.personalInfo.location}</span>
            </div>
          )}
        </div>

        {resume.personalInfo.summary && (
          <div className="mt-4">
            <p className={`leading-relaxed ${resume.template === 'creative' ? 'text-purple-100' : 'text-gray-700'}`}>
              {resume.personalInfo.summary}
            </p>
          </div>
        )}
      </header>

      {/* Dynamic Sections with template styling */}
      {resume.sections
        .filter(section => section.isVisible)
        .map((section) => {
          switch (section.type) {
            case 'experience':
              return resume.experience.length > 0 ? (
                <section key={section.id} className="mb-8">
                  <h2 className={`text-2xl font-bold mb-4 pb-2 border-b ${styles.primaryColor} ${styles.borderColor}`}>
                    Work Experience
                  </h2>
                  <div className="space-y-6">
                    {resume.experience.map((exp) => (
                      <div key={exp.id} className="relative">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className={`text-lg font-semibold ${styles.primaryColor}`}>
                              {exp.position || 'Position Title'}
                            </h3>
                            <p className={`font-medium ${styles.accentColor}`}>
                              {exp.company || 'Company Name'}
                            </p>
                          </div>
                          {(exp.startDate || exp.endDate) && (
                            <div className="flex items-center space-x-1 text-gray-500 text-sm">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                              </span>
                            </div>
                          )}
                        </div>
                        {exp.description && (
                          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;

            case 'education':
              return resume.education.length > 0 ? (
                <section key={section.id} className="mb-8">
                  <h2 className={`text-2xl font-bold mb-4 pb-2 border-b ${styles.primaryColor} ${styles.borderColor}`}>
                    Education
                  </h2>
                  <div className="space-y-4">
                    {resume.education.map((edu) => (
                      <div key={edu.id} className="flex justify-between items-start">
                        <div>
                          <h3 className={`text-lg font-semibold ${styles.primaryColor}`}>
                            {edu.degree || 'Degree'} {edu.field && `in ${edu.field}`}
                          </h3>
                          <p className={`font-medium ${styles.accentColor}`}>
                            {edu.institution || 'Institution Name'}
                          </p>
                        </div>
                        {edu.graduationDate && (
                          <div className="flex items-center space-x-1 text-gray-500 text-sm">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(edu.graduationDate)}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;

            case 'skills':
              return resume.skills.length > 0 ? (
                <section key={section.id} className="mb-8">
                  <h2 className={`text-2xl font-bold mb-4 pb-2 border-b ${styles.primaryColor} ${styles.borderColor}`}>
                    Skills
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {resume.skills.map((skill) => (
                      <div key={skill.id} className="flex items-center justify-between">
                        <span className={`font-medium ${styles.primaryColor}`}>
                          {skill.name || 'Skill Name'}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500 capitalize">
                            {skill.level}
                          </span>
                          {getSkillBars(skill.level)}
                        </div>
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
          case 'skills': return resume.skills.length === 0;
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
