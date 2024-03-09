import { createSlice } from "@reduxjs/toolkit";
const state = {
  SUCCESS: "success",
  FAIL: "fail",
  WARNING: "warning",
  IDLE: "idle",
};

const toastSlice = createSlice({
  name: "toast",
  initialState: {
    toast_state: null,
    status: null,
    hide: true,
  },
  reducers: {
    createToast(state, action) {
      let { toast_state, status } = action.payload;
      state.status = status;
      state.toast_state = toast_state;
      state.hide = !state.hide;
    },
    deleteToast(state, action) {
      state.toast_state = null;
      state.status = null;
      state.hide = !state.hide;
    },
  },
});

export const { createToast, deleteToast } = toastSlice.actions;

export default toastSlice.reducer;
