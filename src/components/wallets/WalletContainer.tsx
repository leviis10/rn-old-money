import { StyleSheet, View } from "react-native";
import { Divider, Surface, Text } from "react-native-paper";

function WalletContainer() {
    return (
        <Surface style={styles.container}>
            <View style={styles.title}>
                <Text variant="titleMedium">My Wallet</Text>
                <Text variant="labelSmall">See All</Text>
            </View>
            <Divider />
            <View>
                <Text>wallet1</Text>
            </View>
        </Surface>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 150,
        width: "95%",
        borderRadius: 10,
        padding: 12.5,
        marginTop: 30.52,
    },
    title: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 10
    }
});

export default WalletContainer;
