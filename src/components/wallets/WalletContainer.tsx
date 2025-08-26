import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Divider, Icon, Surface, Text, TouchableRipple } from "react-native-paper";
import Currency from "../../enums/Currency";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { findAllWallets } from "../../store/slices/walletsReducer";
import { formatMoney } from "../../utils/currencyUtils";
import Spacer from "../utils/Spacer";

function WalletContainer() {
    const { isLoading, wallets } = useAppSelector((state) => state.wallets);
    const dispatch = useAppDispatch();
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            dispatch(findAllWallets({ maxFetch: 2 }));
        }, [dispatch])
    );

    const navigateToAddWalletScreenHandler = function () {
        navigation.navigate("AddWallet");
    };

    const navigateToSeeAllWalletsHandler = function () {
        navigation.navigate("AllWalletsScreen");
    };

    const navigateToTransactionScreenHandler = function (wallet: string) {
        navigation.navigate("Dashboard", {
            screen: "Transaction",
            params: { wallet },
        });
    };

    return (
        <Surface style={styles.container}>
            <View style={styles.title}>
                <Text variant="titleMedium">My Wallet</Text>
                {!isLoading && wallets.length > 0 && (
                    <TouchableRipple onPress={navigateToSeeAllWalletsHandler}>
                        <Text variant="labelSmall">See All</Text>
                    </TouchableRipple>
                )}
            </View>
            <Spacer height={10} />
            <Divider />
            {isLoading && (
                <View style={styles.center}>
                    <ActivityIndicator animating />
                </View>
            )}
            {!isLoading &&
                wallets.length > 0 &&
                wallets.map((wallet) => (
                    <TouchableRipple key={wallet.id} onPress={() => navigateToTransactionScreenHandler(wallet.name)}>
                        <View style={styles.walletItemContainer}>
                            <Text>{wallet.name}</Text>
                            <Text>{formatMoney(Currency.IDR, wallet.balance)}</Text>
                        </View>
                    </TouchableRipple>
                ))}
            {!isLoading && wallets.length === 0 && (
                <View style={styles.center}>
                    <TouchableRipple onPress={navigateToAddWalletScreenHandler}>
                        <Icon source="plus-circle-outline" size={38.15} />
                    </TouchableRipple>
                    <Spacer height={6.4} />
                    <Text>Start Creating a new one!</Text>
                </View>
            )}
        </Surface>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderRadius: 10,
        paddingTop: 12.5,
        paddingBottom: 12.5,
    },
    title: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 12.5,
        paddingRight: 12.5,
    },
    center: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    walletItemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 19.53,
        paddingBottom: 19.53,
        paddingLeft: 12.5,
        paddingRight: 12.5,
    },
});

export default WalletContainer;
