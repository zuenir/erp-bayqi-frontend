import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { saveAs } from "file-saver";
import {fDate} from '../../utils/formatTime';

// 
export const sendEmail = createAsyncThunk(
  "service/sendEmail",
  async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("https://erpbayqi.herokuapp.com/api/sendemail/send", formData, config);
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

//Generate PDF
export const generatePDF = createAsyncThunk(
  "service/generatePDF",
  async (formData) => {
    try {
      const res = await axios
        .get(`https://erpbayqi.herokuapp.com/api/generatepdf/create-pdf/${formData.profileId}/${formData.operation}/${formData.reportId}`)
        .then(() =>
          axios.get(`https://erpbayqi.herokuapp.com/api/generatepdf/fetch-pdf/${formData.profileId}/${formData.operation}/${formData.reportId}`, { responseType: "blob" })
        )
        .then((res) => {
          const pdfBlob = new Blob([res.data], { type: "application/pdf" });
          const report = formData.operation + "_" + fDate(new Date());
          saveAs(pdfBlob, `${report}.pdf`);
        });
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

//Get Report
export const getReports = createAsyncThunk("service/getReports", async() => {
  try {
    const res = await axios.get("https://erpbayqi.herokuapp.com/api/generatepdf/reports");
    return res.data;
  } catch (error) {
    let err = {
      msg: error.response.statusText,
      status: error.response.status,
    };
    return err;
  }
});

//Create Report
export const createReport = createAsyncThunk(
  "service/createReport",
  async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(`https://erpbayqi.herokuapp.com/api/generatepdf/add/${formData.profileId}/${formData.operation}/${formData.reportId}`,formData,config);
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

//Edit Repor
export const editReport = createAsyncThunk("service/editReport", async(formData) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const res = await axios.put(`https://erpbayqi.herokuapp.com/api/generatepdf/edit/${formData.profileId}/${formData.operation}/${formData.reportId}`,formData,config);
    return res.data;
  } catch (error) {
    let err = {
      msg: error.response.statusText,
      status: error.response.status,
    };
    return err;
  }
});

//Delete Report
export const deleteReport = createAsyncThunk('service/deleteReport', async(formData) => {
  try {
    const res = await axios.delete(`https://erpbayqi.herokuapp.com/api/generatepdf/delete/${formData.profileId}/${formData.operation}/${formData.reportId}`);
    return res.data;
  } catch (error) {
    let err = {
      msg: error.response.statusText,
      status: error.response.status,
    };
    return err; 
  }
});
