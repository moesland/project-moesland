import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MOESLAND_GREEN, FOOTER_BACKGROUND_COLOR } from './src/constants/colors';
import NewsItemListView from './src/routes/NewsItemListView';
import NewsItemDetailView from './src/routes/NewsItemDetailView';
import ToolbarView from './src/components/ToolbarView';
import MediaView from './src/routes/MediaView';
import AlbumView from './src/routes/AlbumView';
import PhotoView from './src/routes/PhotoView';
import CalendarView from './src/routes/CalendarView';
import VotingView from './src/routes/VotingView';
import ContactView from './src/routes/ContactView';
import PhotoAlbumView from './src/routes/PhotoAlbum';
import AlbumPageView from './src/routes/AlbumPage';
import ImageView from './src/routes/ImageView';

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
        <Stack.Screen name="AlbumPage" component={AlbumPageView} />
        <Stack.Screen name="ImageScreen" component={ImageView} />
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
            } else if (route.name === 'Galerij') {
              iconName = focused ? 'images' : 'images-outline';
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
        <Tab.Screen name="Media" component={MediaView} />
        <Tab.Screen name="Galerij" component={PhotoAlbumView} />
        <Tab.Screen name="Media" component={MediaStack} />
        <Tab.Screen name="Stemmen" component={VotingView} />
        <Tab.Screen name="Contact" component={ContactView} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
