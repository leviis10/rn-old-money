import { createStaticNavigation, StaticParamList } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import HomeScreen from "../screens/home/HomeScreen";
import AddWalletScreen from "../screens/wallets/AddWalletScreen";
import AllWalletsScreen from "../screens/wallets/AllWalletsScreen";
import EditWalletScreen from "../screens/wallets/EditWalletScreen";
import store from "../store";

const RootStack = createNativeStackNavigator({
    initialRouteName: store.getState().auth.accessToken === null ? "Login" : "Home",
    screenOptions: {
        headerShown: false,
    },
    screens: {
        Login: LoginScreen,
        Register: RegisterScreen,
        Home: HomeScreen,
        AddWallet: {
            screen: AddWalletScreen,
            options: {
                headerShown: true,
                title: "Add Wallet",
            },
        },
        AllWalletsScreen: {
            screen: AllWalletsScreen,
            options: {
                headerShown: true,
                title: "All Wallets",
            },
        },
        EditWalletScreen: {
            screen: EditWalletScreen,
            options: {
                headerShown: true,
                title: "Edit Wallet",
            },
        },
    },
});

type RootStackParamList = StaticParamList<typeof RootStack>;
declare global {
    namespace ReactNavigation {
        // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        interface RootParamList extends RootStackParamList {}
    }
}

export default createStaticNavigation(RootStack);
