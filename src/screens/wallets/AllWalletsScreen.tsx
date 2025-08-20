import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Card, FAB, Icon, Text } from "react-native-paper";
import GetWalletResponse from "../../models/wallets/response/GetWalletResponse";
import WalletService from "../../services/WalletService";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function AllWalletsScreen() {
    const [wallets, setWallets] = useState<GetWalletResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    useFocusEffect(
        useCallback(() => {
            (async () => {
                try {
                    setIsLoading(true);
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

    const navigateToEditWalletHandler = function (wallet: GetWalletResponse) {
        navigation.navigate("EditWalletScreen", {
            name: wallet.name,
            balance: wallet.balance,
        });
    };

    const navigateToAddWalletScreenHandler = function() {
        navigation.navigate("AddWallet");
    }

    return (
        <>
            {isLoading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator animating />
                </View>
            )}

            {!isLoading && wallets.length === 0 && <Text>No wallet found</Text>}

            {!isLoading &&
                wallets.length > 0 &&
                wallets.map((wallet) => (
                    <Card key={wallet.id}>
                        <Card.Content style={styles.walletCardContainer}>
                            <View>
                                <Text variant="titleLarge">{wallet.name}</Text>
                                <Text variant="bodyMedium">{wallet.balance}</Text>
                            </View>
                            <TouchableOpacity onPress={() => navigateToEditWalletHandler(wallet)}>
                                <Icon source="pencil-circle-outline" size={30.52} />
                            </TouchableOpacity>
                        </Card.Content>
                    </Card>
                ))}

            <FAB
                icon="plus"
                style={{
                    position: "absolute",
                    right: insets.right + 19.53,
                    bottom: insets.bottom + 19.53,
                }}
                onPress={navigateToAddWalletScreenHandler}
            />
        </>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    walletCardContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
});

export default AllWalletsScreen;
