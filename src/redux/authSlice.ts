import { createSlice } from "@reduxjs/toolkit";
import { PersistConfig, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

interface AuthState {
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    isAuthenticated: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signIn: (state) => {
            state.isAuthenticated = true;
        },
        signOut: (state) => {
            state.isAuthenticated = false;
        }
    }
});

export const { signIn, signOut } = authSlice.actions;

const persistConfig: PersistConfig<AuthState> = {
    key: 'auth',
    storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

export default persistedAuthReducer;
