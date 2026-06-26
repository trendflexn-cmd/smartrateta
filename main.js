/* ===========================
   Smart Rate - Main JavaScript
   =========================== */

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.navbar-nav');
const themeToggle = document.querySelector('.theme-toggle');
const backToTop = document.querySelector('.back-to-top');
const body = document.body;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initBackToTop();
  initSmoothScroll();
});

// Navbar Toggle
function initNavbar() {
  if (!hamburger) return;
  
  hamburger.addEventListener('click', () => {
    navbar.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
  
  // Close menu when clicking on a link
  const navLinks = navbar?.querySelectorAll('a');
  navLinks?.forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });
}

// Dark Mode Theme – respects system preference, manual override
function initTheme() {
  // 1. Check if user already manually picked a theme (stored)
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme, false); // don't save again, already stored
  } else {
    // 2. No manual preference → follow system setting
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light', false);
  }
  
  // 3. Listen for system theme changes (only if user hasn't overridden)
  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  darkModeMediaQuery.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light', false);
    }
  });

  // 4. Toggle button: manual override, save preference
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = body.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      setTheme(newTheme, true);
    });
  }
}

function setTheme(theme, save = true) {
  body.setAttribute('data-theme', theme);
  if (save) {
    localStorage.setItem('theme', theme);
  }
  if (themeToggle) {
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
  }
}

// Back to Top Button
function initBackToTop() {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop?.classList.add('show');
    } else {
      backToTop?.classList.remove('show');
    }
  });
  
  backToTop?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Smooth Scrolling
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe cards and sections
function initObserver() {
  document.querySelectorAll('.card, .category-item, .faq-item').forEach(el => {
    observer.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', initObserver);

// Utility Functions
function parseNumberInput(value) {
  // Remove all commas and whitespace, then parse
  const cleanedValue = String(value).replace(/,/g, '').trim();
  return parseFloat(cleanedValue) || 0;
}

function formatCurrency(value) {
  // Format as number without currency symbol using standard international format
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(value);
}

// Calculate percentage of a value
function calculatePercentage(value, percent) {
  return (value * percent) / 100;
}

function formatNumber(value) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(value);
}

function formatPercent(value) {
  return value.toFixed(2) + '%';
}

// Debounce function
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// Form Validation
function validateForm(inputs) {
  let isValid = true;
  
  inputs.forEach(input => {
    const value = input.value.trim();
    const formGroup = input.closest('.form-group');
    
    if (!value) {
      formGroup?.classList.add('error');
      const errorMsg = formGroup?.querySelector('.form-error');
      if (errorMsg) errorMsg.textContent = 'This field is required';
      isValid = false;
    } else if (input.type === 'number' && isNaN(value)) {
      formGroup?.classList.add('error');
      const errorMsg = formGroup?.querySelector('.form-error');
      if (errorMsg) errorMsg.textContent = 'Please enter a valid number';
      isValid = false;
    } else {
      formGroup?.classList.remove('error');
    }
  });
  
  return isValid;
}

// Clear form
function clearForm(form) {
  form.reset();
  form.querySelectorAll('.form-group').forEach(group => {
    group.classList.remove('error');
  });
  
  const resultsDiv = form.nextElementSibling;
  if (resultsDiv?.classList.contains('calculator-results')) {
    resultsDiv.classList.remove('show');
  }
}

// Show results
function showResults(resultsDiv) {
  resultsDiv.classList.add('show');
  resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Copy to clipboard
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    // Success feedback
    const notification = document.createElement('div');
    notification.textContent = 'Copied to clipboard!';
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--success);
      color: white;
      padding: 1rem;
      border-radius: 0.5rem;
      z-index: 9999;
      animation: fadeIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 2000);
  });
}

// Export functions for calculator pages
window.SmartRate = {
  formatCurrency,
  formatNumber,
  formatPercent,
  calculatePercentage,
  validateForm,
  clearForm,
  showResults,
  copyToClipboard,
  parseNumberInput,
  debounce
};
