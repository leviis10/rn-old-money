import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginPayload } from "./types/LoginPayload";

export interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
}

const initialState: AuthState = {
    accessToken: null,
    refreshToken: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<LoginPayload>) {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        unsetToken(state) {
            state.accessToken = null;
            state.refreshToken = null;
        },
    },
});

export const { setToken, unsetToken } = authSlice.actions;

export default authSlice.reducer;
