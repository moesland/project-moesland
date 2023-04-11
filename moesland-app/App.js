import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MOESLAND_GREEN } from './src/constants/colors';
import NewsItemListView from './src/routes/NewsItemListView';
import NewsItemDetailView from './src/routes/NewsItemDetailView'
import ToolbarView from './src/components/ToolbarView';
import MediaView from './src/routes/MediaView';
import CalendarView from './src/routes/CalendarView';
import VotingView from './src/routes/VotingView';
import ContactView from './src/routes/ContactView';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  function NewsStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="NewsItemListView" component={NewsItemListView} />
        <Stack.Screen name="NewsItemDetailView" component={NewsItemDetailView} />
      </Stack.Navigator>
    );
  }
  
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Nieuws"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;

            if (route.name === 'Nieuws') {
              iconName = focused ? 'newspaper' : 'newspaper-outline';
            } else if (route.name === 'Agenda') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'Media') {
              iconName = focused ? 'camera' : 'camera-outline';
            } else if (route.name === 'Stemmen') {
              iconName = focused ? 'thumbs-up' : 'thumbs-up-outline';
            } else if (route.name === 'Contact') {
              iconName = focused ? 'mail' : 'mail-outline';
            }

            return <Ionicons name={iconName} size={25} color={MOESLAND_GREEN} />;
          },
          tabBarActiveTintColor: '#50a038',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#f2f2f2',
          },
          header: props => (
            <ToolbarView
              {...props}
              showBackButton={route.name === 'NewsDetailPage'}
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
        <Tab.Screen name="Nieuws" component={NewsStack} />
        <Tab.Screen name="Agenda" component={CalendarView} />
        <Tab.Screen name="Media" component={MediaView} />
        <Tab.Screen name="Stemmen" component={VotingView} />
        <Tab.Screen name="Contact" component={ContactView} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}