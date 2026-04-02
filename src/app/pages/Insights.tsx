import { useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, Calendar, PieChart } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export function Insights() {
  const { transactions } = useFinance();

  const insights = useMemo(() => {
    // Highest spending category
    const categoryTotals = new Map<string, number>();
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        categoryTotals.set(t.category, (categoryTotals.get(t.category) || 0) + t.amount);
      });

    const highestCategory = Array.from(categoryTotals.entries())
      .sort((a, b) => b[1] - a[1])[0];

    // Monthly comparison (last 3 months)
    const monthlyData = new Map<string, { income: number; expenses: number }>();

    transactions.forEach(t => {
      const date = new Date(t.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      if (!monthlyData.has(monthKey)) {
        monthlyData.set(monthKey, { income: 0, expenses: 0 });
      }

      const data = monthlyData.get(monthKey)!;
      if (t.type === 'income') {
        data.income += t.amount;
      } else {
        data.expenses += t.amount;
      }
    });

    const monthlyComparison = Array.from(monthlyData.entries())
      .map(([month, data]) => ({
        month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        monthKey: month,
        income: data.income,
        expenses: data.expenses,
        savings: data.income - data.expenses,
      }))
      .sort((a, b) => a.monthKey.localeCompare(b.monthKey))
      .slice(-3);

    // Average transaction amount
    const expenseTransactions = transactions.filter(t => t.type === 'expense');
    const avgExpense = expenseTransactions.length > 0
      ? expenseTransactions.reduce((sum, t) => sum + t.amount, 0) / expenseTransactions.length
      : 0;

    // Savings rate
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

    // Top 5 largest transactions
    const largestTransactions = [...transactions]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);

    return {
      highestCategory,
      monthlyComparison,
      avgExpense,
      savingsRate,
      largestTransactions,
    };
  }, [transactions]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Insights</h1>
        <p className="text-gray-600 mt-1">Analysis and observations from your financial data</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <PieChart className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">Top Spending Category</p>
                <p className="text-xl font-bold mt-1">
                  {insights.highestCategory ? insights.highestCategory[0] : 'N/A'}
                </p>
                {insights.highestCategory && (
                  <p className="text-sm text-gray-600 mt-1">
                    ${insights.highestCategory[1].toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">Avg. Expense</p>
                <p className="text-xl font-bold mt-1">
                  ${insights.avgExpense.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-sm text-gray-600 mt-1">Per transaction</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg ${insights.savingsRate >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                {insights.savingsRate >= 0 ? (
                  <TrendingUp className="h-6 w-6 text-green-600" />
                ) : (
                  <TrendingDown className="h-6 w-6 text-red-600" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">Savings Rate</p>
                <p className="text-xl font-bold mt-1">
                  {insights.savingsRate.toFixed(1)}%
                </p>
                <p className="text-sm text-gray-600 mt-1">Of total income</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">Total Transactions</p>
                <p className="text-xl font-bold mt-1">{transactions.length}</p>
                <p className="text-sm text-gray-600 mt-1">All time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Comparison (Last 3 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          {insights.monthlyComparison.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={insights.monthlyComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="income" fill="#10b981" name="Income" />
                <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                <Bar dataKey="savings" fill="#3b82f6" name="Savings" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              No data available
            </div>
          )}
        </CardContent>
      </Card>

      {/* Observations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Key Observations */}
        <Card>
          <CardHeader>
            <CardTitle>Key Observations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {insights.highestCategory && (
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="font-medium text-purple-900">Highest Spending Category</p>
                <p className="text-sm text-purple-700 mt-1">
                  You've spent the most on <strong>{insights.highestCategory[0]}</strong> with a total of{' '}
                  <strong>${insights.highestCategory[1].toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>.
                  Consider reviewing this category for potential savings.
                </p>
              </div>
            )}

            {insights.savingsRate >= 20 && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="font-medium text-green-900">Great Savings Rate!</p>
                <p className="text-sm text-green-700 mt-1">
                  Your savings rate of <strong>{insights.savingsRate.toFixed(1)}%</strong> is excellent.
                  You're managing to save a significant portion of your income.
                </p>
              </div>
            )}

            {insights.savingsRate < 0 && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="font-medium text-red-900">Spending Alert</p>
                <p className="text-sm text-red-700 mt-1">
                  Your expenses are currently exceeding your income. Consider reviewing your spending habits
                  and identifying areas where you can cut back.
                </p>
              </div>
            )}

            {insights.monthlyComparison.length >= 2 && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="font-medium text-blue-900">Monthly Trend</p>
                <p className="text-sm text-blue-700 mt-1">
                  Based on the last {insights.monthlyComparison.length} months, your average monthly savings is{' '}
                  <strong>
                    ${(insights.monthlyComparison.reduce((sum, m) => sum + m.savings, 0) / insights.monthlyComparison.length)
                      .toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </strong>.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Largest Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Largest Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {insights.largestTransactions.map((transaction, index) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{transaction.description}</p>
                      <p className="text-xs text-gray-600">{transaction.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}
                      ${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-gray-600">
                      {new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
