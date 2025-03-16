import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")) || false,
  role: localStorage.getItem("role") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.role = action.payload.role;
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("role", action.payload.role);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.role = null;
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("role");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
