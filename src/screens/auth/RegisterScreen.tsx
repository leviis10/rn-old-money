import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import Spacer from "../../components/utils/Spacer";
import SecureStoreConstants from "../../constants/SecureStoreConstants";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppNavigation from "../../hooks/useAppNavigation";
import ErrorResponse from "../../models/global/response/ErrorResponse";
import AuthService from "../../services/AuthService";
import { setToken } from "../../store/slices/authReducer";
import useOnlyUnauthenticated from "../../hooks/useOnlyUnauthenticated";

function RegisterScreen() {
    useOnlyUnauthenticated();

    const navigation = useAppNavigation();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [submitIsDisabled, setSubmitIsDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailInputDisabled, setIsEmailInputDisabled] = useState(false);
    const [isUsernameInputDisabled, setIsUsernameInputDisabled] = useState(false);
    const [isPasswordInputDisabled, setIsPasswordInputDisabled] = useState(false);
    const [isShownPassword, setIsShownPassword] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const isValidUsername = username.length >= 3;
        const isValidPassword = password.length >= 8;
        const isValidEmail = email.length > 0;
        setSubmitIsDisabled(!(isValidUsername && isValidPassword && isValidEmail));
    }, [username, password, email]);

    const navigateToLoginScreenHandler = function () {
        navigation.replace("Login");
    };

    const registerHandler = async function () {
        try {
            setIsLoading(true);
            setSubmitIsDisabled(true);
            setIsEmailInputDisabled(true);
            setIsUsernameInputDisabled(true);
            setIsPasswordInputDisabled(true);

            await AuthService.register({
                email,
                password,
                username,
            });

            const {
                data: { accessToken, refreshToken },
            } = await AuthService.login({
                username,
                password,
            });

            await SecureStore.setItemAsync(SecureStoreConstants.ACCESS_TOKEN, accessToken);
            await SecureStore.setItemAsync(SecureStoreConstants.REFRESH_TOKEN, refreshToken);

            dispatch(
                setToken({
                    accessToken,
                    refreshToken,
                })
            );
        } catch (err) {
            // TODO: handle error
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

    const togglePasswordHandler = function () {
        setIsShownPassword(!isShownPassword);
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
                secureTextEntry={!isShownPassword}
                disabled={isPasswordInputDisabled}
                right={<TextInput.Icon onPress={togglePasswordHandler} icon={!isShownPassword ? "eye" : "eye-off"} />}
            />
            <Spacer height={10} />

            <Text>
                Already have an account?{" "}
                <Text style={{ color: "blue", textDecorationLine: "underline" }} onPress={navigateToLoginScreenHandler}>
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
