import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MOESLAND_GREEN } from './src/constants/colors';
import NewsItemListView from './src/containers/NewsItemListView';
import ToolbarView from './src/components/ToolbarView';
// import CalendarView from './CalendarView';
import MediaView from './src/containers/MediaView';
// import VotingView from './VotingView';
// import ContactView from './ContactView';
// import ToolbarView from './ToolbarView';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const handleMenuPress = () => {
    // handle the menu press event
  };

  const [newsItems, setNewsItems] = useState([]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Nieuws"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
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
              showBackButton={route.name !== 'Nieuws'}
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
        <Tab.Screen name="Nieuws">
          {props => <NewsItemListView {...props} newsItems={newsItems} />}
        </Tab.Screen>
        <Tab.Screen name="Agenda" component={MediaView} />
        <Tab.Screen name="Media" component={MediaView} />
        <Tab.Screen name="Stemmen" component={MediaView} />
        <Tab.Screen name="Contact" component={MediaView} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}