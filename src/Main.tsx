import { PaperProvider } from "react-native-paper";
import App from "./App";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

export default function Main() {
    return (
        <PaperProvider>
            <SafeAreaView style={styles.container}>
                <App />
            </SafeAreaView>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
