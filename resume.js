document.addEventListener('DOMContentLoaded', () => {
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const pdfViewer = document.getElementById('pdfViewer');
  const pdfPlaceholder = document.getElementById('pdfPlaceholder');

  // Show the PDF once the iframe has loaded.
  // Cross-origin checks can throw in production and incorrectly hide a valid PDF.
  if (pdfViewer && pdfPlaceholder) {
    pdfViewer.style.display = 'block';
    pdfPlaceholder.style.display = 'none';

    pdfViewer.addEventListener('load', () => {
      pdfViewer.style.display = 'block';
      pdfPlaceholder.style.display = 'none';
    });
  }

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
