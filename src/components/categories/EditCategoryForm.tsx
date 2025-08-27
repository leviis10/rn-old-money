import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Icon, TextInput } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type GetCategoryResponse from "../../models/categories/response/GetCategoryResponse";
import CategoriesService from "../../services/CategoriesService";

interface EditCategoryFormProps {
    category: GetCategoryResponse;
}

function EditCategoryForm({ category }: EditCategoryFormProps) {
    const insets = useSafeAreaInsets();
    const [nameInput, setNameInput] = useState(category.name);
    const [isNameInputValid, setIsNameInputValid] = useState(true);
    const [isValid, setIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    const { name: initialNameInput } = category;
    useEffect(() => {
        setIsNameInputValid(nameInput.length >= 3);

        setIsValid(isNameInputValid && nameInput !== initialNameInput);
    }, [nameInput, isNameInputValid, initialNameInput]);

    const editCategoryHandler = async function () {
        try {
            setIsLoading(true);
            await CategoriesService.updateById(category.id, {
                name: nameInput,
            });
            navigation.goBack();
        } catch (err) {
            // TODO: handle error
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.fieldContainer}>
                <View style={styles.fieldContainerIcon}>
                    <Icon source="ab-testing" size={19.53} />
                </View>
                <TextInput
                    mode="outlined"
                    label="Category Name"
                    value={nameInput}
                    onChangeText={setNameInput}
                    style={styles.fieldContainerInput}
                    disabled={isLoading}
                />
            </View>
            <Button
                mode="contained"
                style={{
                    bottom: insets.bottom,
                }}
                loading={isLoading}
                disabled={isLoading || !isValid}
                onPress={editCategoryHandler}
            >
                Save
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        flex: 1,
    },
    fieldContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    fieldContainerIcon: {
        backgroundColor: "#dee2e6",
        padding: 10,
        borderRadius: 999,
    },
    fieldContainerInput: {
        flex: 1,
    },
});

export default EditCategoryForm;
