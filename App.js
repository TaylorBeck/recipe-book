import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { enableScreens } from 'react-native-screens'
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import MealsNavigator from './navigation/MealsNavigator';
import mealsReducer from './store/reducers/meals';

// Enables native screen elements - UIViewController, Fragment
enableScreens();

/* REDUX */
const rootReducer = combineReducers({
  meals: mealsReducer
});

const store = createStore(rootReducer); // Passed into Provider

export default function App() {
  let [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <Provider store={store}>
        <MealsNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontFamily: 'open-sans-bold'
  }
});
