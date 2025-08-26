import { View } from "react-native";
import { Text } from "react-native-paper";
import useProtectedScreen from "../../hooks/useProtectedScreen";

function AllBudgetsScreen() {
    useProtectedScreen();

    return (
        <View>
            <Text>Under Development</Text>
        </View>
    );
}

export default AllBudgetsScreen;
