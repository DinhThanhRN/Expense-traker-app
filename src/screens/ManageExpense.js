import React, {useLayoutEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from '../components/UI/Button';

import IconButton from '../components/UI/IconButton';
import {GlobalStyles} from '../utils/styles';

const ManageExpense = ({route, navigation}) => {
  const editedExpenseId = route.params?.expenseId;
  const isEditting = !!editedExpenseId;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditting ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditting]);

  const handleDeleteExpense = () => {};
  const handleCancel = () => {
    navigation.goBack();
  };
  const handleConfirm = () => {};
  return (
    <View style={styles.container}>
      <View style={styles.extraButton}>
        <Button style={styles.button} mode="flat" onPress={handleCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={handleConfirm}>
          {isEditting ? 'Update' : 'Add'}
        </Button>
      </View>
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
  extraButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
