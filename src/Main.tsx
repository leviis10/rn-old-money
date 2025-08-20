import { StyleSheet, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";

export default function Main() {
    return (
        <Provider store={store}>
            <PaperProvider>
                <View style={styles.container}>
                    <App />
                </View>
            </PaperProvider>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
