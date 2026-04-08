document.addEventListener('DOMContentLoaded', () => {
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const pdfViewer = document.getElementById('pdfViewer');
  const pdfPlaceholder = document.getElementById('pdfPlaceholder');

  // Check if PDF exists and show/hide placeholder
  const checkPdfLoaded = () => {
    // Try to detect if PDF iframe loaded successfully
    try {
      if (pdfViewer.contentDocument || pdfViewer.contentWindow?.document) {
        pdfPlaceholder.style.display = 'none';
        pdfViewer.style.display = 'block';
      }
    } catch (e) {
      // PDF not available, keep placeholder visible
      pdfViewer.style.display = 'none';
      pdfPlaceholder.style.display = 'flex';
    }
  };

  // Check on load
  pdfViewer.addEventListener('load', checkPdfLoaded);
  setTimeout(checkPdfLoaded, 1000);

  // Fullscreen functionality
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      const container = document.querySelector('.pdf-container');
      if (container.requestFullscreen) {
        container.requestFullscreen().catch(err => {
          console.error('Could not enter fullscreen:', err);
        });
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      }
    });
  }
});
