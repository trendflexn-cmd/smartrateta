/* ===========================
   Smart Rate - Search Functionality
   =========================== */

// Calculator Database (unchanged)
const calculators = [
  { id: 1, name: 'EMI Calculator', url: '/calculators/emi-calculator.html', category: 'Loans', desc: 'Calculate your monthly EMI for loans' },
  { id: 2, name: 'Loan Affordability', url: '/calculators/loan-affordability.html', category: 'Loans', desc: 'Determine how much loan you can afford' },
  { id: 3, name: 'Interest Calculator', url: '/calculators/interest-calculator.html', category: 'Loans', desc: 'Calculate simple and compound interest' },
  { id: 4, name: 'Mortgage Calculator', url: '/calculators/mortgage-calculator.html', category: 'Loans', desc: 'Plan your mortgage payments' },
  { id: 5, name: 'Debt Payoff Planner', url: '/calculators/debt-payoff-planner.html', category: 'Loans', desc: 'Create a debt payoff strategy' },
  { id: 6, name: 'Salary Breakdown', url: '/calculators/salary-breakdown.html', category: 'Salary', desc: 'Break down your monthly salary' },
  { id: 7, name: 'Tax Estimator', url: '/calculators/tax-estimator.html', category: 'Salary', desc: 'Estimate your income tax' },
  { id: 8, name: 'Overtime Calculator', url: '/calculators/overtime-calculator.html', category: 'Salary', desc: 'Calculate overtime earnings' },
  { id: 9, name: 'Freelancer Income', url: '/calculators/freelancer-income.html', category: 'Salary', desc: 'Track freelance income' },
  { id: 10, name: 'Currency Converter', url: '/calculators/currency-converter.html', category: 'Currency', desc: 'Convert between currencies' },
  { id: 11, name: 'Exchange Rates', url: '/calculators/exchange-rates.html', category: 'Currency', desc: 'View current exchange rates' },
  { id: 12, name: 'Transfer Fee Calculator', url: '/calculators/transfer-fee-calculator.html', category: 'Currency', desc: 'Calculate transfer fees' },
  { id: 13, name: 'Inflation Tracker', url: '/calculators/inflation-tracker.html', category: 'Currency', desc: 'Track inflation impact' },
  { id: 14, name: 'Crypto P/L', url: '/calculators/crypto-profit-loss.html', category: 'Currency', desc: 'Calculate crypto gains/losses' },
  { id: 15, name: 'VAT/GST Calculator', url: '/calculators/vat-gst-calculator.html', category: 'Business', desc: 'Calculate VAT or GST' },
  { id: 16, name: 'Profit Margin', url: '/calculators/profit-margin-calculator.html', category: 'Business', desc: 'Calculate profit margins' },
  { id: 17, name: 'Invoice Estimator', url: '/calculators/invoice-estimator.html', category: 'Business', desc: 'Create invoice estimates' },
  { id: 18, name: 'Startup Cost', url: '/calculators/startup-cost-calculator.html', category: 'Business', desc: 'Estimate startup costs' },
  { id: 19, name: 'Compound Interest', url: '/calculators/compound-interest.html', category: 'Savings', desc: 'Calculate compound interest' },
  { id: 20, name: 'Retirement Calculator', url: '/calculators/retirement-calculator.html', category: 'Savings', desc: 'Plan for retirement' },
  { id: 21, name: 'Investment Growth', url: '/calculators/investment-growth.html', category: 'Savings', desc: 'Project investment growth' },
  { id: 22, name: 'Savings Goal Tracker', url: '/calculators/savings-goal-tracker.html', category: 'Savings', desc: 'Track savings goals' }
];

// Search functionality
function initSearch() {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.querySelector('.search-field .btn'); // the Search button
  const searchResults = document.getElementById('search-results');
  
  if (!searchInput || !searchResults) return;
  
  // Helper to toggle the hidden class based on content
  function updateVisibility() {
    if (searchResults.children.length === 0) {
      searchResults.classList.add('hidden');
    } else {
      searchResults.classList.remove('hidden');
    }
  }

  // Perform search
  function performSearch() {
    const query = searchInput.value.trim().toLowerCase();
    
    if (query.length === 0) {
      searchResults.innerHTML = '';
      updateVisibility();
      return;
    }
    
    const results = searchCalculators(query);
    displaySearchResults(results, searchResults);
    updateVisibility();
  }
  
  // Event: type in the input (live search)
  searchInput.addEventListener('input', performSearch);
  
  // Event: click the Search button
  if (searchButton) {
    searchButton.addEventListener('click', (e) => {
      e.preventDefault();
      performSearch();
    });
  }
  
  // Event: press Enter in the input field
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      performSearch();
    }
  });
  
  // Initial hide (in case the container has no children)
  updateVisibility();
}

// Search calculators (unchanged)
function searchCalculators(query) {
  return calculators.filter(calc => 
    calc.name.toLowerCase().includes(query) ||
    calc.desc.toLowerCase().includes(query) ||
    calc.category.toLowerCase().includes(query)
  );
}

// Display search results (unchanged)
function displaySearchResults(results, container) {
  if (!container) return;
  
  if (results.length === 0) {
    container.innerHTML = `
      <div style="padding: 2rem; text-align: center; color: var(--text-muted);">
        No calculators found. Try a different search.
      </div>
    `;
    return;
  }
  
  container.innerHTML = results.map(calc => `
    <a href="${calc.url}" class="search-result-item" style="
      display: block;
      padding: 1rem;
      border-bottom: 1px solid var(--border-light);
      text-decoration: none;
      color: var(--text-primary);
      transition: var(--transition);
    " onmouseover="this.style.backgroundColor='var(--primary-light)'" onmouseout="this.style.backgroundColor='transparent'">
      <div style="font-weight: 600; color: var(--primary);">${calc.name}</div>
      <div style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.25rem;">${calc.desc}</div>
      <div style="font-size: 0.8rem; color: var(--accent); margin-top: 0.5rem;">${calc.category}</div>
    </a>
  `).join('');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initSearch);