import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createAdvertisingPackage = createAsyncThunk(
  "advertisingpackage/createAdvertisingPackage",
  async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("https://erpbayqi.herokuapp.com/api/advertisingpackage/add", formData, config);
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

export const getAllAdvertisingPackage = createAsyncThunk(
  "advertisingpackage/getAllAdvertisingPackage",
  async () => {
    try {
      const res = await axios.get("https://erpbayqi.herokuapp.com/api/advertisingpackage");
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

export const getSelectedAdvertisingPackageById = createAsyncThunk("advertisingpackage/getSelectedAdvertisingPackageById", async(advertisingPackage_id) => {
    try {
        const res = await axios.get(`https://erpbayqi.herokuapp.com/api/advertisingpackage/${advertisingPackage_id}`);
        return res.data;
      } catch (error) {
        let err = {
          msg: error.response.statusText,
          status: error.response.status,
        };
        return err;
      }
});

export const updateAdvertisingPackageById = createAsyncThunk('advertisingpackage/updateAdvertisingPackageById', async(formData) => {
  try {
    const config = {
      headers: {
        "Content-Type":"application/json"
      }
    };

    const res = await axios.put(`https://erpbayqi.herokuapp.com/api/advertisingpackage/edit/${formData.advertisingPackage_id}`,formData.values,config);
    return res.data;
  } catch (error) {
    let err = {
      msg: error.response.statusText,
      status: error.response.status,
    };
    return err;
  }
});

export const deleteAdvertisingPackageById = createAsyncThunk(
  "advertisingpackage/deleteAdvertisingPackageById",
  async (advertisingPackage_id) => {
    try {
      const res = await axios.delete(`https://erpbayqi.herokuapp.com/api/advertisingpackage/delete/${advertisingPackage_id}`);
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


