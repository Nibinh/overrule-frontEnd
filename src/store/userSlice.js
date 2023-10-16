import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  logMsg: "",
  logedEmail: "",
  logedError: "",
  regMsg: "",
  regError: "",
  regMail: "",
  verifiedMsg: "",
  verifiedError: "",
  regLoading: "",
  logedUserName: "",
};
const GET_USER_URL = `http://localhost:8000`;

export const login = createAsyncThunk("users/login", async (values) => {
  try {
    const response = await axios.post(`${GET_USER_URL}/user/login`, values);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err.response);
    throw new Error(err.response.data);
  }
});
export const register = createAsyncThunk("users/register", async (values) => {
  try {
    const response = await axios.post(`${GET_USER_URL}/user/register`, values);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err.response);
    throw new Error(err.response.data);
  }
});
export const verifyEmail = createAsyncThunk(
  "users/verifyEmail",
  async (body) => {
    try {
      const response = await axios.post(`${GET_USER_URL}/user/verifyotp`, body);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err.response);
      throw new Error(err.response.data);
    }
  }
);

const getUserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logErrorMsg(state, action) {
      state.logedError = "";
    },
    logMsgDis(state, action) {
      state.logMsg = "";
    },
    regErrorMsg(state, action) {
      state.regError = "";
    },
    regMsgDis(state, action) {
      state.regMsg = "";
    },
    verifyEmailErrorDis(state, action) {
      state.verifiedError = "";
    },
    verifyEmailMsg(state, action) {
      state.verifiedMsg = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        console.log("pending");
      })
      .addCase(login.fulfilled, (state, action) => {
        state.logMsg = action.payload.message;
        state.logedEmail = action.payload.email;
        state.logedUserName = action.payload.name;
        console.log(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        console.log("rejected", action.error.message);
        state.logedError = action.error.message;
      })
      .addCase(register.pending, (state) => {
        console.log("pending");
        state.regLoading = "pending";
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log(action.payload);
        state.regMsg = action.payload.message;
        state.regMail = action.payload.mail;
        state.regLoading = "fulfilled";
      })
      .addCase(register.rejected, (state, action) => {
        console.log(action.error);
        state.regError = action.error.message;
        state.regLoading = "rejected";
      })
      .addCase(verifyEmail.pending, () => {
        console.log("pending");
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.verifiedMsg = action.payload;
        console.log(action.payload);
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.verifiedError = action.error.message;
        console.log(action.error.message);
      });
  },
});

export const {
  logErrorMsg,
  logMsgDis,
  regErrorMsg,
  regMsgDis,
  verifyEmailErrorDis,
  verifyEmailMsg,
} = getUserSlice.actions;

export default getUserSlice.reducer;
