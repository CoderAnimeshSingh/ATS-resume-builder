
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportToPDF = async (filename: string = 'resume') => {
  const element = document.getElementById('resume-preview');
  if (!element) {
    console.error('Resume preview element not found');
    alert('Resume preview not found. Please make sure your resume content is visible.');
    return;
  }

  console.log('Starting PDF export...');

  try {
    // Ensure the element is visible and has content
    if (element.offsetHeight === 0 || element.offsetWidth === 0) {
      console.error('Resume preview element has no dimensions');
      alert('Resume preview appears to be empty or hidden. Please check your resume content.');
      return;
    }

    // Wait for any pending renders
    await new Promise(resolve => setTimeout(resolve, 500));

    console.log('Capturing element with html2canvas...');
    console.log('Element dimensions:', element.offsetWidth, 'x', element.offsetHeight);

    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      scrollX: 0,
      scrollY: 0,
      width: element.offsetWidth,
      height: element.offsetHeight,
      logging: false,
      removeContainer: false,
      imageTimeout: 15000,
      foreignObjectRendering: false,
      ignoreElements: (element) => {
        return element.classList?.contains('no-print') || false;
      },
      onclone: (clonedDoc) => {
        console.log('Processing cloned document...');
        const clonedElement = clonedDoc.getElementById('resume-preview');
        if (clonedElement) {
          // Ensure proper styling in cloned document
          clonedElement.style.width = element.offsetWidth + 'px';
          clonedElement.style.height = 'auto';
          clonedElement.style.minHeight = element.offsetHeight + 'px';
          clonedElement.style.fontFamily = 'Arial, sans-serif';
          clonedElement.style.fontSize = '11px';
          clonedElement.style.lineHeight = '1.4';
          clonedElement.style.backgroundColor = '#ffffff';
          clonedElement.style.color = '#000000';
          clonedElement.style.padding = '20mm';
          clonedElement.style.boxSizing = 'border-box';
          
          // Fix any potential styling issues
          const allElements = clonedElement.querySelectorAll('*');
          allElements.forEach(el => {
            const htmlEl = el as HTMLElement;
            htmlEl.style.boxSizing = 'border-box';
            if (htmlEl.style.color === 'rgb(0, 0, 0)' || htmlEl.style.color === '#000') {
              htmlEl.style.color = '#000000';
            }
          });
          
          console.log('Cloned element configured');
        }
      }
    });

    console.log('Canvas created successfully:', canvas.width, 'x', canvas.height);

    if (canvas.width === 0 || canvas.height === 0) {
      console.error('Canvas has no dimensions');
      alert('Failed to capture resume content. Please try again.');
      return;
    }

    const imgData = canvas.toDataURL('image/png', 1.0);
    console.log('Image data created, length:', imgData.length);

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
    
    console.log('PDF dimensions calculated:', imgWidth, 'x', imgHeight);

    // Add the image to PDF
    if (imgHeight <= pdfHeight) {
      // Content fits in one page
      console.log('Adding single page to PDF');
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
    } else {
      // Content requires multiple pages
      console.log('Adding multiple pages to PDF');
      let heightLeft = imgHeight;
      let position = 0;
      let pageNumber = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;
      pageNumber++;

      // Add additional pages if needed
      while (heightLeft > 20) { // 20mm threshold to avoid nearly empty pages
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pdfHeight;
        pageNumber++;
        
        // Safety limit to prevent infinite pages
        if (pageNumber > 5) {
          console.warn('Reached maximum page limit');
          break;
        }
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

    console.log('Saving PDF...');
    pdf.save(`${filename}.pdf`);
    
    console.log('PDF exported successfully');
    alert('PDF exported successfully!');
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF. Please check the console for details and try again.');
    throw error;
  }
};
