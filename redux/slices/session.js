import { createSlice } from "@reduxjs/toolkit";
const status = {
  LOADING: "loading",
  AUTHENTICATED: "authenticated",
  UNAUTHENTICATED: "unauthenticated",
};

const sessionSlice = createSlice({
  name: "session",
  initialState: {
    user: null,
    status: status.LOADING,
  },
  reducers: {
    loginUser(state, action) {
      const { user } = action.payload;
      state.user = user;
      state.status = status.AUTHENTICATED;
    },
    logoutUser(state) {
      state.user = null;
      state.status = status.UNAUTHENTICATED;
    },
  },
});

export const { loginUser, logoutUser } = sessionSlice.actions;

export default sessionSlice.reducer;
