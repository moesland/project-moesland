import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ToolbarView from '../../components/ToolbarView';

import { MOESLAND_GREEN, FOOTER_BACKGROUND_COLOR } from '../../constants/colors';

export const Stack = createStackNavigator();
export const Tab = createBottomTabNavigator();

export const createStack = (screens) => {
    return () => (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {screens.map((screen, i) => (
                <Stack.Screen key={i} name={screen.name} component={screen.component} />
            ))}
        </Stack.Navigator>
    );
};

const getIconName = (icons, routeName, focused) => {
    const icon = icons.find(icon => icon.routeName == routeName);

    if(focused) {
        return icon.focusImage;
    }

   return icon.image;;
};


const CustomNavigation = ({initialRouteName, IconTabList, children}) => {
    

    const ScreenOptions = ({ route }) => ({
        tabBarIcon: ({ focused }) => {
            const iconName = getIconName(IconTabList, route.name, focused);
            return <Ionicons name={iconName} size={25} color={MOESLAND_GREEN} />;
        },
        tabBarActiveTintColor: MOESLAND_GREEN,
        tabBarStyle: {
            backgroundColor: FOOTER_BACKGROUND_COLOR,
        },
        header: (props) => (
            <ToolbarView {...props} showBackButton={route.name === 'NewsDetailPage'} />
        ),
    });

    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName={initialRouteName} screenOptions={ScreenOptions}>
                {children}
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default CustomNavigation;