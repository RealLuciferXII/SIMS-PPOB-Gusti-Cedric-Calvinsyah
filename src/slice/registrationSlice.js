// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Async thunk untuk registrasi
// export const registerUser = createAsyncThunk(
//   'registration/registerUser',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post('/registration', userData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const registrationSlice = createSlice({
//   name: 'registration',
//   initialState: {
//     loading: false,
//     success: null,
//     error: null,
//   },
//   reducers: {
//     clearState: (state) => {
//       state.loading = false;
//       state.success = null;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.success = null;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = action.payload.message;
//         state.error = null;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.success = null;
//         state.error = action.payload.message;
//       });
//   },
// });

// export const { clearState } = registrationSlice.actions;
// export default registrationSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Set base URL untuk axios
const axiosInstance = axios.create({
  baseURL: "https://take-home-test-api.nutech-integrasi.com", // Base URL API
});

// Async thunk untuk registrasi
export const registerUser = createAsyncThunk(
  "registration/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      // Request POST ke endpoint `/registration`
      const response = await axiosInstance.post("/registration", userData);
      return response.data; // Mengembalikan data dari API jika sukses
    } catch (error) {
      // Menangani error dan mengirim pesan error dari API
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const registrationSlice = createSlice({
  name: "registration",
  initialState: {
    loading: false,
    success: null,
    error: null,
  },
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message; // Menyimpan pesan sukses dari API
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.success = null;
        state.error = action.payload.message || "Terjadi kesalahan."; // Menangani error
      });
  },
});

export const { clearState } = registrationSlice.actions;
export default registrationSlice.reducer;

