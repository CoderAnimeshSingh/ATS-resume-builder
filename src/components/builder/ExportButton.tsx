
import React, { useState } from 'react';
import { Download, FileText, CheckCircle } from 'lucide-react';
import { exportToPDF } from '../../utils/pdfExport';
import { useResume } from '../../context/ResumeContext';

const ExportButton = () => {
  const { state } = useResume();
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    setExportSuccess(false);
    
    try {
      const filename = state.resume.personalInfo.fullName 
        ? `${state.resume.personalInfo.fullName.replace(/\s+/g, '_')}_Resume`
        : 'Professional_Resume';
      
      await exportToPDF(filename);
      setExportSuccess(true);
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setExportSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Export failed:', error);
      // You could add a toast notification here for error handling
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {exportSuccess && (
        <div className="flex items-center space-x-1 text-green-600 text-sm">
          <CheckCircle className="w-4 h-4" />
          <span>Exported!</span>
        </div>
      )}
      
      <button
        onClick={handleExport}
        disabled={isExporting}
        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
      >
        {isExporting ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Exporting...</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            <span>Export PDF</span>
          </>
        )}
      </button>
    </div>
  );
};

export default ExportButton;
