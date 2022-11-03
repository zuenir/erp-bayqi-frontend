import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

//Get All users profiles
export const getAllUsersProfiles = createAsyncThunk(
  "profile/getAllUsersProfiles",
  async () => {
    try {
      const res = await axios.get("https://erpbayqi.herokuapp.com/api/profile");
      return res.data;
    } catch (error) {
      let err = {
        msg: error.response.statusText,
        status: error.response.status,
      };
      return err;
    }
  }
);

//Get Profile by roles
export const getAllUsersProfilesByFilter = createAsyncThunk(
  "profile/getAllUsersProfilesByFilter",
  async (roles) => {
    try {
      const res = await axios.get(`https://erpbayqi.herokuapp.com/api/profile/filter/${roles}`);
      return res.data;
    } catch (error) {
      let err = {
        msg: error.response.statusText,
        status: error.response.status,
      };
      return err;
    }
  }
);

//Get current users profile
export const getCurrentProfile = createAsyncThunk(
  "profile/getCurrentProfile",
  async () => {
    try {
      const res = await axios.get("https://erpbayqi.herokuapp.com/api/profile/me");
      return res.data;
    } catch (error) {
      let err = {
        msg: error.response.statusText,
        status: error.response.status,
      };
      return err;
    }
  }
);

//Get Selected User Profile
export const getSelectedProfileById = createAsyncThunk(
  "profile/getSelectedProfileById",
  async (user_id) => {
    try {
      const res = await axios.get(`https://erpbayqi.herokuapp.com/api/profile/getuser/${user_id}`);
      return res.data;
    } catch (error) {
      let err = {
        msg: error.response.statusText,
        status: error.response.status,
      };
      return err;
    }
  }
);

//Create Profile User By Id
export const createProfileById = createAsyncThunk(
  "profile/createProfileById",
  async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        `https://erpbayqi.herokuapp.com/api/profile/add/${formData.user_id}`,
        formData,
        config
      );
      return res.data;
    } catch (error) {
      let err = {
        msg: error.response.statusText,
        status: error.response.status,
      };
      return err;
    }
  }
);

//Update Profile User By Id
export const updateProfileById = createAsyncThunk(
  "profile/updateProfileById",
  async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type":"application/json"
        }
      }
      const res = await axios.put(`https://erpbayqi.herokuapp.com/api/profile/edit/${formData.user_id}`,formData.values,config);
      return res.data;
    } catch (error) {
      let err = {
        msg: error.response.statusText,
        status: error.response.status,
      }
      return err;
    }
  }
);

//Delete Selected Profile By Id
export const deleteProfileById = createAsyncThunk('profile/deleteProfileById',async(user_id)=> {
  try {
    const res = await axios.delete(`https://erpbayqi.herokuapp.com/api/profile/delete/${user_id}`);
    return res.data;
  } catch (error) {
    let err = {
      msg: error.response.statusText,
      status: error.response.status,
    };
    return err;
  }
});