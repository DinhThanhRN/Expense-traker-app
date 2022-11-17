import {Icon} from '@rneui/themed';
import React, {useCallback, useContext, useLayoutEffect} from 'react';
import {Text} from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import {ExpensesContent} from '../store/expenses-context';

const RecentExpenses = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Recent Expenses',
      tabBarLabel: 'Recent',
      tabBarIcon: ({color, size}) => (
        <Icon name="list-alt" color={color} size={size} />
      ),
    });
  }, [navigation]);
  const expensesCtx = useContext(ExpensesContent);
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
