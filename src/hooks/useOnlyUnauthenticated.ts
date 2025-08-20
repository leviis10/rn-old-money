import { useEffect } from "react";
import useAppSelector from "./useAppSelector";
import { useNavigation } from "@react-navigation/native";

function useOnlyUnauthenticated() {
    const navigation = useNavigation();
    const { accessToken: authStateAccessToken } = useAppSelector(({ auth }) => auth);

    useEffect(() => {
        if (authStateAccessToken !== null) {
            navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
            });
        }
    }, [navigation, authStateAccessToken]);
}

export default useOnlyUnauthenticated;
