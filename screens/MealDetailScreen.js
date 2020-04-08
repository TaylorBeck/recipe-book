import React from 'react';
import { ScrollView, View, Image, Text, Button, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { MEALS } from '../data/dummy-data';

import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';

const StepItem = props => {
  return (
    <View style={styles.stepItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const IngredientItem = props => {
  return (
    <View style={styles.ingredientItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailsScreen = props => {
  const mealId = props.navigation.getParam('mealId');
  const selectedMeal = MEALS.find(meal => meal.id == mealId);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map(ingredient => (
        <IngredientItem key={ingredient}>{ingredient}</IngredientItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map((step, index) => (
        <StepItem key={step}>{index + 1}. {step}</StepItem>
      ))}
    </ScrollView>
  );
};

MealDetailsScreen.navigationOptions = (navigationData) => {
  const mealId = navigationData.navigation.getParam('mealId');
  const selectedMeal = MEALS.find(meal => meal.id == mealId);

  return {
    headerTitle: selectedMeal.title,
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Favorite"
            iconName="ios-star"
            onPress={() => {
              console.log("MARKED FAVORITE");
            }}
          />
        </HeaderButtons>
      );
    }
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center'
  },
  ingredientItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10 
  },
  stepItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10
  }
});

export default MealDetailsScreen;
