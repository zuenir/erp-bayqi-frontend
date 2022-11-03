import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllCompanyCategorys = createAsyncThunk(
  "category/getAllCompanyCategory",
  async () => {
    try {
        const res = await axios.get('https://erpbayqi.herokuapp.com/api/companycategory');
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

export const getCompanyCategorysById = createAsyncThunk(
  "category/getCompanyCategorysById",
  async (category_id) => {
    try {
        const res = await axios.get(`https://erpbayqi.herokuapp.com/api/companycategory/${category_id}`);
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

export const CreateCompanyCategory = createAsyncThunk(
  "category/CreateCompanyCategory",
  async (formData) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const res = await axios.post('https://erpbayqi.herokuapp.com/api/companycategory/add/',formData,config);
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

export const EditCompanyCategoryById = createAsyncThunk(
  "category/EditCompanyCategoryById",
  async (formData) => {
    try {
        const config = {
            headers : {
                "Content-Type":"application/json"
            }
        }

        const res = await axios.put(`https://erpbayqi.herokuapp.com/api/companycategory/edit/${formData.category_id}`,formData.values,config);
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

export const DeleteCompanyCategoryById = createAsyncThunk(
  "category/DeleteCompanyCategoryById",
  async (category_id) => {
    try {
        const res =  await axios.delete(`https://erpbayqi.herokuapp.com/api/companycategory/delete/${category_id}`);
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
