import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import HomeScreen from "../screens/home/HomeScreen";
import store from "../store";

const RootStack = createNativeStackNavigator({
    initialRouteName: store.getState().auth.accessToken === null ? "Login" : "Home",
    screenOptions: {
        headerShown: false,
    },
    screens: {
        Login: LoginScreen,
        Register: RegisterScreen,
        Home: HomeScreen
    },
});

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
};

export default createStaticNavigation(RootStack);
