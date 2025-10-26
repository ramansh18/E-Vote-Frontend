import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  token: null,
  loading: true,
  isAdmin: false, // Admin state for logic
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.isAdmin = action.payload.isAdmin || false;
      state.loading = false;
    },
    setLogout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.isAdmin = false;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoginSuccess, setLogout, setLoading } = authSlice.actions;
export default authSlice.reducer;
