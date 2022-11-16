import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import AllExpenses from './src/screens/AllExpenses';
import RecentExpenses from './src/screens/RecentExpenses';
import ManageExpense from './src/screens/ManageExpense';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GlobalStyles} from './src/utils/styles';

const BottomTabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ExpensesOverview = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
        headerTintColor: 'white',
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
          height: 60,
        },
        tabBarLabelStyle: {fontSize: 16, fontWeight: 'bold'},
        tabBarActiveColor: GlobalStyles.accent500,
        // headerRight: () => {

        // }
      }}>
      <BottomTabs.Screen name="RecentExpenses" component={RecentExpenses} />
      <BottomTabs.Screen name="AllExpenses" component={AllExpenses} />
    </BottomTabs.Navigator>
  );
};

const App = () => {
  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ExpensesOverview"
            component={ExpensesOverview}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="ManageExpense" component={ManageExpense} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
