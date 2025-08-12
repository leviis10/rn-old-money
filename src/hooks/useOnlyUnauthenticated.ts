import { useEffect } from "react";
import useAppNavigation from "./useAppNavigation";
import useAppSelector from "./useAppSelector";

function useOnlyUnauthenticated() {
    const navigation = useAppNavigation();
    const { accessToken: authStateAccessToken } = useAppSelector(({ auth }) => auth);

    useEffect(() => {
        if (authStateAccessToken !== null) {
            navigation.replace("Home");
        }
    }, [navigation, authStateAccessToken]);
}

export default useOnlyUnauthenticated;
