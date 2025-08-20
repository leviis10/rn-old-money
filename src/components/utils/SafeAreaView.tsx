import { PropsWithChildren } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function SafeAreaView({ children }: PropsWithChildren) {
    const insets = useSafeAreaInsets();

    return (
        <View
            style={{
                top: insets.top,
                right: insets.right,
                bottom: insets.bottom,
                left: insets.left,
            }}
        >
            {children}
        </View>
    );
}

export default SafeAreaView;
