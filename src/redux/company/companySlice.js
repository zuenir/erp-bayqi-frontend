import { createSlice } from "@reduxjs/toolkit";
import {
  getAllCompanys,
  getAllCompanysByProfileId,
  getAllCompanyByFilter,
  getCurrentCompanyById,
  createCompany,
  updateCompanyById,
  deleteCompanyById,
  deleteCompanyByProfileId,
} from "./companyAction";
import { toast } from "react-toastify";

const initialState = {
  company: null,
  companys: [],
  loading: true,
  error: {},
  companyCountActive: 0,
  companyCountPending: 0,
  companyCountCanceled: 0,
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Pending 
      .addCase(getAllCompanys.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getAllCompanysByProfileId.pending, (state,action) => {
        return {
          ...state,
          loading:true
        }
      })
      .addCase(getAllCompanyByFilter.pending, (state,action) => {
        return {
          ...state,
          loading:true
        }
      })
      .addCase(getCurrentCompanyById.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(createCompany.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updateCompanyById.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(deleteCompanyById.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(deleteCompanyByProfileId.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      /*
        Fulfilled 
        case GET_COMPANY:
        case CREATE_COMPANY:
        case UPDATE_COMPANY:
	      case DELETE_COMPANY:
        case GET_COMPANYS: 
      */
      .addCase(getAllCompanys.fulfilled, (state, { payload }) => {
        return {
          ...state,
          companys: payload,
          loading: false,
          companyCountActive: payload.filter( (company) => company.status === "Fechado").length,
          companyCountPending: payload.filter( (company) => company.status === "Aberto").length,
          companyCountCanceled: payload.filter( (company) => company.status === "Cancelado").length,
        };
      })
      .addCase(getAllCompanyByFilter.fulfilled, (state,{payload}) => {
        return {
          ...state,
          companys: payload,
          loading: false,
        };
      })
      .addCase(getAllCompanysByProfileId.fulfilled, (state, {payload}) => {
        return {
          ...state,
          companys: payload,
          loading: false,
          companyCountActive: payload.filter( (company) => company.status === "Fechado").length,
          companyCountPending: payload.filter( (company) => company.status === "Aberto").length,
          companyCountCanceled: payload.filter( (company) => company.status === "Cancelado").length,
        };
      })
      .addCase(getCurrentCompanyById.fulfilled,(state, { payload }) => {
        return {
          ...state,
          company: payload[0],
          loading: false,
        };
      })
      .addCase(createCompany.fulfilled,(state, { payload }) => {
        if(payload.length !== 0) toast.success("Parceiro cadastrado com sucesso");
          return {
            ...state,
            companys: payload,
            loading: false,
          };
        }
      )
      .addCase(updateCompanyById.fulfilled,(state, { payload }) => {
        if(payload.company_name) toast.success("Dados atualizados com sucesso");
          return {
            ...state,
            company: payload,
            loading: false,
          };
        }
      ) 
      .addCase(deleteCompanyById.fulfilled, (state, { payload }) => {
        return {
          ...state,
          companys: payload,
          loading: false,
        };
      })
      .addCase(deleteCompanyByProfileId.fulfilled, (state, { payload }) => {
        return {
          ...state,
          companys: payload,
          loading: false,
        };
      })

      //Rejected
      // case COMPANY_ERROR: 
      .addCase(getAllCompanys.rejected, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(getAllCompanyByFilter.rejected, (state, { payload }) => {
        return {
          ...state,
          loading: true,
          error: payload,
        };
      })
      .addCase(getAllCompanysByProfileId.rejected, (state, {payload}) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(getCurrentCompanyById.rejected, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(createCompany.rejected, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(updateCompanyById.rejected, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(deleteCompanyById.rejected, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(deleteCompanyByProfileId.rejected, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      ///Default 
      .addDefaultCase((state, action) => {
        return state;
      });
  },
});

export default companySlice.reducer;
