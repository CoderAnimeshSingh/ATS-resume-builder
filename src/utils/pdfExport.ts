
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportToPDF = async (filename: string = 'resume') => {
  const element = document.getElementById('resume-preview');
  if (!element) {
    console.error('Resume preview element not found');
    return;
  }

  try {
    // Hide any non-essential elements during export
    const elementsToHide = element.querySelectorAll('.no-print');
    elementsToHide.forEach(el => (el as HTMLElement).style.display = 'none');

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 794, // A4 width at 96 DPI
      height: 1123, // A4 height at 96 DPI
      scrollX: 0,
      scrollY: 0
    });

    // Restore hidden elements
    elementsToHide.forEach(el => (el as HTMLElement).style.display = '');

    const imgData = canvas.toDataURL('image/png', 0.95);
    
    // Create PDF with A4 dimensions (210 x 297 mm)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });
    
    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = 297; // A4 height in mm
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;
    
    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'MEDIUM');
    heightLeft -= pdfHeight;

    // Add additional pages if content is longer than one page
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'MEDIUM');
      heightLeft -= pdfHeight;
    }

    // Add metadata
    pdf.setProperties({
      title: `${filename} - Professional Resume`,
      subject: 'Professional Resume',
      author: filename.replace('_Resume', ''),
      creator: 'Resume Builder Pro'
    });

    pdf.save(`${filename}.pdf`);
    
    console.log('PDF exported successfully');
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
