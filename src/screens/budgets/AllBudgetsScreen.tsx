import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Icon, Text } from "react-native-paper";
import Container from "../../components/utils/Container";
import useProtectedScreen from "../../hooks/useProtectedScreen";
import type GetBudgetResponse from "../../models/budgets/response/GetBudgetResponse";
import BudgetService from "../../services/BudgetService";

function AllBudgetsScreen() {
    useProtectedScreen();

    const [isFetchingBudget, setIsFetchingBudget] = useState(true);
    const [budgets, setBudgets] = useState<GetBudgetResponse[]>([]);
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            (async () => {
                try {
                    setIsFetchingBudget(true);
                    const response = await BudgetService.findAll();
                    setBudgets(response.data);
                } catch (err) {
                    // TODO: handle error
                    console.error(err);
                } finally {
                    setIsFetchingBudget(false);
                }
            })();
        }, [])
    );

    const navigateToCreateBudgetScreenHandler = function () {
        navigation.navigate("CreateBudgetScreen");
    };

    return (
        <>
            {isFetchingBudget && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator animating size="large" />
                </View>
            )}

            {!isFetchingBudget && budgets.length === 0 && (
                <Container>
                    <View style={styles.containerBudgetNotFound}>
                        <Icon source="cash-multiple" size={74.51} />
                        <View style={styles.budgetNotFoundTextBox}>
                            <Text variant="labelLarge">You have no budget</Text>
                            <Text style={styles.budgetNotFoundDescription} variant="bodyMedium">
                                Start Saving money by creating budgets and we will help you stick to it
                            </Text>
                        </View>
                        <Button
                            style={styles.budgetNotFoundButtonCreate}
                            mode="contained"
                            onPress={navigateToCreateBudgetScreenHandler}
                        >
                            Create a budget
                        </Button>
                    </View>
                </Container>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    containerBudgetNotFound: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 19.53,
    },
    budgetNotFoundTextBox: {
        alignItems: "center",
        gap: 6.4,
    },
    budgetNotFoundDescription: {
        textAlign: "center",
    },
    budgetNotFoundButtonCreate: {
        alignSelf: "stretch",
    },
});

export default AllBudgetsScreen;
