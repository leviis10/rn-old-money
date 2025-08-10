import { View } from "react-native";

interface SpacerProps {
    height: number;
}

function Spacer({ height }: SpacerProps) {
    return <View style={{ height }} />;
}

export default Spacer;
