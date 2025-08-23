import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Divider, Icon, Surface, Text, TouchableRipple } from "react-native-paper";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { findAllWallets } from "../../store/slices/walletsReducer";
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
                    <View key={wallet.id}>
                        <Text>{wallet.name}</Text>
                    </View>
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
