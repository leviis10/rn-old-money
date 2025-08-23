import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation } from "react-native-paper";
import HomeScreen from "../screens/home/HomeScreen";
import AllTransactionsScreen from "../screens/transactions/AllTransactionsScreen";
import { CommonActions } from "@react-navigation/native";

const HomeBottomTab = createBottomTabNavigator({
    screenOptions: {
        animation: "shift",
        headerShown: false,
    },
    tabBar: ({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
            navigationState={state}
            safeAreaInsets={insets}
            onTabPress={({ route, preventDefault }) => {
                const event = navigation.emit({
                    type: "tabPress",
                    target: route.key,
                    canPreventDefault: true,
                });

                if (event.defaultPrevented) {
                    preventDefault();
                } else {
                    navigation.dispatch({
                        ...CommonActions.navigate(route.name, route.params),
                        target: state.key,
                    });
                }
            }}
            renderIcon={({ route, focused, color }) =>
                descriptors[route.key].options.tabBarIcon?.({ focused, color, size: 24 }) || null
            }
            getLabelText={({ route }) => {
                const { options } = descriptors[route.key];
                const label =
                    typeof options.tabBarLabel === "string"
                        ? options.tabBarLabel
                        : typeof options.title === "string"
                        ? options.title
                        : route.name;
                return label;
            }}
        />
    ),
    screens: {
        Home: {
            screen: HomeScreen,
            options: {
                tabBarIcon: ({ color, focused }) => (
                    <MaterialCommunityIcons name={focused ? "home" : "home-outline"} color={color} size={26} />
                ),
            },
        },
        Transaction: {
            screen: AllTransactionsScreen,
            options: {
                tabBarIcon: ({ color, focused }) => (
                    <MaterialCommunityIcons name={focused ? "wallet" : "wallet-outline"} color={color} size={26} />
                ),
            },
        },
    },
});

export default HomeBottomTab;
