import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import FindAllWalletsParams from "../../../models/wallets/request/FindAllWalletsParams";
import GetWalletResponse from "../../../models/wallets/response/GetWalletResponse";
import WalletService from "../../../services/WalletService";
import ErrorResponse from "../../../models/global/response/ErrorResponse";

interface WalletsState {
    wallets: GetWalletResponse[];
    isLoading: boolean;
    errorMessage: string | null;
}

const initialState: WalletsState = {
    wallets: [],
    isLoading: false,
    errorMessage: null,
};

export const findAllWallets = createAsyncThunk("wallets/findAllWallets", async (query: FindAllWalletsParams | null) => {
    return await WalletService.findAll(query);
});

export const walletsSlice = createSlice({
    name: "wallets",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(findAllWallets.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(findAllWallets.fulfilled, (state, action) => {
                state.wallets = action.payload.data;
                state.isLoading = false;
            })
            .addCase(findAllWallets.rejected, (state, action) => {
                const error = action.error as ErrorResponse;
                state.errorMessage = `(${error.code}) ${error.message}`;
                state.isLoading = false;
            });
    },
});

// export const {  } = walletsSlice.actions;

export default walletsSlice.reducer;
