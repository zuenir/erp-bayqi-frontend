import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllClockings = createAsyncThunk(
  "clocking/getAllClockings",
  async () => {
    try {
      const res = await axios.get("https://erpbayqi.herokuapp.com/api/clocking");
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

export const getAllClockingsByProfileId = createAsyncThunk(
  "clocking/getAllClockingsByProfileId",
  async (profile_id) => {
    try {
      const res = await axios.get(`https://erpbayqi.herokuapp.com/api/clocking/userloged/${profile_id}`);
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

export const createClockingsByProfileId = createAsyncThunk(
  "clocking/createClockingsByProfileId",
  async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        `https://erpbayqi.herokuapp.com/api/clocking/${formData.profile_id}`,
        formData.values,
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

export const updateClockingsByProfileId = createAsyncThunk(
  "clocking/updateClockingsByProfileId",
  async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.put(
        `https://erpbayqi.herokuapp.com/api/clocking/${formData.profile_id}`,
        formData.values,
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

export const deleteClockingsByProfileId = createAsyncThunk('clocking/deleteClockingsByProfileId', async(profile_id) => {
  try {
    var res = await axios.delete(`https://erpbayqi.herokuapp.com/api/clocking/${profile_id}`);
    return res.data;  
  } catch (error) {
    let err = {
      msg: error.response.statusText,
      status: error.response.status
    }
    return err;
  }
})