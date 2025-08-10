import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import Spacer from "../../components/utils/Spacer";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigators/AuthStack";
import AuthService from "../../services/AuthService";
import ErrorResponse from "../../models/response/ErrorResponse";

function RegisterScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [submitIsDisabled, setSubmitIsDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailInputDisabled, setIsEmailInputDisabled] = useState(false);
    const [isUsernameInputDisabled, setIsUsernameInputDisabled] = useState(false);
    const [isPasswordInputDisabled, setIsPasswordInputDisabled] = useState(false);

    useEffect(() => {
        const isValidUsername = username.length >= 3;
        const isValidPassword = password.length >= 8;
        const isValidEmail = email.length > 0;
        setSubmitIsDisabled(!(isValidUsername && isValidPassword && isValidEmail));
    }, [username, password, email]);

    const backToLoginScreenHandler = function () {
        navigation.goBack();
    };

    const registerHandler = async function () {
        try {
            setIsLoading(true);
            setSubmitIsDisabled(true);
            setIsEmailInputDisabled(true);
            setIsUsernameInputDisabled(true);
            setIsPasswordInputDisabled(true);

            const response = await AuthService.register({
                email,
                password,
                username,
            });
            console.log(response);
        } catch (err) {
            if (err instanceof ErrorResponse) {
                console.error(err.message);
            } else {
                console.error(err);
            }
        } finally {
            setIsLoading(false);
            setSubmitIsDisabled(false);
            setIsEmailInputDisabled(false);
            setIsUsernameInputDisabled(false);
            setIsPasswordInputDisabled(false);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                label="email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                mode="outlined"
                autoCapitalize="none"
                disabled={isEmailInputDisabled}
            />
            <Spacer height={10} />

            <TextInput
                label="username"
                value={username}
                onChangeText={(text) => setUsername(text)}
                mode="outlined"
                autoCapitalize="none"
                disabled={isUsernameInputDisabled}
            />
            <Spacer height={10} />

            <TextInput
                label="password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                mode="outlined"
                autoCapitalize="none"
                secureTextEntry
                disabled={isPasswordInputDisabled}
            />
            <Spacer height={10} />

            <Text>
                Already have an account?{" "}
                <Text style={{ color: "blue", textDecorationLine: "underline" }} onPress={backToLoginScreenHandler}>
                    Login
                </Text>
            </Text>
            <Spacer height={10} />

            <Button mode="contained" disabled={submitIsDisabled} onPress={registerHandler} loading={isLoading}>
                Register
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

export default RegisterScreen;
