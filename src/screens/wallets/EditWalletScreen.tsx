import { StaticScreenProps } from "@react-navigation/native";
import { View } from "react-native";
import { Text } from "react-native-paper";

export type EditWalletScreenParams = {
    name: string;
    balance: string;
};

function EditWalletScreen({ route }: StaticScreenProps<EditWalletScreenParams>) {
    const {name, balance} = route.params;

    return (
        <View>
            <Text>Name: {name}</Text>
            <Text>Balance: {balance}</Text>
        </View>
    );
}

export default EditWalletScreen;
