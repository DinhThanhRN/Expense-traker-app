import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {GlobalStyles} from '../../utils/styles';
import ExpensesList from './ExpensesList';
import ExpensesSumary from './ExpensesSumary';

const ExpensesOutput = ({expenses, expensesPeriod, fallBackText}) => {
  let content = <Text style={styles.inforText}>{fallBackText}</Text>;
  if (expenses.length > 0)
    content = (
      <ExpensesSumary expenses={expenses} periodName={expensesPeriod} />
    );
  return (
    <View style={styles.container}>
      {content}
      <ExpensesList expenses={expenses} />
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  inforText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});
