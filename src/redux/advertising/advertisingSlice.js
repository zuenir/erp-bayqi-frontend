import { createSlice } from "@reduxjs/toolkit";
import {
  getAllAdvertisingCompany,
  getAllAdvertisingCompanyById,
  getAllAdvertisingCompanyByFilter,
  getAllAdvertisingCompanyByProfileId,
  verifyAdvertisingCompany,
  createAdvertisingCompany,
  createAdvertisingCompanyV1,
  stopAdvertisingCompanyById,
  publishAdvertisingCompanyById,
  publishAdvertisingCompanyChecking,
  deleteverifyAdvertisingCompany,
  deleteAdvertisingCompany,
  deleteAdvertisingCompanyById
} from "./advertisingAction";
import { toast } from "react-toastify";

const initialState = {
  advertising: null,
  advertisings: [],
  advertisingCompanys: [],
  loading: true,
  error: {},
  verify: false,
};

const advertisingSlice = createSlice({
  name: "advertising",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Pending  
      .addCase(getAllAdvertisingCompany.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getAllAdvertisingCompanyById.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getAllAdvertisingCompanyByFilter.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getAllAdvertisingCompanyByProfileId.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(createAdvertisingCompany.pending,(state,action) => {
        return {
          ...state,
          loading: true
        }
      })
      .addCase(createAdvertisingCompanyV1.pending,(state,action) => {
        return {
          ...state,
          loading: true
        }
      })
      .addCase(verifyAdvertisingCompany.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(publishAdvertisingCompanyById.pending, (state,action) => {
        return {
          ...state,
          loading: true
        }
      })
      .addCase(publishAdvertisingCompanyChecking.pending, (state,action) => {
        return {
          ...state,
          loading: true
        }
      })
      .addCase(stopAdvertisingCompanyById.pending,(state,action) => {
        return {
          ...state,
          loading: true
        }
      })
      .addCase(deleteverifyAdvertisingCompany.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(deleteAdvertisingCompany.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(deleteAdvertisingCompanyById.pending, (state,action) => {
        return {
          ...state,
          loading: true
        }
      })

      //Fulfilled 
      .addCase(getAllAdvertisingCompany.fulfilled, (state, { payload }) => {
        return {
          ...state,
          advertisings: payload,
          loading: false,
        };
      })
      .addCase(getAllAdvertisingCompanyById.fulfilled, (state, { payload }) => {
        return {
          ...state,
          advertisingCompanys: payload,
          loading: false,
        };
      })
      .addCase(getAllAdvertisingCompanyByFilter.fulfilled, (state, { payload }) => {
        return {
          ...state,
          advertisings: payload,
          loading: false,
        };
      })
      .addCase(getAllAdvertisingCompanyByProfileId.fulfilled, (state, { payload }) => {
        return {
          ...state,
          advertisings: payload,
          loading: false,
        };
      })
      .addCase(createAdvertisingCompany.fulfilled, (state, {payload}) => {
        return {
          ...state,
          advertisings: payload,
          loading: false,
        }
      })
      .addCase(createAdvertisingCompanyV1.fulfilled, (state, {payload}) => {
        const { msg, status } = payload;
        if (msg && status === 500) toast.error("Erro no Servidor");
        return {
          ...state,
          advertisingCompanys: payload,
          loading: false,
        }
      })
      .addCase(verifyAdvertisingCompany.fulfilled, (state, { payload }) => {
        const { msg, status } = payload;
        if (msg && status === 500) toast.error("Erro no Servidor");
        if (msg && status === 404) toast.error("Pacote Publicitário já cadastrado");
        return {
          ...state,
          verify: payload,
          loading: false,
        };
      })
      .addCase(publishAdvertisingCompanyById.fulfilled, (state, { payload }) => {
        return {
          ...state,
          advertisings: payload,
          loading: false,
        };
      })
      .addCase(publishAdvertisingCompanyChecking.fulfilled, (state, { payload }) => {
        return {
          ...state,
          advertisings: payload,
          loading: false,
        };
      })
      .addCase(stopAdvertisingCompanyById.fulfilled, (state, { payload }) => {
        return {
          ...state,
          advertisings: payload,
          loading: false,
        };
      })
      .addCase(deleteverifyAdvertisingCompany.fulfilled, (state, { payload }) => {
        const { msg, status } = payload;
        if (msg && status === 500) toast.error("Erro no Servidor");
        if (msg && status === 404) toast.error("Item Selecionado está em utilização");
        return {
          ...state,
          verify: payload,
          loading: false,
        };
      })
      .addCase(deleteAdvertisingCompany.fulfilled, (state, {payload}) => {
        const {status} = payload;
        if (status === 500) toast.error("Erro no Servidor");
        return {
          ...state,
          advertisings: payload,
          loading: false
        }
      })
      .addCase(deleteAdvertisingCompanyById.fulfilled, (state, {payload}) => {
        const {status} = payload;
        if (status === 500) toast.error("Erro no Servidor");
        return {
          ...state,
          advertisingCompanys: payload,
          loading: false
        }
      })
      //Rejected 
      .addCase(getAllAdvertisingCompany.rejected, (state, { payload }) => {
        return {
          ...state,
          loading: true,
          error: payload,
        };
      })
      .addCase(getAllAdvertisingCompanyById.rejected, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(getAllAdvertisingCompanyByFilter.rejected, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(getAllAdvertisingCompanyByProfileId.rejected, (state, { payload }) => {
        return {
          ...state,
          loading: false, 
          error: payload,
        };
      })
      .addCase(createAdvertisingCompany.rejected, (state, { payload }) => {
        return {
          ...state,
          loading: true,
          error: payload,
        };
      })
      .addCase(createAdvertisingCompanyV1.rejected, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(verifyAdvertisingCompany.rejected, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(publishAdvertisingCompanyById.rejected, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(publishAdvertisingCompanyChecking.rejected, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(stopAdvertisingCompanyById.rejected, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(deleteverifyAdvertisingCompany.rejected, (state, {payload}) => {
        return {
          ...state,
          loading: false,
          error: payload,
        }
      })
      .addCase(deleteAdvertisingCompany.rejected, (state, {payload}) => {
        return {
          ...state,
          loading: false,
          error: payload,
        }
      })
      .addCase(deleteAdvertisingCompanyById.rejected, (state, {payload}) => {
        return {
          ...state,
          loading: false,
          error: payload,
        }
      })
      //Default   
      .addDefaultCase((state, action) => {
        return state;
      });
  },
});

export default advertisingSlice.reducer;
