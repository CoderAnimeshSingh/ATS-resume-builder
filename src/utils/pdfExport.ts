
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

    // Add print-specific styles for better PDF rendering
    const printStyles = document.createElement('style');
    printStyles.textContent = `
      @media print {
        * { 
          -webkit-print-color-adjust: exact !important; 
          color-adjust: exact !important; 
          print-color-adjust: exact !important;
        }
        .break-inside-avoid { 
          break-inside: avoid !important; 
          page-break-inside: avoid !important; 
        }
        a { 
          text-decoration: none !important; 
          color: inherit !important; 
        }
        #resume-preview {
          box-shadow: none !important;
          border: none !important;
          margin: 0 !important;
          padding: 20mm !important;
          width: 210mm !important;
          min-height: 297mm !important;
          font-family: Arial, sans-serif !important;
          background: white !important;
        }
      }
    `;
    document.head.appendChild(printStyles);

    // Wait for fonts and styles to load
    await new Promise(resolve => setTimeout(resolve, 500));

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 794, // A4 width at 96 DPI (210mm)
      height: Math.max(element.scrollHeight, 1123), // Minimum A4 height (297mm)
      scrollX: 0,
      scrollY: 0,
      removeContainer: false,
      imageTimeout: 0,
      logging: false,
      foreignObjectRendering: true,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById('resume-preview');
        if (clonedElement) {
          // Ensure proper styling in cloned document
          clonedElement.style.width = '794px';
          clonedElement.style.padding = '75px'; // 20mm in pixels
          clonedElement.style.fontFamily = 'Arial, sans-serif';
          clonedElement.style.fontSize = '11px';
          clonedElement.style.lineHeight = '1.4';
          clonedElement.style.backgroundColor = '#ffffff';
          
          // Fix social links formatting
          const socialLinks = clonedElement.querySelectorAll('a');
          socialLinks.forEach(link => {
            link.style.color = 'inherit';
            link.style.textDecoration = 'none';
          });
        }
      }
    });

    // Remove print styles
    document.head.removeChild(printStyles);
    
    // Restore hover effects
    element.style.pointerEvents = originalPointerEvents;
    
    // Restore hidden elements
    elementsToHide.forEach(el => (el as HTMLElement).style.display = '');

    const imgData = canvas.toDataURL('image/png', 1.0);
    
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
    
    // Calculate if content needs multiple pages
    if (imgHeight <= pdfHeight) {
      // Content fits in one page
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
    } else {
      // Content requires multiple pages
      let heightLeft = imgHeight;
      let position = 0;
      let pageNumber = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;
      pageNumber++;

      // Add additional pages only if there's meaningful content
      while (heightLeft > 30) { // 30mm threshold to avoid nearly empty pages
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pdfHeight;
        pageNumber++;
        
        // Safety limit to prevent infinite pages
        if (pageNumber > 3) break;
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
