import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Divider, Icon, Surface, Text } from "react-native-paper";
import GetWalletResponse from "../../models/wallets/response/GetWalletResponse";
import WalletService from "../../services/WalletService";
import Spacer from "../utils/Spacer";

function WalletContainer() {
    const [isLoading, setIsLoading] = useState(true);
    const [wallets, setWallets] = useState<GetWalletResponse[]>([]);
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            (async () => {
                try {
                    const response = await WalletService.findAll();
                    setWallets(response.data);
                } catch (err) {
                    // TODO: handle error
                    console.error(err);
                } finally {
                    setIsLoading(false);
                }
            })();
        }, [])
    );

    const navigateToAddWalletScreenHandler = function () {
        navigation.navigate("AddWallet");
    };

    const navigateToSeeAllWalletsHandler = function () {
        navigation.navigate("AllWalletsScreen");
    };

    return (
        <Surface style={styles.container}>
            <View style={styles.title}>
                <Text variant="titleMedium">My Wallet</Text>
                {!isLoading && wallets.length > 0 && (
                    <TouchableOpacity onPress={navigateToSeeAllWalletsHandler}>
                        <Text variant="labelSmall">See All</Text>
                    </TouchableOpacity>
                )}
            </View>
            <Spacer height={10} />
            <Divider />
            {isLoading && (
                <View style={styles.center}>
                    <ActivityIndicator animating />
                </View>
            )}
            {!isLoading && wallets.length > 0 && (
                <View>
                    <Text>wallet1</Text>
                </View>
            )}
            {!isLoading && wallets.length === 0 && (
                <View style={styles.center}>
                    <TouchableOpacity onPress={navigateToAddWalletScreenHandler}>
                        <Icon source="plus-circle-outline" size={38.15} />
                    </TouchableOpacity>
                    <Spacer height={6.4} />
                    <Text>Start Creating a new one!</Text>
                </View>
            )}
        </Surface>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 181.93,
        width: "100%",
        borderRadius: 10,
        padding: 12.5,
    },
    title: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    center: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
});

export default WalletContainer;
