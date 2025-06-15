
import React, { useState } from 'react';
import { FileText, Download } from 'lucide-react';
import { exportToPDF } from '../../utils/pdfExport';
import { useResume } from '../../context/ResumeContext';

const ExportButton = () => {
  const { state } = useResume();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const filename = state.resume.personalInfo.fullName 
        ? `${state.resume.personalInfo.fullName}_Resume`
        : 'My_Resume';
      
      await exportToPDF(filename);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
  );
};

export default ExportButton;
