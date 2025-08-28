interface GetBudgetResponse {
    id: number;
    budget_config_id: number | null;
    name: string;
    startDate: string;
    endDate: string;
    currentAmount: string;
    limit: string;
    description: string | null;
}

export default GetBudgetResponse;
