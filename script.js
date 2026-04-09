document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const presentationViewer = document.querySelector('.presentation-viewer');
  if (!presentationViewer) {
    return;
  }

  const frame = presentationViewer.querySelector('.presentation-frame');
  const status = presentationViewer.querySelector('.presentation-status');
  const basePdfSrc = presentationViewer.dataset.pdfSrc;
  let currentPage = Number.parseInt(presentationViewer.dataset.page || '1', 10);

  if (!frame || !status || !basePdfSrc || Number.isNaN(currentPage) || currentPage < 1) {
    return;
  }

  const updateFrame = () => {
    frame.src = `${basePdfSrc}#page=${currentPage}&view=FitH`;
    status.textContent = `Slide ${currentPage}`;
  };

  presentationViewer.addEventListener('click', (event) => {
    const button = event.target.closest('.presentation-arrow');
    if (!button) {
      return;
    }

    const action = button.dataset.action;
    if (action === 'next') {
      currentPage += 1;
    } else if (action === 'prev') {
      currentPage = Math.max(1, currentPage - 1);
    }

    updateFrame();
  });
});
