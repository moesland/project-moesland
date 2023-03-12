import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import ToolbarView from './src/views/ToolbarView';
import NewsItemListView from './src/views/NewsItemListView';
import NewsItemDetailView from './src/views/NewsItemDetailView';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {

  handleMenuPress = () => {
    // handle the menu press event
  };

  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="NewsFeed" component={NewsItemListView} />
        <Stack.Screen name="NewsDetailPage" component={NewsItemDetailView} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});