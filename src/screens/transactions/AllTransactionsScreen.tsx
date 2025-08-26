import { type StaticScreenProps } from "@react-navigation/native";
import { View } from "react-native";
import { Text } from "react-native-paper";
import useProtectedScreen from "../../hooks/useProtectedScreen";

export type AllTransactionsScreenParams = {
    wallet: string | null;
};

function AllTransactionsScreen({ route }: StaticScreenProps<AllTransactionsScreenParams>) {
    useProtectedScreen();

    const { params } = route;
    console.log(params);

    return (
        <View>
            <Text>All Transactions Screen</Text>
            <Text>Not Developed Yet</Text>
        </View>
    );
}

export default AllTransactionsScreen;
