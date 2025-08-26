import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Icon, Text, TouchableRipple } from "react-native-paper";
import FAB from "../../components/utils/FAB";
import useProtectedScreen from "../../hooks/useProtectedScreen";
import type GetCategoryResponse from "../../models/categories/response/GetCategoryResponse";
import CategoriesService from "../../services/CategoriesService";

function AllCategoriesScreen() {
    useProtectedScreen();

    const navigation = useNavigation();
    const [categories, setCategories] = useState<GetCategoryResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            (async () => {
                try {
                    setIsLoading(true);
                    const response = await CategoriesService.findAll();
                    setCategories(response.data);
                } catch (err) {
                    // TODO: handle error
                    console.error(err);
                } finally {
                    setIsLoading(false);
                }
            })();
        }, [])
    );

    const navigateToAddCategoryHandler = function () {
        navigation.navigate("AddCategoryScreen");
    };

    const navigateToCategoryDetailHandler = function (category: GetCategoryResponse) {
        navigation.navigate("CategoryDetailScreen", {
            category,
        });
    };

    return (
        <>
            {isLoading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator animating size="large" />
                </View>
            )}

            {!isLoading && categories.length === 0 && <Text>There is no category yet. Create one!</Text>}

            {!isLoading &&
                categories.length > 0 &&
                categories.map((category) => (
                    <TouchableRipple
                        key={category.id}
                        onPress={() => navigateToCategoryDetailHandler(category)}
                        style={styles.categoryItemRipple}
                    >
                        <View style={styles.categoryItemContainer}>
                            <Text variant="titleMedium">{category.name}</Text>
                            <Icon source="chevron-right" size={19.53} />
                        </View>
                    </TouchableRipple>
                ))}

            <FAB icon="plus" onPress={navigateToAddCategoryHandler} />
        </>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    categoryItemRipple: {
        paddingLeft: 15.63,
        paddingRight: 15.63,
        paddingTop: 19.53,
        paddingBottom: 19.53,
    },
    categoryItemContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
});

export default AllCategoriesScreen;
