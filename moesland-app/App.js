import ToolbarView from './src/views/ToolbarView';
import NewsItemListView from './src/views/NewsItemListView';
import NewsItemDetailView from './src/views/NewsItemDetailView';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  const handleMenuPress = () => {
    // handle the menu press event
  };

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
        <Stack.Screen name="NewsFeed" component={NewsItemListView} />
        <Stack.Screen
          name="NewsDetailPage"
          component={NewsItemDetailView}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
