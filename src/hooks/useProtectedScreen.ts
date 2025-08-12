import { useEffect } from "react";
import useAppSelector from "./useAppSelector";
import useAppNavigation from "./useAppNavigation";

function useProtectedScreen() {
    const { accessToken: authStateAccessToken } = useAppSelector(({ auth }) => auth);
    const navigation = useAppNavigation();

    useEffect(() => {
        if (authStateAccessToken === null) {
            navigation.replace("Login");
        }
    }, [navigation, authStateAccessToken]);
}

export default useProtectedScreen;
