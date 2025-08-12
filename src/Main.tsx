import { PaperProvider } from "react-native-paper";
import App from "./App";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import store from "./store";
import { Provider } from "react-redux";

export default function Main() {
    return (
        <Provider store={store}>
            <PaperProvider>
                <SafeAreaView style={styles.container}>
                    <App />
                </SafeAreaView>
            </PaperProvider>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
