import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Get All Companys
export const getAllCompanys = createAsyncThunk(
  "company/getAllCompanys",
  async () => {
    try {
      const res = await axios.get("https://erpbayqi.herokuapp.com/api/company");
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

//Get Company by ID
export const getCurrentCompanyById = createAsyncThunk(
  "company/getCurrentCompanyById",
  async (company_id) => {
    try {
      const res = await axios.get(`https://erpbayqi.herokuapp.com/api/company/${company_id}`);
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

//Get Company by Company Activity
export const getAllCompanyByFilter = createAsyncThunk(
  "company/getAllCompanyByFilter",
  async (company_activity) => {
    try {
      const res = await axios.get(`https://erpbayqi.herokuapp.com/api/company/filter/${company_activity}`);
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

//Get all company by Profile Id 
export const getAllCompanysByProfileId = createAsyncThunk(
  "company/getAllCompanysByProfileId",
  async (profileId) => {
    try {
      const res = await axios.get(`https://erpbayqi.herokuapp.com/api/company/userloged/${profileId}`);
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

//Create Company
export const createCompany = createAsyncThunk(
  "company/createCompany",
  async (formData) => {
    try {
      const conifg = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post(`https://erpbayqi.herokuapp.com/api/company/${formData.profileId}`, formData, conifg);
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

//Update Company by ID
export const updateCompanyById = createAsyncThunk(
  "company/updateCompanyById",
  async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.put(
        `https://erpbayqi.herokuapp.com/api/company/${formData.company_id}`,
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

//Delete Company by ID
export const deleteCompanyById = createAsyncThunk(
  "company/deleteCompanyById",
  async (company_id) => {
    try {
      const res = await axios.delete(`https://erpbayqi.herokuapp.com/api/company/${company_id}`);
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

//Delete Company by Profile ID
export const deleteCompanyByProfileId = createAsyncThunk(
  "company/deleteCompanyByProfileId",
  async (companyId) => {
    try {
      const res = await axios.delete(`https://erpbayqi.herokuapp.com/api/company/${companyId}`);
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
