import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

import Colors from '../constants/Colors';

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
      navigationOptions: {
        headerTitle: "Meal Categories"
      }
    },
    CategoryMeals: {
      screen: CategoryMealsScreen
    },
    MealDetail: MealDetailScreen // Shorthand for object with screen above
  },
  {
    // Stack Navigator Configuration
    // initialRouteName: 'Categories', <-- initial route defaults to first in object above
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primaryColor : ""
      },
      headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor
    }
  }
);

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons
            name="ios-restaurant"
            size={25}
            color={tabInfo.tintColor}
          />
        );
      },
      tabBarColor: Colors.primaryColor
    }
  },
  Favorites: {
    screen: FavoritesScreen,
    navigationOptions: {
      // tabBarLabel: 'Favorites!', <-- Defaults to 'Favorites' key above
      tabBarIcon: tabInfo => {
        return (
          <Ionicons
            name="ios-star"
            size={25}
            color={tabInfo.tintColor}
          />
        );
      },
      tabBarColor: Colors.accentColor
    }
  }
}

const MealsFavoriteTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
      activeColor: 'white',
      shifting: true, // Adds animation on changing tabs
      barStyle: {
        backgroundColor: Colors.primaryColor
      }
    })
    : createBottomTabNavigator(tabScreenConfig, {
        // Tab Navigator Configuration
        tabBarOptions: {
          activeTintColor: Colors.accentColor // Active tab color
        }
      });

export default createAppContainer(MealsFavoriteTabNavigator);
