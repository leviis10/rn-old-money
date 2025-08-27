import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import SafeAreaView, { type InsetDirection } from "./SafeAreaView";

function Content({ children }: PropsWithChildren) {
    return <View style={styles.container}>{children}</View>;
}

interface ContainerProps {
    isSafeArea?: boolean;
    directions?: InsetDirection[] | InsetDirection;
}

function Container({ children, isSafeArea, directions }: PropsWithChildren<ContainerProps>) {
    if (isSafeArea) {
        return (
            <SafeAreaView directions={directions}>
                <Content>{children}</Content>
            </SafeAreaView>
        );
    }

    return <Content>{children}</Content>;
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 12.5,
        paddingRight: 12.5,
        flex: 1,
    },
});

export default Container;
