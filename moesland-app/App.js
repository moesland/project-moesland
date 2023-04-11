import React, { useState, useEffect } from 'react';
import ToolbarView from './src/components/ToolbarView';
import NewsItemListView from './src/containers/NewsItemListView';
import NewsItemDetailView from './src/containers/NewsItemDetailView';
import PhotoContentView from './src/containers/PhotoContentView';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  const handleMenuPress = () => {
    // handle the menu press event
  };

  const handleCameraPress = () => {
    
  }

  const [newsItems, setNewsItems] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="NewsFeed"
        screenOptions={({ navigation, route }) => ({
          header: props => (
            <ToolbarView
              {...props}
              showBackButton={route.name !== "NewsFeed"}
              onPressMenu={handleMenuPress}
              onPressCamera={handleCameraPress}
            />
          ),
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: '#50a038',
          },
        })}
      >
        <Stack.Screen name="NewsFeed">
          {props => <NewsItemListView {...props} newsItems={newsItems} />}
        </Stack.Screen>
        <Stack.Screen
          name="NewsDetailPage"
          component={NewsItemDetailView}
        />
        <Stack.Screen
          name="PhotoContentView"
          component={PhotoContentView}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}