import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

//
export const getAllAdvertisingCompany = createAsyncThunk(
  "advertising/getAllAdvertisingCompany",
  async () => {
    try {
      const res = await axios.get("https://erpbayqi.herokuapp.com/api/advertising");
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

//
export const getAllAdvertisingCompanyByProfileId = createAsyncThunk(
  "advertising/getAllAdvertisingCompanyByProfileId",
  async (profileId) => {
    try {
      const res = await axios.get(`https://erpbayqi.herokuapp.com/api/advertising/${profileId}`);
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

//
export const getAllAdvertisingCompanyById = createAsyncThunk('advertising/getAllAdvertisingCompanyById', async(company_id) => {
  try{
    const res = await axios.get(`https://erpbayqi.herokuapp.com/api/advertising/advertisingcompany/${company_id}`);
    return res.data;
  }catch(error) {
    let err = {
      msg: error.response.statusText,
      status:error.response.status,
    }
    return err;
  }
});

//
export const verifyAdvertisingCompany = createAsyncThunk('advertising/verifyAdvertisingCompany',async(formData) => {
  try {
   
    const res = await axios.get(`https://erpbayqi.herokuapp.com/api/advertising/advertisingverify/${formData.company_id}/${formData.advertising.name}`);
    return res.data;

  } catch (error) {
    var err = {
      msg: error.response.statusText,
      status: error.response.status
    }
    return err;
  }
});

//
export const createAdvertisingCompany = createAsyncThunk('advertising/createAdvertisingCompany',async(formData) => {
  try {
    const config = {
      headers: {
        "Content-Type":"application/json"
      }
    };

    const res = await axios.post('https://erpbayqi.herokuapp.com/api/advertising/add',formData,config);
    return res.data;

  } catch (error) {
    var err = {
      msg: error.response.statusText,
      status: error.response.status
    }
    return err;
  }
});

//
export const createAdvertisingCompanyV1 = createAsyncThunk('advertising/createAdvertisingCompanyV1',async(formData) => {
  try {
    const config = {
      headers: {
        "Content-Type":"application/json"
      }
    };

    const res = await axios.post('https://erpbayqi.herokuapp.com/api/advertising/addv1',formData,config);
    return res.data;

  } catch (error) {
    var err = {
      msg: error.response.statusText,
      status: error.response.status
    }
    return err;
  }
});

//
export const publishAdvertisingCompanyById = createAsyncThunk('advertising/publishAdvertisingCompanyById', async(formData) => {
  try {
    const config = {
      headers: {
        "Content-Type":"application/json"
      }
    };

    const res = await axios.put(`https://erpbayqi.herokuapp.com/api/advertising/start/${formData.advertising_id}`,formData,config);
    return res.data;

  } catch (error) {
    var err = {
      msg: error.response.statusText,
      status: error.response.status
    }
    return err;
  }
});

//
export const stopAdvertisingCompanyById = createAsyncThunk('advertising/stopAdvertisingCompanyById', async(advertising_id) => {
  try {
    const res = await axios.put(`https://erpbayqi.herokuapp.com/api/advertising/stop/${advertising_id}`);
    return res.data;

  } catch (error) {
    var err = {
      msg: error.response.statusText,
      status: error.response.status
    }
    return err;
  }
});

//
export const publishAdvertisingCompanyChecking = createAsyncThunk('advertising/publishAdvertisingCompanyChecking', async() => {
  try {
    const res = await axios.put('https://erpbayqi.herokuapp.com/api/advertising/check');
    return res.data;

  } catch (error) {
    var err = {
      msg: error.response.statusText,
      status: error.response.status
    }
    return err;
  }
});

//
export const getAllAdvertisingCompanyByFilter = createAsyncThunk('advertising/getAllAdvertisingCompanyByFilter',async(storeStatus) => {
  try {
    const res = await axios.get(`https://erpbayqi.herokuapp.com/api/advertising/filter/${storeStatus}`);
    return  res.data;
  } catch (error) {
    let err = {
      msg: error.response.statusText,
      status:error.response.status,
    }
    return err;
  }
})

//
export const deleteverifyAdvertisingCompany = createAsyncThunk('advertising/deleteverifyAdvertisingCompany',async(advertising_id) => {
  try {
   
    const res = await axios.get(`https://erpbayqi.herokuapp.com/api/advertising/deleteverify/${advertising_id}`);
    return res.data;

  } catch (error) {
    var err = {
      msg: error.response.statusText,
      status: error.response.status
    }
    return err;
  }
});

//
export const deleteAdvertisingCompany = createAsyncThunk('advertising/deleteAdvertisingCompany', async(advertising_id) => {
  try {
    var res = await axios.delete(`https://erpbayqi.herokuapp.com/api/advertising/delete/${advertising_id}`);
    return res.data;
  } catch (error) {
    var err = {
      msg: error.response.statusText,
      status: error.response.status
    };
    return err;
  }
});

//
export const deleteAdvertisingCompanyById = createAsyncThunk('advertising/deleteAdvertisingCompanyById', async(formData) => {
  try {
    var res = await axios.delete(`https://erpbayqi.herokuapp.com/api/advertising/delete/${formData.company_id}/${formData.advertising_id}`);
    return res.data;
  } catch (error) {
    var err = {
      msg: error.response.statusText,
      status: error.response.status
    };
    return err;
  }
});