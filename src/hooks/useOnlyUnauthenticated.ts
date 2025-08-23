import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import useAppSelector from "./useAppSelector";

function useOnlyUnauthenticated() {
    const navigation = useNavigation();
    const { accessToken: authStateAccessToken } = useAppSelector(({ auth }) => auth);

    useEffect(() => {
        if (authStateAccessToken !== null) {
            navigation.reset({
                index: 0,
                routes: [{ name: "Dashboard" }],
            });
        }
    }, [navigation, authStateAccessToken]);
}

export default useOnlyUnauthenticated;
