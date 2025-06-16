
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

    // Temporarily disable hover effects and interactions for PDF
    const originalPointerEvents = element.style.pointerEvents;
    element.style.pointerEvents = 'none';

    // Add print-specific styles
    const printStyles = document.createElement('style');
    printStyles.textContent = `
      @media print {
        * { 
          -webkit-print-color-adjust: exact !important; 
          color-adjust: exact !important; 
        }
        .break-inside-avoid { 
          break-inside: avoid !important; 
          page-break-inside: avoid !important; 
        }
        a { 
          text-decoration: none !important; 
          color: inherit !important; 
        }
      }
    `;
    document.head.appendChild(printStyles);

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 794, // A4 width at 96 DPI
      height: element.scrollHeight, // Use actual content height
      scrollX: 0,
      scrollY: 0,
      removeContainer: true,
      imageTimeout: 0,
      logging: false
    });

    // Remove print styles
    document.head.removeChild(printStyles);
    
    // Restore hover effects
    element.style.pointerEvents = originalPointerEvents;
    
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
    
    // Only add pages if content actually requires them
    if (imgHeight <= pdfHeight) {
      // Content fits in one page
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'MEDIUM');
    } else {
      // Content requires multiple pages
      let heightLeft = imgHeight;
      let position = 0;
      let pageNumber = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'MEDIUM');
      heightLeft -= pdfHeight;
      pageNumber++;

      // Add additional pages only if there's actual content
      while (heightLeft > 20) { // 20mm threshold to avoid nearly empty pages
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'MEDIUM');
        heightLeft -= pdfHeight;
        pageNumber++;
        
        // Safety limit to prevent infinite pages
        if (pageNumber > 5) break;
      }
    }

    // Add metadata
    pdf.setProperties({
      title: `${filename} - Professional Resume`,
      subject: 'Professional Resume',
      author: filename.replace('_Resume', ''),
      creator: 'Professional Resume Builder',
      keywords: 'resume, cv, professional, ATS'
    });

    pdf.save(`${filename}.pdf`);
    
    console.log('PDF exported successfully');
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
