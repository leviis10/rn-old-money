import * as SecureStore from "expo-secure-store";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import SecureStoreConstants from "./constants/SecureStoreConstants";
import useAppDispatch from "./hooks/useAppDispatch";
import RootStack from "./navigators/RootStack";
import { login } from "./store/slices/authReducer";

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
    duration: 1000,
    fade: true
});

function App() {
    const [isAppReady, setIsAppReady] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isAppReady) {
            SplashScreen.hideAsync();
        }

        (async () => {
            const accessToken = await SecureStore.getItemAsync(SecureStoreConstants.ACCESS_TOKEN);
            const refreshToken = await SecureStore.getItemAsync(SecureStoreConstants.REFRESH_TOKEN);

            if (accessToken !== null && refreshToken !== null) {
                dispatch(login({ accessToken, refreshToken }));
            }

            setIsAuthenticating(false);
        })();

        setIsAppReady(!isAuthenticating);
    }, [dispatch, isAppReady, isAuthenticating]);

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.statusBar} />
            <RootStack />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    statusBar: {
        backgroundColor: "#000",
    },
});

export default App;
