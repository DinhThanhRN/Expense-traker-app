import React, {useContext, useLayoutEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import ErrorOverlay from '../components/UI/ErrorOverlay';

import IconButton from '../components/UI/IconButton';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import {ExpensesContent} from '../store/expenses-context';
import {deleteExpense, storeExpense, updateExpense} from '../utils/http';
import {GlobalStyles} from '../utils/styles';

const ManageExpense = ({route, navigation}) => {
  const [isSummitting, setIsSummitting] = useState(false);
  const [error, setError] = useState();
  const expensesCtx = useContext(ExpensesContent);

  const editedExpenseId = route.params?.expenseId;
  const isEditting = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses.find(
    expense => expense.id === editedExpenseId,
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditting ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditting]);

  const handleDeleteExpense = async () => {
    try {
      setIsSummitting(true);
      await deleteExpense(editedExpenseId);
      expensesCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError('Could not delete expenses - please try again later!');
      setIsSummitting(false);
    }
  };
  const handleCancel = () => {
    navigation.goBack();
  };
  const handleConfirm = async expenseData => {
    setIsSummitting(true);
    try {
      if (isEditting) {
        expensesCtx.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({...expenseData, id: id});
      }
      navigation.goBack();
    } catch (error) {
      setError('Could not save data - please try again later!');
      setIsSummitting(false);
    }
  };

  const handleError = () => {
    setError(null);
  };
  if (error && !isSummitting) {
    return <ErrorOverlay message={error} onConfirm={handleError} />;
  }
  if (isSummitting) return <LoadingOverlay />;
  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={handleCancel}
        onSummit={handleConfirm}
        summitButtonLabel={isEditting ? 'Update' : 'Add'}
        defaultValues={selectedExpense}
      />

      {isEditting && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="delete"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={handleDeleteExpense}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
