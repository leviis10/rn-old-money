import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

function Container({children}: PropsWithChildren) {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 12.5,
        paddingRight: 12.5
    }
});

export default Container;