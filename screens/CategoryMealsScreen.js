import React from 'react';

import { CATEGORIES, MEALS } from '../data/dummy-data';
import MealList from '../components/MealList';

const CategoryMealsScreen = props => {
  // Category id is passed through navigation params
  const categoryId = props.navigation.getParam('categoryId');

  const displayedMeals = MEALS.filter(meal =>
    meal.categoryIds.indexOf(categoryId) >= 0 // Use indexOf to check existence of categoryId in array
  );

  return (
    <MealList listData={displayedMeals} navigation={props.navigation} />
  );
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
  const categoryId = navigationData.navigation.getParam('categoryId');
  const selectedCategory = CATEGORIES.find(category => category.id === categoryId);

  return {
    headerTitle: selectedCategory.title
  };
};

export default CategoryMealsScreen;
