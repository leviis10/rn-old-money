import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import FAB from "../../components/utils/FAB";
import WalletList from "../../components/wallets/WalletList";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import useProtectedScreen from "../../hooks/useProtectedScreen";
import { findAllWallets } from "../../store/slices/walletsReducer";

function AllWalletsScreen() {
    useProtectedScreen();

    const { isLoading, wallets } = useAppSelector((state) => state.wallets);
    const dispatch = useAppDispatch();
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            dispatch(findAllWallets(null));
        }, [dispatch])
    );

    const navigateToAddWalletScreenHandler = function () {
        navigation.navigate("AddWallet");
    };

    return (
        <>
            {isLoading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator animating />
                </View>
            )}

            {!isLoading && wallets.length === 0 && <Text>No wallet found</Text>}

            {!isLoading && wallets.length > 0 && <WalletList wallets={wallets} />}

            <FAB icon="plus" onPress={navigateToAddWalletScreenHandler} />
        </>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default AllWalletsScreen;
