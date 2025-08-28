import { createStaticNavigation, StaticParamList } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import CreateBudgetScreen from "../screens/budgets/CreateBudgetScreen";
import AddCategoryScreen from "../screens/categories/AddCategoryScreen";
import AllCategoriesScreen from "../screens/categories/AllCategoriesScreen";
import CategoryDetailScreen from "../screens/categories/CategoryDetailScreen";
import AddWalletScreen from "../screens/wallets/AddWalletScreen";
import AllWalletsScreen from "../screens/wallets/AllWalletsScreen";
import EditWalletScreen from "../screens/wallets/EditWalletScreen";
import store from "../store";
import HomeBottomTab from "./HomeBottomTab";

const RootStack = createNativeStackNavigator({
    initialRouteName: store.getState().auth.accessToken === null ? "Login" : "Dashboard",
    screenOptions: {
        headerShown: false,
    },
    screens: {
        Login: LoginScreen,
        Register: RegisterScreen,
        Dashboard: HomeBottomTab,
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
        AllCategoriesScreen: {
            screen: AllCategoriesScreen,
            options: {
                headerShown: true,
                title: "All Categories",
            },
        },
        AddCategoryScreen: {
            screen: AddCategoryScreen,
            options: {
                headerShown: true,
                title: "Add Category",
            },
        },
        CategoryDetailScreen: {
            screen: CategoryDetailScreen,
            options: {
                headerShown: true,
                title: "Category Detail",
            },
        },
        CreateBudgetScreen: {
            screen: CreateBudgetScreen,
            options: {
                headerShown: true,
                title: "Add Budget",
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
