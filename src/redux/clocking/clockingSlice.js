import { createSlice } from "@reduxjs/toolkit";
import {
  getAllClockings,
  getAllClockingsByProfileId,
  createClockingsByProfileId,
  updateClockingsByProfileId,
  deleteClockingsByProfileId
} from "./clockingAction";
import { toast } from "react-toastify";

const initialState = {
  clocking: null,
  clockings: [],
  loading: true,
  error: {},
};

const clockingSlice = createSlice({
  name: "clocking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Pending
      .addCase(getAllClockings.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getAllClockingsByProfileId.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(createClockingsByProfileId.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updateClockingsByProfileId.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(deleteClockingsByProfileId.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })

      //Fulfilled 
      .addCase(getAllClockings.fulfilled, (state, { payload }) => {
        return {
          ...state,
          clockings: payload,
          loading: false,
        };
      })
      .addCase(getAllClockingsByProfileId.fulfilled, (state, { payload }) => {
        return {
          ...state,
          clockings: payload,
          loading: false,
        };
      })
      .addCase(createClockingsByProfileId.fulfilled, (state, { payload }) => {
        const {status} = payload;
        if(status === 400) toast.warn("Check-in já foi realizado");
        if (status === 500) toast.error("Erro no Servidor");
        if(payload.profile) toast.success("Check-in realizado com sucesso");
        return {
          ...state,
          clocking: payload,
          loading: false,
        };
      })
      .addCase(updateClockingsByProfileId.fulfilled, (state, { payload }) => {
        const {status} = payload;
        if(status === 400)toast.warn("Check-out já foi realizado");
        if (status === 500) toast.error("Erro no Servidor");
        if(payload.profile) toast.success("Check-out realizado com sucesso");
        return {
          ...state,
          clocking: payload,
          loading: false,
        };
      })
      .addCase(deleteClockingsByProfileId.fulfilled, (state, { payload }) => {
        return {
          ...state,
          clockings: payload,
          loading: false,
        };
      })

      //Rejected 
      .addCase(getAllClockings.rejected, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(getAllClockingsByProfileId.rejected, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(createClockingsByProfileId.rejected, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(updateClockingsByProfileId.rejected, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(deleteClockingsByProfileId.rejected, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })

      //Default
      .addDefaultCase((state, action) => {
        return state;
      });
  },
});

export default clockingSlice.reducer;
