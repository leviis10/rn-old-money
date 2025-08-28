import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CommonActions } from "@react-navigation/native";
import { BottomNavigation, Icon } from "react-native-paper";
import AllBudgetsScreen from "../screens/budgets/AllBudgetsScreen";
import HomeScreen from "../screens/home/HomeScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import AllTransactionsScreen from "../screens/transactions/AllTransactionsScreen";

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
                tabBarIcon: ({ focused }) => <Icon source={focused ? "home" : "home-outline"} size={26} />,
            },
        },
        Transaction: {
            screen: AllTransactionsScreen,
            options: {
                tabBarIcon: ({ focused }) => <Icon source={focused ? "wallet" : "wallet-outline"} size={26} />,
            },
        },
        Budget: {
            screen: AllBudgetsScreen,
            options: {
                tabBarIcon: ({ focused }) => <Icon source={focused ? "piggy-bank" : "piggy-bank-outline"} size={26} />,
                headerShown: true,
                headerTitle: "All Budget",
            },
        },
        Profile: {
            screen: ProfileScreen,
            options: {
                tabBarIcon: ({ focused }) => <Icon source={focused ? "account" : "account-outline"} size={26} />,
            },
        },
    },
});

export default HomeBottomTab;
