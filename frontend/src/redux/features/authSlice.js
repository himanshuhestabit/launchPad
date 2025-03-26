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
      state.userId = action.payload.userId;
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("role", action.payload.role);
      localStorage.setItem("userId", action.payload.userId);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.role = null;
      state.userId = null;
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
