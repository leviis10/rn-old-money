import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import { createStaticNavigation } from "@react-navigation/native";
import RegisterScreen from "../screens/auth/RegisterScreen";

const AuthStack = createNativeStackNavigator({
    initialRouteName: "Login",
    screenOptions: {
        headerShown: false
    },
    screens: {
        Login: LoginScreen,
        Register: RegisterScreen
    },
});

export type AuthStackParamList = {
    Login: undefined,
    Register: undefined
};

export default createStaticNavigation(AuthStack);
