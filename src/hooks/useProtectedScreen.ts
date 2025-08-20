import { useEffect } from "react";
import useAppSelector from "./useAppSelector";
import { useNavigation } from "@react-navigation/native";

function useProtectedScreen() {
    const { accessToken: authStateAccessToken } = useAppSelector(({ auth }) => auth);
    const navigation = useNavigation();

    useEffect(() => {
        if (authStateAccessToken === null) {
            navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
            });
        }
    }, [navigation, authStateAccessToken]);
}

export default useProtectedScreen;
