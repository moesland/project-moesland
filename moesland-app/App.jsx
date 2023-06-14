import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MOESLAND_GREEN, FOOTER_BACKGROUND_COLOR } from './src/constants/colors';
import { RootSiblingParent } from 'react-native-root-siblings';
import NewsItemListView from './src/views/NewsItemListView';
import NewsItemDetailView from './src/views/NewsItemDetailView';
import ToolbarView from './src/components/ToolbarView';
import MediaView from './src/views/MediaView';
import AlbumView from './src/views/AlbumView';
import PhotoView from './src/views/PhotoView';
import CalendarView from './src/views/CalendarView';
import VotingView from './src/views/VotingView';
import ContactView from './src/views/ContactView';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  function NewsStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="NewsItemListView" component={NewsItemListView} />
        <Stack.Screen name="NewsItemDetailView" component={NewsItemDetailView} />
      </Stack.Navigator>
    );
  }

  function MediaStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="MediaView" component={MediaView} />
        <Stack.Screen name="AlbumView" component={AlbumView} />
        <Stack.Screen name="PhotoView" component={PhotoView} />
      </Stack.Navigator>
    );
  }

  return (
    <RootSiblingParent>
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
            tabBarActiveTintColor: MOESLAND_GREEN,
            tabBarStyle: {
              backgroundColor: FOOTER_BACKGROUND_COLOR,
            },
            header: (props) => (
              <ToolbarView
                {...props}
                showBackButton={route.name === 'NewsDetailPage'}
              />
            ),
          })}
        >
          <Tab.Screen name="Nieuws" component={NewsStack} />
          <Tab.Screen name="Agenda" component={CalendarView} />
          <Tab.Screen name="Media" component={MediaStack} />
          <Tab.Screen name="Stemmen" component={VotingView} />
          <Tab.Screen name="Contact" component={ContactView} />
        </Tab.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  );
}
