
import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { CheckCircle, AlertCircle, XCircle, Lightbulb } from 'lucide-react';

const ResumeValidator = () => {
  const { state } = useResume();
  const { resume } = state;

  const getValidationResults = () => {
    const results = {
      critical: [] as string[],
      warnings: [] as string[],
      suggestions: [] as string[],
      passed: [] as string[]
    };

    // Critical checks
    if (!resume.personalInfo.fullName) {
      results.critical.push('Full name is required');
    } else {
      results.passed.push('Full name provided');
    }

    if (!resume.personalInfo.email) {
      results.critical.push('Email address is required');
    } else if (!/\S+@\S+\.\S+/.test(resume.personalInfo.email)) {
      results.critical.push('Email format is invalid');
    } else {
      results.passed.push('Valid email provided');
    }

    if (!resume.personalInfo.phone) {
      results.critical.push('Phone number is required');
    } else {
      results.passed.push('Phone number provided');
    }

    // Warning checks
    if (resume.education.length === 0) {
      results.warnings.push('Add education information');
    } else {
      results.passed.push('Education section completed');
    }

    if (resume.technicalSkills.length === 0) {
      results.warnings.push('Add technical skills to highlight your expertise');
    } else {
      results.passed.push('Technical skills listed');
    }

    if (resume.experience.length === 0 && resume.projects.length === 0) {
      results.warnings.push('Add work experience or projects to showcase your abilities');
    }

    // Suggestions
    if (!resume.personalInfo.summary) {
      results.suggestions.push('Add a professional summary to make a strong first impression');
    }

    if (resume.socialLinks.length === 0) {
      results.suggestions.push('Consider adding LinkedIn or GitHub profile links');
    }

    if (resume.certifications.length === 0) {
      results.suggestions.push('Add relevant certifications to strengthen your profile');
    }

    // ATS optimization checks
    const hasKeywords = resume.technicalSkills.some(skill => skill.skills.length > 3);
    if (!hasKeywords) {
      results.suggestions.push('Add more technical keywords for better ATS compatibility');
    }

    return results;
  };

  const validation = getValidationResults();
  const totalChecks = validation.critical.length + validation.warnings.length + validation.suggestions.length + validation.passed.length;
  const completionScore = Math.round((validation.passed.length / totalChecks) * 100);

  return (
    <div className={`space-y-4 ${state.resume.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Resume Score</h3>
        <div className={`text-2xl font-bold ${
          completionScore >= 80 ? 'text-green-600' : 
          completionScore >= 60 ? 'text-yellow-600' : 'text-red-600'
        }`}>
          {completionScore}%
        </div>
      </div>

      <div className={`w-full bg-gray-200 rounded-full h-2 ${state.resume.theme === 'dark' ? 'bg-gray-700' : ''}`}>
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${
            completionScore >= 80 ? 'bg-green-600' : 
            completionScore >= 60 ? 'bg-yellow-600' : 'bg-red-600'
          }`}
          style={{ width: `${completionScore}%` }}
        ></div>
      </div>

      {/* Critical Issues */}
      {validation.critical.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-red-600 flex items-center gap-2">
            <XCircle className="w-4 h-4" />
            Critical Issues ({validation.critical.length})
          </h4>
          <ul className="space-y-1 ml-6">
            {validation.critical.map((issue, index) => (
              <li key={index} className="text-sm text-red-600">• {issue}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Warnings */}
      {validation.warnings.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-yellow-600 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Warnings ({validation.warnings.length})
          </h4>
          <ul className="space-y-1 ml-6">
            {validation.warnings.map((warning, index) => (
              <li key={index} className="text-sm text-yellow-600">• {warning}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggestions */}
      {validation.suggestions.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-blue-600 flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Suggestions ({validation.suggestions.length})
          </h4>
          <ul className="space-y-1 ml-6">
            {validation.suggestions.map((suggestion, index) => (
              <li key={index} className="text-sm text-blue-600">• {suggestion}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Passed Checks */}
      {validation.passed.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-green-600 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Completed ({validation.passed.length})
          </h4>
          <ul className="space-y-1 ml-6">
            {validation.passed.map((passed, index) => (
              <li key={index} className="text-sm text-green-600">• {passed}</li>
            ))}
          </ul>
        </div>
      )}

      {/* ATS Tips */}
      <div className={`mt-6 p-4 rounded-lg ${state.resume.theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'}`}>
        <h4 className="font-medium text-blue-600 mb-2">ATS Optimization Tips</h4>
        <ul className="text-sm space-y-1 text-blue-700">
          <li>• Use standard section headings (Education, Experience, Skills)</li>
          <li>• Include relevant keywords from job descriptions</li>
          <li>• Use simple, clean formatting without graphics</li>
          <li>• Save and submit as PDF for best compatibility</li>
          <li>• Keep file name professional (FirstName_LastName_Resume.pdf)</li>
        </ul>
      </div>
    </div>
  );
};

export default ResumeValidator;
