import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigators/RootStack";

function useAppNavigation() {
    return useNavigation<NativeStackNavigationProp<RootStackParamList>>();
}

export default useAppNavigation;
