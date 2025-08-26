import { Button, TextInput } from "react-native-paper";
import Container from "../../components/utils/Container";
import useProtectedScreen from "../../hooks/useProtectedScreen";
import Spacer from "../../components/utils/Spacer";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import CategoriesService from "../../services/CategoriesService";

function AddCategoryScreen() {
    useProtectedScreen();

    const [nameInput, setNameInput] = useState("");
    const [isNameValid, setIsNameValid] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        setIsNameValid(nameInput.length >= 3);

        setIsValid(isNameValid);
    }, [nameInput, isNameValid]);

    const addCategoryHandler = async function () {
        try {
            setIsLoading(true);
            await CategoriesService.create({
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
        <Container>
            <TextInput mode="outlined" label="Category Name" onChangeText={setNameInput} />
            <Spacer height={10} />
            <Button mode="contained" disabled={!isValid || isLoading} loading={isLoading} onPress={addCategoryHandler}>
                Add Category
            </Button>
        </Container>
    );
}

export default AddCategoryScreen;
