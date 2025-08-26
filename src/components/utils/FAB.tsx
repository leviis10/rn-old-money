import { FAB as PaperFAB } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface FABProps {
    icon: string;
    onPress: () => void;
}

function FAB({ icon, onPress }: FABProps) {
    const insets = useSafeAreaInsets();

    return (
        <PaperFAB
            icon={icon}
            style={{
                position: "absolute",
                right: insets.right + 19.53,
                bottom: insets.bottom + 19.53,
            }}
            onPress={onPress}
        />
    );
}

export default FAB;
