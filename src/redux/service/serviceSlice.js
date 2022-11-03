import { createSlice } from "@reduxjs/toolkit";
import { getReports, sendEmail, generatePDF, createReport, editReport, deleteReport } from "./serviceAction";
import { toast } from "react-toastify";

const initialState = {
  report: null,
  reports: [],
  sendemail: null,
  generatepdf: null,
  loading: true,
  error: {},
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Pending
      .addCase(getReports.pending,(state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(createReport.pending,(state,action) => {
        return {
          ...state,
          loading: true,
        }
      })
      .addCase(editReport.pending,(state,action) => {
        return {
          ...state,
          loading: true,
        }
      })
      .addCase(deleteReport.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        }
      })
      .addCase(sendEmail.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        }
      })
      .addCase(generatePDF.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        }
      })
      
      //Fulfilled
      .addCase(getReports.fulfilled,(state, {payload}) => {
        return {
          ...state,
          reports: payload, 
          loading: false,
        };
      })
      .addCase(createReport.fulfilled, (state, {payload}) => {
        const {status} = payload;
        if (status === 400) toast.warn("Actividade Selecionada já foi adicionada ao relatório");
        if (status === 500) toast.error("Erro no Servidor");
        if(payload.report.operation === "Gerar Relatório"){
          if (payload.report.reportInfo.length === 1) toast.success("Actividade Adicionada com sucesso.");
          if (payload.report.reportInfo.length === 2) toast.success("Gerar Relatório, Aguarde por favor");
        }else  {
          if (payload.report.reportInfo.length === 1) toast.success("Gerar Relatório, Aguarde por favor.");
        }
        return {
          ...state,
          report: payload, 
          loading: false, 
        }
      })
      .addCase(editReport.fulfilled, (state, {payload}) => {
        const {status} = payload;
        if (payload.user) toast.success("Dados alterados com sucesso");
        if (status === 500) toast.error("Erro no Servidor");
        return {
          ...state,
          report: payload, 
          loading: false,
        }
      })
      .addCase(deleteReport.fulfilled, (state, {payload}) => {
        return {
          ...state,
          loading: false,
          report: payload, 
        };
      })     
      .addCase(sendEmail.fulfilled, (state, { payload }) => {
        
        const { msg,status } = payload;
        if(msg === "OK" ){
          toast.success("Email enviado com sucesso!");
          toast.success("Verifique a sua caixa de Email!", { delay: 1000 });
        } 
        if (msg && status === 403) toast.warn("Consulte o Admin do Sistema");
        if (msg && status === 404) toast.error("Email inválido");
        if (msg && status === 500) toast.error("Erro no Servidor");

        return {
          ...state,
          sendemail: payload,
          loading: false,
        };
      })
      .addCase(generatePDF.fulfilled, (state, { payload }) => {
        return {
          ...state,
          generatepdf: payload,
          loading: false,
        };
      })
      
      //Rejected
      .addCase(getReports.rejected, (state, {payload}) => {
        return {
          ...state,
          loading: false,
          error: payload,
        }
      })
      .addCase(createReport.rejected, (state, {payload}) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(editReport.rejected, (state,{payload}) => {
        return {
          ...state,
          loading: false,
          error: payload,
        }
      })
      .addCase(deleteReport.rejected, (state, {payload}) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(sendEmail.rejected, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(generatePDF.rejected, (state, { payload }) => {
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

export default serviceSlice.reducer;
