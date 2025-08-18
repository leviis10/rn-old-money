import * as SecureToken from "expo-secure-store";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import Spacer from "../../components/utils/Spacer";
import SecureStoreConstants from "../../constants/SecureStoreConstants";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppNavigation from "../../hooks/useAppNavigation";
import useOnlyUnauthenticated from "../../hooks/useOnlyUnauthenticated";
import AuthService from "../../services/AuthService";
import { setToken } from "../../store/slices/authReducer";

function LoginScreen() {
    useOnlyUnauthenticated();

    const [username, setUsername] = useState("");
    const [isUsernameInputDisabled, setIsUsernameInputDisabled] = useState(false);
    const [password, setPassword] = useState("");
    const [isPasswordInputDisabled, setIsPasswordInputDisabled] = useState(false);
    const [isShownPassword, setIsShownPassword] = useState(false);
    const [submitIsDisabled, setSubmitIsDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useAppNavigation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const isValidUsername = username.length >= 3;
        const isValidPassword = password.length >= 8;
        setSubmitIsDisabled(!(isValidUsername && isValidPassword));
    }, [username, password]);

    const navigateToRegisterScreenHandler = function () {
        navigation.replace("Register");
    };

    const loginHandler = async function () {
        try {
            setIsPasswordInputDisabled(true);
            setIsUsernameInputDisabled(true);
            setSubmitIsDisabled(true);
            setIsLoading(true);
            const response = await AuthService.login({
                username,
                password,
            });
            await SecureToken.setItemAsync(SecureStoreConstants.ACCESS_TOKEN, response.data.accessToken);
            await SecureToken.setItemAsync(SecureStoreConstants.REFRESH_TOKEN, response.data.refreshToken);
            dispatch(setToken(response.data));
        } catch (err) {
            // TODO: handle error
            console.error(err);
            setPassword("");
        } finally {
            setIsUsernameInputDisabled(false);
            setIsPasswordInputDisabled(false);
            setSubmitIsDisabled(false);
            setIsLoading(false);
        }
    };

    const togglePasswordHandler = function () {
        setIsShownPassword(!isShownPassword);
    };

    return (
        <View style={styles.container}>
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
                right={<TextInput.Icon onPress={togglePasswordHandler} icon={!isShownPassword ? "eye" : "eye-off"} />}
                disabled={isPasswordInputDisabled}
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

            <Button loading={isLoading} mode="contained" disabled={submitIsDisabled} onPress={loginHandler}>
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
