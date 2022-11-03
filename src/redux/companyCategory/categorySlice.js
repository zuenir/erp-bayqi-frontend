import { createSlice } from "@reduxjs/toolkit";
import {
  getAllCompanyCategorys,
  getCompanyCategorysById,
  CreateCompanyCategory,
  EditCompanyCategoryById,
  DeleteCompanyCategoryById,
} from "./categoryAction";

const initialState = {
  category: null,
  categorys: [],
  loading: true,
  error: {},
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCompanyCategorys.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getCompanyCategorysById.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(CreateCompanyCategory.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(EditCompanyCategoryById.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(DeleteCompanyCategoryById.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })

      .addCase(getAllCompanyCategorys.fulfilled, (state, { payload }) => {
        return {
          ...state,
          categorys: payload,
          loading: false,
        };
      })
      .addCase(getCompanyCategorysById.fulfilled, (state, { payload }) => {
        return {
          ...state,
          category: payload,
          loading: false,
        };
      })
      .addCase(CreateCompanyCategory.fulfilled, (state, { payload }) => {
        return {
          ...state,
          categorys: payload,
          loading: false,
        };
      })
      .addCase(EditCompanyCategoryById.fulfilled, (state, { payload }) => {
        return {
          ...state,
          categorys: payload,
          loading: false,
        };
      })
      .addCase(DeleteCompanyCategoryById.fulfilled, (state, { payload }) => {
        return {
          ...state,
          categorys: payload,
          loading: false,
        };
      })

      .addCase(getAllCompanyCategorys.rejected, (state, payload) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(getCompanyCategorysById.rejected, (state, payload) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(CreateCompanyCategory.rejected, (state, payload) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(EditCompanyCategoryById.rejected, (state, payload) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(DeleteCompanyCategoryById.rejected, (state, payload) => {
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

export default categorySlice.reducer;
