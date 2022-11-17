import React, {useLayoutEffect, useContext} from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import {ExpensesContent} from '../store/expenses-context';

const AllExpenses = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'All Expenses',
      tabBarLabel: 'All',
    });
  }, [navigation]);
  const expensesCtx = useContext(ExpensesContent);
  return (
    <ExpensesOutput
      expensesPeriod={'Total'}
      expenses={expensesCtx.expenses}
      fallBackText="No registered expenses found!"
    />
  );
};

export default AllExpenses;
