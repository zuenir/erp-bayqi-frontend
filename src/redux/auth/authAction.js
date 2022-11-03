import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import { createAsyncThunk } from "@reduxjs/toolkit";

//Load User
export const loadUser = createAsyncThunk("auth/loadUser", async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("https://erpbayqi.herokuapp.com/api/auth");
    return res.data;
  } catch (error) {
    let err = {
      msg: error.response.statusText,
      status: error.response.status,
    };
    return err;
  }
});

//Login User
export const getLogin = createAsyncThunk("auth/getLogin", async (formData) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(formData);
    const res = await axios.post("https://erpbayqi.herokuapp.com/api/auth", body, config);
    
    return res.data;
  } catch (error) {
    let err = {
      msg: error.response.statusText,
      status: error.response.status,
    };
    return err;
  }
});

//Create User By Id
export const createUserById = createAsyncThunk(
  "auth/createUserById",
  async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post('https://erpbayqi.herokuapp.com/api/user',formData,config);
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

//Update User By Id
export const updateUserById = createAsyncThunk('auth/updateUserById', async(formData) => {
  try {
    const config = {
      headers: {
        "Content-Type":"application/json"
      }
    }

    const res = await axios.put(`https://erpbayqi.herokuapp.com/api/user/edit/${formData.user_id}`,formData.values,config);
    return res.data;
  } catch (error) {
    let err = {
      msg: error.response.statusText,
      status: error.response.status,
    };
    return err;
  }
});

// Update Loged User updateUserLogedById
export const updateUserLogedById = createAsyncThunk('auth/updateUserLogedById', async(formData) => {
  try {
    const config = {
      headers: {
        "Content-Type":"application/json"
      }
    }
    const res = await axios.put(`https://erpbayqi.herokuapp.com/api/user/editlogeduser/${formData.user_id}`,formData.value,config);
    return res.data;
  } catch (error) {
    let err = {
      msg: error.response.statusText,
      status: error.response.status,
    };
    return err;
  }
});

//Change Forgot Password UserById update
export const ChangeForgotPasswordUserById = createAsyncThunk('auth/ChangeForgotPasswordUserById', async(formData) => {
  try {
    const config = {
      headers: {
        "Content-Type":"application/json"
      }
    }
    const res = await axios.put('https://erpbayqi.herokuapp.com/api/user/changepass',formData,config);
    return res.data;
  } catch (error) {
    let err = {
      msg: error.response.statusText,
      status: error.response.status,
    };
    return err;
  }
});


//Delete user
export const deleteUserById = createAsyncThunk('auth/deleteUserById',async(user_id)=>{
  try {
    const res = await axios.delete(`https://erpbayqi.herokuapp.com/api/user/${user_id}`);
    return res.data;
  } catch (error) {
    let err = {
      msg: error.response.statusText,
      status: error.response.status,
    };
    return err;
  }
});