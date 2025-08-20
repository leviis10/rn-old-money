import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import SafeAreaView from "../../components/utils/SafeAreaView";
import WalletContainer from "../../components/wallets/WalletContainer";
import useProtectedScreen from "../../hooks/useProtectedScreen";
import Spacer from "../../components/utils/Spacer";

function HomeScreen() {
    useProtectedScreen();

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.balance}>Total Balance</Text>
                <Spacer height={24.41} />
                <WalletContainer />
                <View>
                    <Text>Recent Transactions</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    balance: {
        alignSelf: "flex-start",
    },
    container: {
        alignItems: "center",
        paddingLeft: 12.5,
        paddingRight: 12.5
    },
});

export default HomeScreen;
