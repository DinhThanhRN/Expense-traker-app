import {Icon} from '@rneui/themed';
import React, {useState, useContext, useEffect, useLayoutEffect} from 'react';
import {Text} from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import {ExpensesContent} from '../store/expenses-context';
import {fetchExpense} from '../utils/http';

const RecentExpenses = ({navigation}) => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const expensesCtx = useContext(ExpensesContent);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Recent Expenses',
      tabBarLabel: 'Recent',
      tabBarIcon: ({color, size}) => (
        <Icon name="list-alt" color={color} size={size} />
      ),
    });
  }, [navigation]);
  useEffect(() => {
    const getExpense = async () => {
      setIsFetching(true);
      try {
        const expenses = await fetchExpense();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError('Could not fetch expenses');
      }
      setIsFetching(false);
    };
    getExpense();
  }, []);

  const handleError = () => {
    setError(null);
  };

  if (error) {
    return <ErrorOverlay message={error} onConfirm={handleError} />;
  }
  if (isFetching) {
    return <LoadingOverlay />;
  }

  const recentExpenses = expensesCtx.expenses.filter(expense => {
    const today = new Date();
    const getDateMinusDays = (date, days) => {
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() - days,
      );
    };
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallBackText="No expenses registered for the last 7 days"
    />
  );
};

export default RecentExpenses;
