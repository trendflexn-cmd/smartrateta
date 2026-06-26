/* ===========================
   Smart Rate - Calculator Utilities
   =========================== */

// Common calculator functions

// EMI Calculator
function calculateEMI(principal, rate, tenure) {
  const monthlyRate = rate / 12 / 100;
  const months = tenure * 12;
  
  if (monthlyRate === 0) {
    return principal / months;
  }
  
  const emi = principal * 
    (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
    (Math.pow(1 + monthlyRate, months) - 1);
  
  const totalAmount = emi * months;
  const totalInterest = totalAmount - principal;
  
  return {
    emi: Math.round(emi * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100
  };
}

// Compound Interest Calculator
function calculateCompoundInterest(principal, rate, time, frequency = 12) {
  const amount = principal * Math.pow(1 + (rate / 100) / frequency, frequency * time);
  const interest = amount - principal;
  
  return {
    amount: Math.round(amount * 100) / 100,
    interest: Math.round(interest * 100) / 100
  };
}

// Simple Interest Calculator
function calculateSimpleInterest(principal, rate, time) {
  const interest = (principal * rate * time) / 100;
  const amount = principal + interest;
  
  return {
    amount: Math.round(amount * 100) / 100,
    interest: Math.round(interest * 100) / 100
  };
}

// Salary Breakdown Calculator
function calculateSalaryBreakdown(basicSalary, da = 0, hra = 0, bonus = 0, deductions = 0) {
  const grossSalary = basicSalary + da + hra + bonus;
  const netSalary = grossSalary - deductions;
  const inHandSalary = basicSalary + da + hra - deductions;
  
  return {
    basicSalary: Math.round(basicSalary * 100) / 100,
    da: Math.round(da * 100) / 100,
    hra: Math.round(hra * 100) / 100,
    bonus: Math.round(bonus * 100) / 100,
    grossSalary: Math.round(grossSalary * 100) / 100,
    deductions: Math.round(deductions * 100) / 100,
    netSalary: Math.round(netSalary * 100) / 100,
    inHandSalary: Math.round(inHandSalary * 100) / 100
  };
}

// Tax Estimation
function calculateTax(income, taxBrackets = null) {
  // Default brackets (can be customized per country)
  if (!taxBrackets) {
    taxBrackets = [
      { limit: 250000, rate: 0 },
      { limit: 500000, rate: 5 },
      { limit: 750000, rate: 10 },
      { limit: 1000000, rate: 20 },
      { limit: Infinity, rate: 30 }
    ];
  }
  
  let tax = 0;
  let previousLimit = 0;
  
  for (let bracket of taxBrackets) {
    if (income > bracket.limit) {
      tax += (bracket.limit - previousLimit) * bracket.rate / 100;
      previousLimit = bracket.limit;
    } else {
      tax += (income - previousLimit) * bracket.rate / 100;
      break;
    }
  }
  
  return Math.round(tax * 100) / 100;
}

// Profit Margin Calculator
function calculateProfitMargin(costPrice, sellingPrice) {
  const profit = sellingPrice - costPrice;
  const marginPercent = (profit / costPrice) * 100;
  const markupPercent = (profit / sellingPrice) * 100;
  
  return {
    profit: Math.round(profit * 100) / 100,
    marginPercent: Math.round(marginPercent * 100) / 100,
    markupPercent: Math.round(markupPercent * 100) / 100
  };
}

// Break Even Calculator
function calculateBreakEven(fixedCosts, variableCostPerUnit, pricePerUnit) {
  const contributionMargin = pricePerUnit - variableCostPerUnit;
  
  if (contributionMargin <= 0) {
    return { units: 0, revenue: 0, message: 'Price must be greater than variable cost' };
  }
  
  const breakEvenUnits = Math.ceil(fixedCosts / contributionMargin);
  const breakEvenRevenue = breakEvenUnits * pricePerUnit;
  
  return {
    units: breakEvenUnits,
    revenue: Math.round(breakEvenRevenue * 100) / 100
  };
}

// Retirement Calculator
function calculateRetirement(currentAge, retirementAge, currentSavings, monthlyContribution, 
                            annualReturn = 7, annualInflation = 3, expectedLifeSpan = 85) {
  const years = retirementAge - currentAge;
  const monthlyRate = annualReturn / 12 / 100;
  const months = years * 12;
  
  // Calculate corpus at retirement
  let corpus = currentSavings * Math.pow(1 + monthlyRate, months);
  
  const emiCalc = monthlyContribution * 
    (Math.pow(1 + monthlyRate, months) - 1) / 
    monthlyRate;
  
  corpus += emiCalc;
  
  // Calculate post-retirement withdrawal period
  const retirementYears = expectedLifeSpan - retirementAge;
  const monthlyInflation = annualInflation / 12 / 100;
  
  // Inflation-adjusted requirement
  let monthlyRequirement = 0;
  let totalWithdrawn = 0;
  
  for (let i = 0; i < retirementYears * 12; i++) {
    const withdrawn = corpus * 0.05 / 12; // 5% annual withdrawal rate
    totalWithdrawn += withdrawn;
  }
  
  return {
    corpusAtRetirement: Math.round(corpus * 100) / 100,
    totalWithdrawn: Math.round(totalWithdrawn * 100) / 100,
    yearsOfRetirement: retirementYears
  };
}

// Investment Growth Calculator
function calculateInvestmentGrowth(principal, annualReturn, years, compoundFrequency = 12) {
  const rate = annualReturn / 100;
  const finalAmount = principal * Math.pow(1 + rate / compoundFrequency, compoundFrequency * years);
  const gain = finalAmount - principal;
  
  return {
    finalAmount: Math.round(finalAmount * 100) / 100,
    gain: Math.round(gain * 100) / 100,
    totalReturn: Math.round((gain / principal) * 100 * 100) / 100
  };
}

// Savings Goal Calculator
function calculateSavingsGoal(targetAmount, currentAmount, monthlyContribution, annualReturn = 7) {
  const remaining = targetAmount - currentAmount;
  
  if (remaining <= 0) {
    return { months: 0, targetReached: true };
  }
  
  const monthlyRate = annualReturn / 12 / 100;
  
  let balance = currentAmount;
  let months = 0;
  
  while (balance < targetAmount && months < 600) { // max 50 years
    balance = balance * (1 + monthlyRate) + monthlyContribution;
    months++;
  }
  
  return {
    months: months,
    years: Math.floor(months / 12),
    finalAmount: Math.round(balance * 100) / 100
  };
}

// Currency Conversion
function convertCurrency(amount, fromRate, toRate) {
  const converted = amount * (toRate / fromRate);
  return Math.round(converted * 100) / 100;
}

// Percentage Calculator
function calculatePercentage(value, percentage) {
  return Math.round((value * percentage / 100) * 100) / 100;
}

function calculatePercentageOf(value, total) {
  return Math.round((value / total * 100) * 100) / 100;
}

// Discount Calculator
function calculateDiscount(originalPrice, discountPercent) {
  const discountAmount = calculatePercentage(originalPrice, discountPercent);
  const finalPrice = originalPrice - discountAmount;
  
  return {
    discountAmount: Math.round(discountAmount * 100) / 100,
    finalPrice: Math.round(finalPrice * 100) / 100,
    savingsPercent: discountPercent
  };
}

// Mark-up Calculator
function calculateMarkup(costPrice, markupPercent) {
  const markupAmount = calculatePercentage(costPrice, markupPercent);
  const sellingPrice = costPrice + markupAmount;
  
  return {
    markupAmount: Math.round(markupAmount * 100) / 100,
    sellingPrice: Math.round(sellingPrice * 100) / 100
  };
}

// Loan Affordability
function calculateLoanAffordability(monthlyIncome, existingEmis = 0, dtiRatio = 0.4) {
  const availableForEmi = (monthlyIncome * dtiRatio) - existingEmis;
  
  if (availableForEmi <= 0) {
    return { maxLoan: 0, message: 'You may not be eligible for a new loan' };
  }
  
  // Assuming 8% annual interest for 5 years
  const monthlyRate = 0.08 / 12;
  const months = 60;
  
  const maxLoan = availableForEmi * 
    (Math.pow(1 + monthlyRate, months) - 1) / 
    (monthlyRate * Math.pow(1 + monthlyRate, months));
  
  return {
    maxLoan: Math.round(maxLoan * 100) / 100,
    availableEmi: Math.round(availableForEmi * 100) / 100
  };
}

// Debt Payoff Calculator
function calculateDebtPayoff(totalDebt, monthlyPayment, annualRate = 0) {
  if (monthlyPayment <= 0) return { months: 0, message: 'Invalid payment amount' };
  
  const monthlyRate = annualRate / 12 / 100;
  let balance = totalDebt;
  let months = 0;
  let totalInterest = 0;
  
  while (balance > 0 && months < 600) {
    const interest = balance * monthlyRate;
    const principal = monthlyPayment - interest;
    
    if (principal <= 0) {
      return { 
        months: 0, 
        message: 'Monthly payment must cover interest' 
      };
    }
    
    balance -= principal;
    totalInterest += interest;
    months++;
  }
  
  return {
    months: months,
    years: Math.floor(months / 12),
    months_remainder: months % 12,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalPaid: Math.round((totalDebt + totalInterest) * 100) / 100
  };
}

// Export functions
window.Calculators = {
  calculateEMI,
  calculateCompoundInterest,
  calculateSimpleInterest,
  calculateSalaryBreakdown,
  calculateTax,
  calculateProfitMargin,
  calculateBreakEven,
  calculateRetirement,
  calculateInvestmentGrowth,
  calculateSavingsGoal,
  convertCurrency,
  calculatePercentage,
  calculatePercentageOf,
  calculateDiscount,
  calculateMarkup,
  calculateLoanAffordability,
  calculateDebtPayoff
};
