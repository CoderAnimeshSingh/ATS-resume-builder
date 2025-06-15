
import React from 'react';
import { FileText, Github, Linkedin, Mail, Heart } from 'lucide-react';

const BrandingFooter = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-sm">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900">Professional Resume Builder</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>for your career success</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <p className="text-sm text-gray-600 text-center sm:text-left">
              © 2024 Professional Resume Builder. Build your career with confidence.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/CoderAnimeshSingh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200 hover:scale-110 transform"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/animeshsingh9693/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors duration-200 hover:scale-110 transform"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:ani.yug272@gmail.com"
                className="text-gray-400 hover:text-green-600 transition-colors duration-200 hover:scale-110 transform"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Professional Resume Builder - Empowering careers through exceptional resume design
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-4 text-xs text-gray-400">
              <span>✓ ATS Optimized</span>
              <span>✓ Professional Templates</span>
              <span>✓ Mobile Responsive</span>
              <span>✓ Print Ready</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default BrandingFooter;
