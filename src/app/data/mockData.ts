export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: TransactionType;
  description: string;
}

export const categories = {
  income: ['Salary', 'Freelance', 'Investment', 'Business', 'Other Income'],
  expense: ['Housing', 'Food', 'Transportation', 'Entertainment', 'Healthcare', 'Shopping', 'Utilities', 'Education', 'Other Expense']
};

export const mockTransactions: Transaction[] = [
  // March 2026
  { id: '1', date: '2026-03-01', amount: 5500, category: 'Salary', type: 'income', description: 'Monthly salary' },
  { id: '2', date: '2026-03-02', amount: 1200, category: 'Housing', type: 'expense', description: 'Rent payment' },
  { id: '3', date: '2026-03-05', amount: 85.50, category: 'Food', type: 'expense', description: 'Grocery shopping' },
  { id: '4', date: '2026-03-07', amount: 45, category: 'Transportation', type: 'expense', description: 'Gas' },
  { id: '5', date: '2026-03-10', amount: 150, category: 'Entertainment', type: 'expense', description: 'Concert tickets' },
  { id: '6', date: '2026-03-12', amount: 65, category: 'Food', type: 'expense', description: 'Restaurant dinner' },
  { id: '7', date: '2026-03-15', amount: 800, category: 'Freelance', type: 'income', description: 'Web design project' },
  { id: '8', date: '2026-03-18', amount: 200, category: 'Healthcare', type: 'expense', description: 'Doctor visit' },
  { id: '9', date: '2026-03-20', amount: 120, category: 'Shopping', type: 'expense', description: 'Clothing' },
  { id: '10', date: '2026-03-22', amount: 95, category: 'Utilities', type: 'expense', description: 'Electric bill' },
  { id: '11', date: '2026-03-25', amount: 75, category: 'Food', type: 'expense', description: 'Grocery shopping' },
  { id: '12', date: '2026-03-28', amount: 50, category: 'Entertainment', type: 'expense', description: 'Movie & snacks' },
  
  // February 2026
  { id: '13', date: '2026-02-01', amount: 5500, category: 'Salary', type: 'income', description: 'Monthly salary' },
  { id: '14', date: '2026-02-03', amount: 1200, category: 'Housing', type: 'expense', description: 'Rent payment' },
  { id: '15', date: '2026-02-05', amount: 90, category: 'Food', type: 'expense', description: 'Grocery shopping' },
  { id: '16', date: '2026-02-08', amount: 40, category: 'Transportation', type: 'expense', description: 'Gas' },
  { id: '17', date: '2026-02-10', amount: 250, category: 'Shopping', type: 'expense', description: 'Electronics' },
  { id: '18', date: '2026-02-12', amount: 600, category: 'Freelance', type: 'income', description: 'Consulting work' },
  { id: '19', date: '2026-02-15', amount: 180, category: 'Education', type: 'expense', description: 'Online course' },
  { id: '20', date: '2026-02-18', amount: 70, category: 'Food', type: 'expense', description: 'Grocery shopping' },
  { id: '21', date: '2026-02-20', amount: 100, category: 'Utilities', type: 'expense', description: 'Internet & phone' },
  { id: '22', date: '2026-02-25', amount: 300, category: 'Investment', type: 'income', description: 'Dividend payment' },
  
  // January 2026
  { id: '23', date: '2026-01-01', amount: 5500, category: 'Salary', type: 'income', description: 'Monthly salary' },
  { id: '24', date: '2026-01-02', amount: 1200, category: 'Housing', type: 'expense', description: 'Rent payment' },
  { id: '25', date: '2026-01-05', amount: 95, category: 'Food', type: 'expense', description: 'Grocery shopping' },
  { id: '26', date: '2026-01-08', amount: 50, category: 'Transportation', type: 'expense', description: 'Gas' },
  { id: '27', date: '2026-01-10', amount: 500, category: 'Shopping', type: 'expense', description: 'New laptop' },
  { id: '28', date: '2026-01-12', amount: 1000, category: 'Freelance', type: 'income', description: 'App development' },
  { id: '29', date: '2026-01-15', amount: 85, category: 'Food', type: 'expense', description: 'Restaurant' },
  { id: '30', date: '2026-01-18', amount: 150, category: 'Healthcare', type: 'expense', description: 'Pharmacy' },
  { id: '31', date: '2026-01-20', amount: 90, category: 'Utilities', type: 'expense', description: 'Electric & water' },
  { id: '32', date: '2026-01-25', amount: 200, category: 'Entertainment', type: 'expense', description: 'Weekend trip' },
  { id: '33', date: '2026-01-28', amount: 80, category: 'Food', type: 'expense', description: 'Grocery shopping' },
  
  // April 2026 (current month)
  { id: '34', date: '2026-04-01', amount: 5500, category: 'Salary', type: 'income', description: 'Monthly salary' },
  { id: '35', date: '2026-04-02', amount: 1200, category: 'Housing', type: 'expense', description: 'Rent payment' },
];
