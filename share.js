/* ===========================
   Smart Rate - Share Functionality
   =========================== */

function shareCalculator(title, description = '', url = '') {
  const currentUrl = url || window.location.href;
  
  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + currentUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + '\n' + currentUrl)}`
  };
}

function initShareButtons() {
  const shareButtons = document.querySelectorAll('.share-btn');
  
  shareButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const platform = btn.classList[1]; // Get the platform class
      const title = document.querySelector('h1')?.textContent || 'Smart Rate Calculator';
      const description = document.querySelector('p')?.textContent || 'Check out this amazing calculator!';
      
      const shareLinks = shareCalculator(title, description);
      const url = shareLinks[platform];
      
      if (platform === 'email') {
        window.location.href = url;
      } else if (url) {
        window.open(url, 'Share', 'width=600,height=400');
      }
    });
  });
}

// Copy result to clipboard
function copyResult(resultValue) {
  const text = typeof resultValue === 'number' ? resultValue.toFixed(2) : resultValue;
  
  navigator.clipboard.writeText(text).then(() => {
    showCopyNotification('Result copied to clipboard!');
  }).catch(err => {
    console.error('Failed to copy:', err);
  });
}

// Show copy notification
function showCopyNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: var(--success);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    z-index: 9999;
    box-shadow: var(--shadow-md);
    animation: slideInRight 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 2000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initShareButtons();
});
