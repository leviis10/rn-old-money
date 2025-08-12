import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import Spacer from "../../components/utils/Spacer";
import useAppNavigation from "../../hooks/useAppNavigation";
import useOnlyUnauthenticated from "../../hooks/useOnlyUnauthenticated";

function LoginScreen() {
    useOnlyUnauthenticated()

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [submitIsDisabled, setSubmitIsDisabled] = useState(true);
    const navigation = useAppNavigation();

    useEffect(() => {
        const isValidUsername = username.length >= 3;
        const isValidPassword = password.length >= 8;
        setSubmitIsDisabled(!(isValidUsername && isValidPassword));
    }, [username, password]);

    const navigateToRegisterScreenHandler = function () {
        navigation.replace("Register");
    };

    return (
        <View style={styles.container}>
            <TextInput
                label="username"
                value={username}
                onChangeText={(text) => setUsername(text)}
                mode="outlined"
                autoCapitalize="none"
            />
            <Spacer height={10} />

            <TextInput
                label="password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                mode="outlined"
                autoCapitalize="none"
                secureTextEntry
            />
            <Spacer height={10} />

            <Text>
                Doesn&apos;t have account?{" "}
                <Text
                    style={{ color: "blue", textDecorationLine: "underline" }}
                    onPress={navigateToRegisterScreenHandler}
                >
                    Register
                </Text>
            </Text>
            <Spacer height={10} />

            <Button mode="contained" disabled={submitIsDisabled}>
                Login
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        flex: 1,
        justifyContent: "center",
    },
});

export default LoginScreen;
