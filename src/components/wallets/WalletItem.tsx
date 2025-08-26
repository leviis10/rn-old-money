import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Dialog, Icon, Menu, Portal, Text, TouchableRipple } from "react-native-paper";
import useAppDispatch from "../../hooks/useAppDispatch";
import GetWalletResponse from "../../models/wallets/response/GetWalletResponse";
import WalletService from "../../services/WalletService";
import { findAllWallets } from "../../store/slices/walletsReducer";
import { formatMoney } from "../../utils/currencyUtils";
import Currency from "../../enums/Currency";

interface WalletItemProps {
    wallet: GetWalletResponse;
}

function WalletItem({ wallet }: WalletItemProps) {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const dispatch = useAppDispatch();
    const navigation = useNavigation();

    const navigateToEditWalletHandler = function (wallet: GetWalletResponse) {
        closeMenuHandler();
        navigation.navigate("EditWalletScreen", {
            id: wallet.id,
            name: wallet.name,
            description: wallet.description,
        });
    };

    const closeMenuHandler = function () {
        setIsMenuVisible(false);
    };

    const openMenuHandler = function () {
        setIsMenuVisible(true);
    };

    const showDeleteDialogHandler = function () {
        setIsMenuVisible(false);
        setIsDialogVisible(true);
    };

    const hideDeleteDialogHandler = function () {
        setIsDialogVisible(false);
    };

    const deleteWalletHandler = async function (id: number) {
        try {
            setIsDeleting(true);
            await WalletService.deleteById(id);
            await dispatch(findAllWallets(null));
            hideDeleteDialogHandler();
        } catch (err) {
            // TODO: handle error
            console.error(err);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <Card>
                <Card.Content style={styles.walletCardContainer}>
                    <View>
                        <Text variant="titleLarge">{wallet.name}</Text>
                        <Text variant="bodyLarge">{formatMoney(Currency.IDR, wallet.balance)}</Text>
                    </View>
                    <Menu
                        visible={isMenuVisible}
                        onDismiss={closeMenuHandler}
                        anchor={
                            <TouchableRipple onPress={openMenuHandler}>
                                <Icon source="dots-horizontal-circle-outline" size={30.52} />
                            </TouchableRipple>
                        }
                    >
                        <Menu.Item onPress={() => navigateToEditWalletHandler(wallet)} title="Edit" />
                        <Menu.Item onPress={showDeleteDialogHandler} title="Delete" />
                    </Menu>
                </Card.Content>
            </Card>
            <Portal>
                <Dialog visible={isDialogVisible} onDismiss={hideDeleteDialogHandler} dismissable={!isDeleting}>
                    <Dialog.Content>
                        <Text variant="bodyMedium">
                            Are you sure want to delete <Text style={styles.bold}>{wallet.name}</Text>?
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button
                            mode="contained"
                            onPress={() => deleteWalletHandler(wallet.id)}
                            loading={isDeleting}
                            disabled={isDeleting}
                        >
                            Delete
                        </Button>
                        <Button onPress={hideDeleteDialogHandler} disabled={isDeleting}>
                            Cancel
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </>
    );
}

const styles = StyleSheet.create({
    walletCardContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    bold: {
        fontWeight: 700,
    },
});

export default WalletItem;
