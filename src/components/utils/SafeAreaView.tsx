import { PropsWithChildren } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export enum InsetDirection {
    UP,
    RIGHT,
    DOWN,
    LEFT,
    ALL,
}

interface SafeAreaViewProps {
    directions?: InsetDirection[] | InsetDirection;
}

function SafeAreaView({ children, directions = InsetDirection.ALL }: PropsWithChildren<SafeAreaViewProps>) {
    const insets = useSafeAreaInsets();

    const style: StyleProp<ViewStyle> = {
        flex: 1,
    };

    const applyInsets = function (target: typeof style, direction: InsetDirection) {
        if (direction === InsetDirection.ALL) {
            target.top = insets.top;
            target.right = insets.right;
            target.bottom = insets.bottom;
            target.left = insets.left;
            return;
        }

        switch (direction) {
            case InsetDirection.UP:
                target.top = insets.top;
                break;
            case InsetDirection.RIGHT:
                target.right = insets.right;
                break;
            case InsetDirection.DOWN:
                target.bottom = insets.bottom;
                break;
            case InsetDirection.LEFT:
                target.left = insets.left;
                break;
        }
    };

    if (Array.isArray(directions)) {
        for (const direction of directions) {
            applyInsets(style, direction);
        }
    }

    if (!Array.isArray(directions)) {
        applyInsets(style, directions);
    }

    return <View style={style}>{children}</View>;
}

export default SafeAreaView;
