import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import useAppDispatch from "../../hooks/useAppDispatch";
import { logout } from "../../store/slices/authReducer";
import useProtectedScreen from "../../hooks/useProtectedScreen";

function HomeScreen() {
    useProtectedScreen();

    const dispatch = useAppDispatch();

    const logoutHandler = function() {
        dispatch(logout());
    }

    return (
        <View>
            <Text>Hello from HomeScreen</Text>
            <Button onPress={logoutHandler}>Logout</Button>
        </View>
    )
}

export default HomeScreen;