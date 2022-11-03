import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
import { toast } from "react-toastify";

// material
import {
  Stack,
  TextField,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";

import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";

// redux
import { connect } from "react-redux";
import {
  generatePDF,
  getReports,
  editReport,
} from "../../../redux/service/serviceAction";
import useResponsive from "../../../hooks/useResponsive";
import moment from "moment/dist/moment";
import "moment/dist/locale/pt-br";
import AppChartBarReport from "../app/AppChartBarReport";
import AppCurrentVisits from "./../app/AppCurrentVisits";
import {
  formDataColors,
  getDateFull,
  getDateDay,
  uniqIter,
  getDateMonthYear
} from "./../../../utils/myFunctions";
import { getAllActivityData } from "../../../data/dataProfile";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const MyReportForm = ({
  editReport,
  getReports,
  generatePDF,
  profile: { profile, loading },
  auth: { roles, user },
  company: { companys },
  service: { reports },
}) =>  {
  
  useEffect(() => {
    getReports();
  }, [getReports]);

  const isDesktop = useResponsive("up", "lg");
  const [isPrint, setIsPrint] = useState(false);
  const [dataTimeStart, setDataTimeStart] = useState("");  

  /*const [formData, setFormData] = useState({
    note: "",
    dateTime: "",
    metaGraphic: "",
    activityGraphic: "",
  });*/

  const handlePieChart = () => {
    var pieLabel = [];
    var sector = [];

    var pieData = [];
    var pieDataLabel = [];
    var pieBackgroundColor = [];

    var data = reports.filter((report) => report.date === formik.values.dateTime);

    var newData = data[0].reportInfo.filter((rep) => rep.key === formik.values.activityGraphic);
    setDataTimeStart(newData[0].dataTimeStart);

    var bayQiCompany = companys.filter(
      (company) =>
      company.company_activity === formik.values.activityGraphic &&
        getDateMonthYear(newData[0].dataTimeStart) === getDateMonthYear(company.date) &&
        getDateFull(company.date) >= getDateDay("01", newData[0].dataTimeStart) &&
        getDateFull(company.date) <= getDateDay("31", newData[0].dataTimeStart)
    );  
    
    bayQiCompany.map((item) => sector.push(item.company_sector));

    for (let r of uniqIter(sector)) {
      pieLabel.push(r); 
    } 

    // Item cont
    for (var j = 0; j < pieLabel.length; j++) {
      var count = 0;
      for (var k = 0; k < sector.length; k++) {
        if (pieLabel[j] === sector[k]) {
          count++;
        }
      }
      pieData.push(count);
    }

    //Chart BackGround Colors
    for (var i = 0; i < pieLabel.length; i++) {
      pieBackgroundColor.push(formDataColors[i]);
    }

    // Pie values
    for (var m = 0; m < pieLabel.length; m++) {
      let valor = {
        label: pieLabel[m] + " " + pieData[m],
        value: pieData[m],
      };

      pieDataLabel.push(valor);
    }

    return { pieDataLabel, pieBackgroundColor };
  };

  const handleDateTimeValue = (e) => {
    formik.setFieldValue("activityGraphic", "");
  };

  const handleGraphic = (e) => {
    var activity = e.target.value;

    var data = reports.filter(
      (report) => report.date === formik.values.dateTime
    );
    var newData = data[0].reportInfo.filter((rep) => rep.key === activity);
    setDataTimeStart(newData[0].dataTimeStart);
    console.log(dataTimeStart);
    formik.setFieldValue("metaGraphic", newData[0].meta);
    formik.setFieldValue("note", newData[0].note);
  };

  const handleGenerateReport = async () => {
    setIsPrint(true);
    try {
      toast.success("Gerar Relatório, Aguarde por favor");

      var data = reports.filter((report) =>  report.date === formik.values.dateTime);

      let formData = {
        profileId: data[0].profile,
        operation: "Gerar Relatório",
        reportId: data[0].reportId, 
      };

      await generatePDF(formData);
    } catch (error) {
      console.error("Failed to load data", error);
    }

    setIsPrint(false);
  };

  const formik = useFormik({
    initialValues: {
      note: "",
      dateTime: "",
      metaGraphic: "",
      activityGraphic: ""
    },
    enableReinitialize: true,
    onSubmit: async () => {
      try {
  
        var data = reports.filter(
          (report) => report.reportId === formik.values.dateTime
        );

        let formData = {
          profileId: data[0].profile,
          operation: "Gerar Relatório",
          reportInfo: {
            key: formik.values.activityGraphic,
            meta: formik.values.metaGraphic,
            note: formik.values.note,
          },
          reportId: formik.values.dateTime,
        };

        await editReport(formData);
      } catch (error) {
        console.error("Failed to load data", error);
      }
    },
  });

  const { isSubmitting, handleSubmit } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: "text.secondary", mb: 3 }}
          paddingLeft={1}
          paddingRight={1}
        >
          Relatório
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <Item sx={{ width: isDesktop ? 375 : "100%" }}>
            <FormControl fullWidth>
              <InputLabel id="dateTime">Data</InputLabel>
              <Select
                labelId="dateTime"
                name="dateTime"
                label="Data"
                onChange={(e) => {
                  formik.handleChange(e);
                  handleDateTimeValue(e);
                }}
                onBlur={formik.handleBlur}
                value={formik.values.dateTime}
                error={Boolean(
                  formik.touched.dateTime && formik.errors.dateTime
                )}
                helperText={formik.touched.dateTime && formik.errors.dateTime}
              >
                {reports.map((req, index) => (
                  <MenuItem key={index} value={req.date}>
                    {moment(req.date).format('llll')}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Item>
          <Item sx={{ width: isDesktop ? 375 : "100%" }}>
            <LoadingButton
              fullWidth
              size="large"
              variant="outlined"
              startIcon={<PrintIcon />}
              loading={isPrint}
              onClick={handleGenerateReport}
              disabled={formik.values.dateTime === "" ? true : false}
            >
              Imprimir Relatório
            </LoadingButton>
          </Item>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <Item sx={{ width: isDesktop ? 375 : "100%" }}>
            <FormControl fullWidth>
              <InputLabel id="activityGraphic">Parceiros</InputLabel>
              <Select
                labelId="activityGraphic"
                name="activityGraphic"
                label="Actividade"
                onChange={(e) => {
                  formik.handleChange(e);
                  handleGraphic(e);
                }}
                onBlur={formik.handleBlur}
                value={formik.values.activityGraphic}
                disabled={formik.values.dateTime === "" ? true : false}
                error={Boolean(
                  formik.touched.activityGraphic &&
                    formik.errors.activityGraphic
                )}
                helperText={
                  formik.touched.activityGraphic &&
                  formik.errors.activityGraphic
                }
              >
                 {getAllActivityData().map((activ,index) => (
                    <MenuItem key={index} value={activ.value}>{activ.label}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Item>
          <Item sx={{ width: isDesktop ? 375 : "100%" }}>
            {formik.values.activityGraphic !== "" && (
              <TextField
                fullWidth
                type="text"
                name="metaGraphic"
                label="Meta"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.metaGraphic}
                error={Boolean(
                  formik.touched.metaGraphic && formik.errors.metaGraphic
                )}
                helperText={
                  formik.touched.metaGraphic && formik.errors.metaGraphic
                }
              />
            )}
          </Item>
        </Stack>

        {formik.values.activityGraphic !== "" && (
          <>
            <Stack sx={{ padding: 1 }}>
              <Grid item xs={12} md={6} lg={8}>
                <AppChartBarReport
                  title={`Balanço Mensal ${moment().format("YYYY")}`}
                  chartLabels={["Semana 1", "Semana 2", "Semana 3", "Semana 4"]}
                  chartData={[
                    {
                      name: formik.values.activityGraphic,
                      type: "column",
                      fill: "solid",
                      data: [
                        companys.filter(
                          (company) =>
                            company.company_activity === formik.values.activityGraphic &&
                            getDateMonthYear(formik.values.dataTimeStart) === getDateMonthYear(company.date) &&
                            getDateFull(company.date) >= getDateDay("01", formik.values.dataTimeStart) &&
                            getDateFull(company.date) <= getDateDay("07", formik.values.dataTimeStart)).length,
                        companys.filter(
                          (company) =>
                            company.company_activity === formik.values.activityGraphic &&
                            getDateMonthYear(formik.values.dataTimeStart) === getDateMonthYear(company.date) &&
                            getDateFull(company.date) > getDateDay("07", formik.values.dataTimeStart) &&
                            getDateFull(company.date) <= getDateDay("14", formik.values.dataTimeStart)).length,
                        companys.filter(
                          (company) =>
                            company.company_activity === formik.values.activityGraphic &&
                            getDateMonthYear(formik.values.dataTimeStart) === getDateMonthYear(company.date) &&
                            getDateFull(company.date) > getDateDay("14", formik.values.dataTimeStart) &&
                            getDateFull(company.date) <= getDateDay("21", formik.values.dataTimeStart)).length,
                        companys.filter(
                          (company) =>
                            company.company_activity === formik.values.activityGraphic &&
                            getDateMonthYear(formik.values.dataTimeStart) === getDateMonthYear(company.date) &&
                            getDateFull(company.date) > getDateDay("21", formik.values.dataTimeStart) &&
                            getDateFull(company.date) <= getDateDay("31",formik.values.dataTimeStart)).length,
                      ],
                    },
                  ]}
                />
              </Grid>
            </Stack>
            <Stack sx={{ padding: 1 }}>
              <Grid item xs={12} md={6} lg={8}>
                <AppCurrentVisits
                  title=""
                  chartData={handlePieChart().pieDataLabel}
                  chartColors={handlePieChart().pieBackgroundColor}
                />
              </Grid>
            </Stack>

            <Stack sx={{ padding: 1 }}>
              <TextField
                fullWidth
                multiline
                rows={6}
                id="note"
                name="note"
                label="Detalhes  do Relatório"
                placeholder="Deixe uma nota aqui..."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.note}
              />
            </Stack>
          </>
        )}

        {isPrint === false && (
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            marginTop={3}
          >
            <Item sx={{ width: isDesktop ? 375 : "100%" }} />

            <Item sx={{ width: isDesktop ? 375 : "100%" }}>
              <LoadingButton
                fullWidth
                size="medium"
                onClick={handleSubmit}
                variant="contained"
                loading={isSubmitting}
                disabled={formik.values.activityGraphic === "" ? true : false}
              >
                Editar
              </LoadingButton>
            </Item>
            <Item sx={{ width: isDesktop ? 375 : "100%" }}>
              <Button
                fullWidth
                variant="outlined"
                size="medium"
                component={RouterLink}
                to="/dashboard/app"
                disabled={isSubmitting?true:false}
              >
                Voltar
              </Button>
            </Item>
          </Stack>
        )}
      </Form>
    </FormikProvider>
  );
};

MyReportForm.propTypes = {
  editReport: PropTypes.func.isRequired,
  generatePDF: PropTypes.func.isRequired,
  getReports: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
  service: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  company: state.company,
  service: state.service,
});

export default connect(mapStateToProps, {
  generatePDF,
  getReports,
  editReport,
})(MyReportForm);
