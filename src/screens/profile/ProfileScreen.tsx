import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Icon, Text, TouchableRipple } from "react-native-paper";
import SafeAreaView from "../../components/utils/SafeAreaView";
import useProtectedScreen from "../../hooks/useProtectedScreen";

function ProfileScreen() {
    useProtectedScreen();

    const navigation = useNavigation();

    const navigateToAllCategoriesScreenHandler = function () {
        navigation.navigate("AllCategoriesScreen");
    };

    return (
        <SafeAreaView>
            <TouchableRipple onPress={navigateToAllCategoriesScreenHandler} style={styles.itemRipple}>
                <View style={styles.itemContainer}>
                    <Icon source="shape-plus" size={30.52} />
                    <Text>Categories</Text>
                </View>
            </TouchableRipple>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    itemRipple: {
        paddingLeft: 19.53,
        paddingTop: 19.53,
        paddingBottom: 19.53,
        backgroundColor: "#dee2e6",
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
});

export default ProfileScreen;
