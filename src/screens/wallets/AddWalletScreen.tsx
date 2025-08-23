import { Button, TextInput } from "react-native-paper";
import Container from "../../components/utils/Container";
import Spacer from "../../components/utils/Spacer";
import WalletService from "../../services/WalletService";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import useProtectedScreen from "../../hooks/useProtectedScreen";

function AddWalletScreen() {
    useProtectedScreen();

    const [nameInput, setNameInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isValidInput, setIsValidInput] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        let isNameInputValid = nameInput.length >= 3;
        setIsValidInput(isNameInputValid);
    }, [nameInput]);

    const createWalletHandler = async function () {
        try {
            setIsLoading(true);
            await WalletService.create({
                name: nameInput,
                description: descriptionInput,
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
            <TextInput mode="outlined" label="Name" onChangeText={(text) => setNameInput(text)} />
            <Spacer height={10} />
            <TextInput
                mode="outlined"
                label="Description"
                multiline
                onChangeText={(text) => setDescriptionInput(text)}
            />
            <Spacer height={10} />
            <Button
                onPress={createWalletHandler}
                mode="contained"
                loading={isLoading}
                disabled={isLoading || !isValidInput}
            >
                Add new wallet
            </Button>
        </Container>
    );
}

export default AddWalletScreen;
