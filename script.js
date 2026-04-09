const extractYouTubeVideoId = (url) => {
  if (!url) {
    return null;
  }

  try {
    const parsedUrl = new URL(url);
    const host = parsedUrl.hostname.replace('www.', '');

    if (host === 'youtu.be') {
      return parsedUrl.pathname.split('/').filter(Boolean)[0] || null;
    }

    if (host.includes('youtube.com')) {
      if (parsedUrl.pathname === '/watch') {
        return parsedUrl.searchParams.get('v');
      }

      if (parsedUrl.pathname.startsWith('/shorts/')) {
        return parsedUrl.pathname.split('/')[2] || null;
      }

      if (parsedUrl.pathname.startsWith('/embed/')) {
        return parsedUrl.pathname.split('/')[2] || null;
      }
    }
  } catch (error) {
    return null;
  }

  return null;
};

document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const presentationViewer = document.querySelector('.presentation-viewer');
  if (presentationViewer) {
    const frame = presentationViewer.querySelector('.presentation-frame');
    const status = presentationViewer.querySelector('.presentation-status');
    const basePdfSrc = presentationViewer.dataset.pdfSrc;
    let currentPage = Number.parseInt(presentationViewer.dataset.page || '1', 10);

    if (frame && status && basePdfSrc && !Number.isNaN(currentPage) && currentPage > 0) {
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
    }
  }

});
