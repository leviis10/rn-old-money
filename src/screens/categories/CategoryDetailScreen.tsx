import type { StaticScreenProps } from "@react-navigation/native";
import { View } from "react-native";
import { Text } from "react-native-paper";
import type GetCategoryResponse from "../../models/categories/response/GetCategoryResponse";

export type CategoryDetailScreenParams = {
    category: GetCategoryResponse;
};

function CategoryDetailScreen({ route }: StaticScreenProps<CategoryDetailScreenParams>) {
    const { params } = route;
    console.log(params.category);

    return (
        <View>
            <Text>CategoryDetailScreen</Text>
        </View>
    );
}

export default CategoryDetailScreen;
