import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import AuthStack from "./navigators/AuthStack";

function App() {
    return (
        <View style={styles.container}>
            <StatusBar style="light" backgroundColor="#000" />
            <AuthStack />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;
