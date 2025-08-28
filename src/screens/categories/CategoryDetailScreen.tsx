import { useNavigation, type StaticScreenProps } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Dialog, Icon, Portal, Text, TouchableRipple } from "react-native-paper";
import EditCategoryForm from "../../components/categories/EditCategoryForm";
import Container from "../../components/utils/Container";
import useProtectedScreen from "../../hooks/useProtectedScreen";
import type GetCategoryResponse from "../../models/categories/response/GetCategoryResponse";
import CategoriesService from "../../services/CategoriesService";

export type CategoryDetailScreenParams = {
    category: GetCategoryResponse;
};

function CategoryDetailScreen({ route }: StaticScreenProps<CategoryDetailScreenParams>) {
    useProtectedScreen();

    const [visible, setVisible] = useState(false);
    const [isDeletingCategory, setIsDeletingCategory] = useState(false);
    const navigation = useNavigation();

    const {
        params: { category },
    } = route;

    const showDialog = function () {
        setVisible(true);
    };

    const hideDialog = function () {
        setVisible(false);
    };

    const showDeleteCategoryDialogHandler = useCallback(async () => {
        showDialog();
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableRipple onPress={showDeleteCategoryDialogHandler}>
                    <Icon source="trash-can-outline" size={30.52} />
                </TouchableRipple>
            ),
        });
    }, [navigation, showDeleteCategoryDialogHandler]);

    const deleteCategoryHandler = async function () {
        try {
            setIsDeletingCategory(true);
            await CategoriesService.deleteById(category.id);
            hideDialog();
            navigation.goBack();
        } catch (err) {
            // TODO: handle error
            console.error(err);
        } finally {
            setIsDeletingCategory(false);
        }
    };

    return (
        <>
            <Container>
                <EditCategoryForm category={category} />
            </Container>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog} dismissable={!isDeletingCategory}>
                    <Dialog.Title>Delete Category</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">
                            Are you sure you want to delete <Text style={styles.bold}>{category.name}</Text> category?
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog} disabled={isDeletingCategory}>
                            Cancel
                        </Button>
                        <Button onPress={deleteCategoryHandler} disabled={isDeletingCategory}>
                            Delete
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </>
    );
}

const styles = StyleSheet.create({
    bold: {
        fontWeight: 700,
    },
});

export default CategoryDetailScreen;
