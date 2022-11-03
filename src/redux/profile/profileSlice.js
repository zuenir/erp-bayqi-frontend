import { createSlice } from "@reduxjs/toolkit";
import {
  getAllUsersProfiles,
  getAllUsersProfilesByFilter,
  getCurrentProfile,
  getSelectedProfileById,
  createProfileById,
  updateProfileById,
  deleteProfileById,
} from "./profileAction";
import { toast } from "react-toastify";

const initialState = {
  profile: null,
  profileSelectedBy: null,
  profiles: [],
  loading: true,
  error: {},
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    //CLEAR_PROFILE
    profile_actions(state) {
      return {
        profile: null,
        profileSelectedBy: null,
        profiles: [],
        loading: true,
        error: {},
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentProfile.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getAllUsersProfiles.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getAllUsersProfilesByFilter.pending, (state,action) => {
        return {
          ...state,
          loading:true
        };
      })
      .addCase(getSelectedProfileById.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(createProfileById.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updateProfileById.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(deleteProfileById.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      /*
        Fulfilled
        case GET_PROFILE:
        case GET_PROFILES:
        case CREATE_PROFILE:
        case UPDATE_PROFILE:
        case DELETE_PROFILE:
      */
      .addCase(getCurrentProfile.fulfilled, (state, { payload }) => {
        return {
          ...state,
          profile: payload,
          loading: false,
        };
      })
      .addCase(getAllUsersProfiles.fulfilled, (state, { payload }) => {
        return {
          ...state,
          profiles: payload.filter((prof) => prof.user !== state.profile.user._id),
          loading: false,
        };
      })
      .addCase(getAllUsersProfilesByFilter.fulfilled,(state,{payload}) => {
        return {
          ...state,
          profiles: payload.filter((prof) => prof.user !== state.profile.user._id),
          loading: false,
        };
      })
      .addCase(getSelectedProfileById.fulfilled, (state, { payload }) => {
        return {
          ...state,
          profileSelectedBy: payload,
          loading: false,
        };
      })
      .addCase(createProfileById.fulfilled, (state, { payload }) => {
        if(payload.name) toast.success("Agente cadastrado com sucesso");
        return {
          ...state,
          profileSelectedBy: payload,
          loading: false,
        };
      })
      .addCase(updateProfileById.fulfilled, (state, { payload }) => {
        if(payload.name) toast.success("Dados actualizado com sucesso");
        return {
          ...state,
          profileSelectedBy: payload,
          loading: false,
        };
      })
      .addCase(deleteProfileById.fulfilled, (state, {payload}) => {
        return {
          ...state,
          profiles: payload.filter((prof) => prof.user !== state.profile.user._id),
          profileSelectedBy: null,
          loading: false,
        };
      })
      // case PROFILE_ERROR:
      .addCase(getCurrentProfile.rejected, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(getAllUsersProfiles.rejected, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(getSelectedProfileById.rejected, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(createProfileById.rejected, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(updateProfileById.rejected, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(getAllUsersProfilesByFilter.rejected,(state,{payload}) => {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      })
      .addCase(deleteProfileById.rejected, (state, {payload}) => {
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

export const { profile_actions } = profileSlice.actions;

export default profileSlice.reducer;
