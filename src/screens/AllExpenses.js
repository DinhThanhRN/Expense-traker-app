import React, {useLayoutEffect} from 'react';
import {Text} from 'react-native';
import {Icon} from '@rneui/themed';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

const AllExpenses = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'All Expenses',
      tabBarLabel: 'All',
      tabBarIcon: ({color, size}) => (
        <Icon name="filter-list-alt" color={color} size={size} />
      ),
    });
  }, [navigation]);

  return <ExpensesOutput expensesPeriod={'Total'} />;
};

export default AllExpenses;
