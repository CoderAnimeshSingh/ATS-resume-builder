
import React from 'react';
import { FileText, Github, Linkedin, Mail } from 'lucide-react';

const BrandingFooter = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <FileText className="w-6 h-6 text-blue-600" />
            <span className="text-lg font-semibold text-gray-900">Professional Resume Builder</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <p className="text-sm text-gray-600">
              © 2024 Professional Resume Builder. Build your career with confidence.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@resumebuilder.com"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Professional Resume Builder - Empowering careers through exceptional resume design
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default BrandingFooter;
