import React, { useState, useEffect } from 'react';
import ToolbarView from './src/views/ToolbarView';
import NewsItemListView from './src/views/NewsItemListView';
import NewsItemDetailView from './src/views/NewsItemDetailView';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { fetchNewsItems } from './src/models/NewsItemApi';

const Stack = createStackNavigator();

export default function App() {
  const handleMenuPress = () => {
    // handle the menu press event
  };

  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    async function loadNewsItems() {
      const apiUrl = './apitest.json'; // or use the actual API endpoint URL
      const items = await fetchNewsItems(apiUrl);
      setNewsItems(items);
    }

    loadNewsItems();
  }, []);

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
