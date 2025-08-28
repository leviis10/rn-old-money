import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Switch, Text, TextInput } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { Dropdown } from "react-native-paper-dropdown";
import Container from "../../components/utils/Container";
import { formatDate } from "../../utils/dateUtils";

interface RangeType {
    startDate?: Date;
    endDate?: Date;
}

function CreateBudgetScreen() {
    const [isRepeatableSwitchOn, setIsRepeatableSwitchOn] = useState(false);
    const [repetitionTypeInput, setRepetitionTypeInput] = useState<string | undefined>();
    const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState(false);
    const [range, setRange] = useState<RangeType>({ startDate: undefined, endDate: undefined });

    const onToggleSwitch = function () {
        setIsRepeatableSwitchOn(!isRepeatableSwitchOn);
    };

    const repetitionTypeOptions = [
        { label: "Daily", value: "DAILY" },
        { label: "Weekly", value: "WEEKLY" },
        { label: "Monthly", value: "MONTHLY" },
        { label: "Yearly", value: "YEARLY" },
    ];

    const openDatePickerRangeModalHandler = function () {
        setIsDatePickerModalOpen(true);
    };

    const closeDatePickerModalHandler = function () {
        setIsDatePickerModalOpen(false);
    };

    const confirmDatePickerModalHandler = function ({ startDate, endDate }: RangeType) {
        closeDatePickerModalHandler();
        setRange({ startDate, endDate });
    };

    return (
        <Container>
            <View style={styles.createBudgetContainer}>
                <TextInput label="Name" mode="outlined" />
                <TextInput label="Limit" mode="outlined" inputMode="decimal" />
                <TextInput label="Description" mode="outlined" multiline />
                <View style={styles.createBudgetRepeatContainer}>
                    <Text>Is Repeatable?</Text>
                    <Switch value={isRepeatableSwitchOn} onValueChange={onToggleSwitch} />
                </View>
                {isRepeatableSwitchOn && (
                    <View>
                        <Dropdown
                            label="Repetition Type"
                            placeholder="Select Repetition Type"
                            options={repetitionTypeOptions}
                            value={repetitionTypeInput}
                            onSelect={setRepetitionTypeInput}
                            mode="outlined"
                        />
                    </View>
                )}
                {!isRepeatableSwitchOn && (
                    <View style={styles.createBudgetNonRepeatContainer}>
                        <TouchableOpacity
                            onPress={openDatePickerRangeModalHandler}
                            style={styles.createBudgetNonRepeatStartDate}
                        >
                            <TextInput
                                editable={false}
                                mode="outlined"
                                label="Start Date"
                                value={formatDate(range.startDate)}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={openDatePickerRangeModalHandler}
                            style={styles.createBudgetNonRepeatEndDate}
                        >
                            <TextInput
                                editable={false}
                                mode="outlined"
                                label="End Date"
                                value={formatDate(range.endDate)}
                            />
                        </TouchableOpacity>
                        <DatePickerModal
                            locale="en"
                            mode="range"
                            visible={isDatePickerModalOpen}
                            onDismiss={closeDatePickerModalHandler}
                            startDate={range.startDate}
                            endDate={range.endDate}
                            onConfirm={confirmDatePickerModalHandler}
                            presentationStyle="pageSheet"
                        />
                    </View>
                )}
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    createBudgetContainer: {
        gap: 10,
    },
    createBudgetRepeatContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    createBudgetNonRepeatContainer: {
        flexDirection: "row",
        gap: 10,
    },
    createBudgetNonRepeatStartDate: {
        flex: 1,
    },
    createBudgetNonRepeatEndDate: {
        flex: 1,
    },
});

export default CreateBudgetScreen;
