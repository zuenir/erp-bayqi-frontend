import { createSlice } from "@reduxjs/toolkit";
import {
  getAllAdvertisingPackage,
  createAdvertisingPackage,
  getSelectedAdvertisingPackageById,
  deleteAdvertisingPackageById,
  updateAdvertisingPackageById,
} from "./advertisingPackageAction";
import { toast } from "react-toastify";

const initialState = {
  advertisingPackage: null,
  advertisingPackages: [],
  loading: true,
  error: {},
};

const advertisingPackageSlice = createSlice({
  name: "advertisingpackage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAdvertisingPackage.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(createAdvertisingPackage.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getSelectedAdvertisingPackageById.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updateAdvertisingPackageById.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(deleteAdvertisingPackageById.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      //Fulfilled
      .addCase(getAllAdvertisingPackage.fulfilled, (state, { payload }) => {
        return {
          ...state,
          advertisingPackages: payload,
          loading: false,
        };
      })
      .addCase(createAdvertisingPackage.fulfilled, (state, { payload }) => {
        if(payload.length !== 0) toast.success("Pacote cadastrado com sucesso");
        return {
          ...state,
          advertisingPackages: payload,
          loading: false,
        };
      })
      .addCase(getSelectedAdvertisingPackageById.fulfilled, (state, { payload }) => {
        return {
          ...state,
          advertisingPackage: payload,
          loading: false,
        };
      })
      .addCase(updateAdvertisingPackageById.fulfilled, (state, { payload }) => {
        if(payload.length !== 0) toast.success("Dados atualizados com sucesso");
        return {
          ...state,
          advertisingPackages: payload,
          loading: false,
        };
      })
      .addCase(deleteAdvertisingPackageById.fulfilled, (state, { payload }) => {
        return {
          ...state,
          advertisingPackages: payload,
          loading: false,
        };
      })
      //Rejected
      .addCase(getAllAdvertisingPackage.rejected, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(createAdvertisingPackage.rejected, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(getSelectedAdvertisingPackageById.rejected, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(updateAdvertisingPackageById.rejected, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(deleteAdvertisingPackageById.rejected, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addDefaultCase((state, action) => {
        return state;
      });
  },
});

export default advertisingPackageSlice.reducer;
