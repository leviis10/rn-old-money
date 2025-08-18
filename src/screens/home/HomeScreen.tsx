import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import WalletContainer from "../../components/wallets/WalletContainer";
import useProtectedScreen from "../../hooks/useProtectedScreen";

function HomeScreen() {
    useProtectedScreen();

    return (
        <View style={styles.container}>
            <WalletContainer />
            <View>
                <Text>Recent Transactions</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    }
});

export default HomeScreen;
