import { StyleSheet, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { en, registerTranslation } from "react-native-paper-dates";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import { setHttpClientStore } from "./utils/httpClient";

setHttpClientStore(store);
registerTranslation("en", en);

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
