import {Icon} from '@rneui/themed';
import React, {useLayoutEffect} from 'react';
import {Text} from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

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
  return <ExpensesOutput expensesPeriod="Last 7 Days" />;
};

export default RecentExpenses;
