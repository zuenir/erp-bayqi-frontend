import { createSlice } from "@reduxjs/toolkit";
import {
  loadUser,
  getLogin,
  createUserById,
  updateUserById,
  updateUserLogedById,
  deleteUserById,
  ChangeForgotPasswordUserById,
} from "./authAction";
import { toast } from "react-toastify";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  roles: null,
  loading: true,
  user: null,
  createdUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /*
    case REGISTER_FAIL:criar
    case LOGOUT:
    case ACCOUNT_DELETE: 
    */
    auth_actions(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("bayqi_erp_userloaded");
      localStorage.removeItem("bayqi_erp_location");
      return {
        token: localStorage.getItem("token"),
        isAuthenticated: null,
        roles: null,
        loading: true,
        user: null,
        createdUser: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getLogin.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(createUserById.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updateUserById.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updateUserLogedById.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(ChangeForgotPasswordUserById.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(deleteUserById.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      /*
      
      */
      .addCase(loadUser.fulfilled, (state, { payload }) => {
        let user_loaded = {
          isAuthenticated: true,
          loading: false,
          roles: payload.roles,
        };

        let obj_serialized = JSON.stringify(user_loaded);

        localStorage.setItem("bayqi_erp_userloaded", obj_serialized);
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: payload,
          roles: payload.roles,
        };
      })
      .addCase(getLogin.fulfilled, (state, { payload }) => {
        localStorage.setItem("token", payload.token);

        const { msg, status } = payload;
        if (msg && status === 403) toast.warn("Consulte o Admin do Sistema");
        if (msg && status === 404) toast.error("Email e/ou senha inválidos");
        if (msg && status === 500) toast.error("Erro no Servidor");

        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false,
        };
      })
      .addCase(createUserById.fulfilled, (state, { payload }) => {
        return {
          ...state,
          createdUser: payload,
          loading: false,
        };
      })
      .addCase(updateUserById.fulfilled, (state, { payload }) => {
        if(payload.email) toast.success("Dados actualizado com sucesso");
        return {
          ...state,
          createdUser: payload,
          loading: false,
        };
      })
      .addCase(updateUserLogedById.fulfilled, (state, { payload }) => {
        if(payload.email) toast.success("Dados actualizado com sucesso");
        return {
          ...state,
          createdUser: payload,
          loading: false,
        };
      })
      .addCase(ChangeForgotPasswordUserById.fulfilled, (state, { payload }) => {
        const { msg, status } = payload;
        if (msg === "OK" ) toast.success("Palavra-passe alterada com sucesso!");
        if (msg && status === 400) toast.error("Erro no Servidor");
        if (msg && status === 403) toast.warn("Consulte o Admin do Sistema");
        if (msg && status === 500) toast.error("Erro no Servidor");

        return {
          ...state,
          ...payload,
          loading: false,
        };
      })
      .addCase(deleteUserById.fulfilled, (state, { payload }) => {
        return {
          ...state,
          createdUser: payload,
          loading: false,
        };
      })
      /*
        case REGISTER_FAIL: criar
        case AUTH_ERROR:
        case LOGIN_FAIL:
      */
      .addCase(loadUser.rejected, (state, { payload }) => {
        localStorage.removeItem("token");
        localStorage.removeItem("bayqi_erp_userloaded");
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(getLogin.rejected, (state, { payload }) => {
        localStorage.removeItem("token");
        localStorage.removeItem("bayqi_erp_userloaded");
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(createUserById.rejected, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(updateUserById.rejected, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(updateUserLogedById.rejected, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(ChangeForgotPasswordUserById.rejected, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(deleteUserById.rejected, (state, { payload }) => {
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

export const selectGetState = (state) => state.auth;
export const selectGetCurrentProfile = (state) => state.profile;

export const { auth_actions } = authSlice.actions;

export default authSlice.reducer;
