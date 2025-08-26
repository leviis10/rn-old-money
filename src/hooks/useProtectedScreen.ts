import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import useAppSelector from "./useAppSelector";

function useProtectedScreen() {
    const { accessToken: authStateAccessToken } = useAppSelector(({ auth }) => auth);
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            if (authStateAccessToken === null) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Login" }],
                });
            }
        }, [navigation, authStateAccessToken])
    );
}

export default useProtectedScreen;
