import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Button, TextInput } from "react-native-paper";
import Container from "../../components/utils/Container";
import Spacer from "../../components/utils/Spacer";
import WalletService from "../../services/WalletService";
import useProtectedScreen from "../../hooks/useProtectedScreen";

export type EditWalletScreenParams = {
    id: number;
    name: string;
    description: string | null;
};

function EditWalletScreen({ route }: StaticScreenProps<EditWalletScreenParams>) {
    useProtectedScreen();

    const { id, name, description } = route.params;
    const [nameInput, setNameInput] = useState(name);
    const [descriptionInput, setDescriptionInput] = useState(description || "");
    const [isLoading, setIsLoading] = useState(false);
    const [isValidInput, setIsValidInput] = useState(nameInput.length >= 3);
    const navigation = useNavigation();

    useEffect(() => {
        setIsValidInput(nameInput.length >= 3);
    }, [nameInput]);

    const editWalletHandler = async function () {
        try {
            setIsLoading(true);
            await WalletService.updateById(id, {
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
            <TextInput value={nameInput} mode="outlined" label="Name" onChangeText={(text) => setNameInput(text)} />
            <Spacer height={10} />
            <TextInput
                value={descriptionInput}
                mode="outlined"
                label="Description"
                multiline
                onChangeText={(text) => setDescriptionInput(text)}
            />
            <Spacer height={10} />
            <Button
                onPress={editWalletHandler}
                mode="contained"
                loading={isLoading}
                disabled={isLoading || !isValidInput}
            >
                Edit Wallet
            </Button>
        </Container>
    );
}

export default EditWalletScreen;
