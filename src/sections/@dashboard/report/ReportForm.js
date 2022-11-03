import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";

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

import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";

// redux
import { connect } from "react-redux";
import {
  generatePDF,
  createReport,
  deleteReport,
} from "../../../redux/service/serviceAction";
import useResponsive from "../../../hooks/useResponsive";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { pt } from "date-fns/locale";

import moment from "moment/dist/moment";
import "moment/dist/locale/pt-br";
import AppChartBarReport from "../app/AppChartBarReport";
import AppCurrentVisits from "./../app/AppCurrentVisits";
import {
  getDateDay,
  uniqIter,
  getDateMonthYear,
} from "../../../utils/myFunctions";
import { formDataColors, getDateFull } from "./../../../utils/myFunctions";
import { getAllActivityData } from "../../../data/dataProfile";
import Iconify from "../../../components/Iconify";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ReportForm = ({
  createReport,
  generatePDF,
  deleteReport,
  profile: { profile, loading },
  auth: { roles, user },
  company: { companys },
  idReport,
}) => {
  const [cmd, setCmd] = useState("...");
  const [cmdReport, setCmdReport] = useState("Adicionar");
  const [cmdIsReport, setCmdIsReport] = useState(false);
  const [graphic, setGraphic] = useState("");
  const [cmdGraphic, setCmdGraphic] = useState("");
  const isDesktop = useResponsive("up", "lg");
  const [formData, setFormData] = useState({
    status: "",
    store: "",
    activity: "",
    operation: "",
    note: "",
    dataTimeStart: new Date(),
    dataTimeEnd: new Date(),
    metaGraphic: "",
    activityGraphic: "",
    store_activity: "",
  });

  const ReportSchema = Yup.object().shape({
    status: Yup.string().required("O Status do Contrato é obrigatório"),
    store: Yup.string().required("O Status da Loja é obrigatório"),
    activity: Yup.string().required("Parceiro é obrigatório"),
    operation: Yup.string().required("Actividae é obrigatório"),
  });

  const handleChangeStart = (newValue) => {
    setFormData({
      status: formik.values.status,
      activity: formik.values.activity,
      operation: formik.values.operation,
      note: formik.values.note,
      dataTimeStart: newValue,
      dataTimeEnd: formik.values.dataTimeEnd,
    });
  };

  const handleChangeEnd = (newValue) => {
    setFormData({
      status: formik.values.status,
      activity: formik.values.activity,
      operation: formik.values.operation,
      note: formik.values.note,
      dataTimeStart: formik.values.dataTimeStart,
      dataTimeEnd: newValue,
    });
  };

  const handlePieChart = () => {
    var pieLabel = [];
    var sector = [];

    var pieData = [];
    var pieDataLabel = [];
    var pieBackgroundColor = [];

    var bayQiCompany = companys.filter(
      (company) =>
        company.company_activity === formik.values.activityGraphic &&
        getDateMonthYear(formik.values.dataTimeStart) ===
          getDateMonthYear(company.date) &&
        getDateFull(company.date) >=
          getDateDay("01", formik.values.dataTimeStart) &&
        getDateFull(company.date) <=
          getDateDay("31", formik.values.dataTimeStart)
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
  
  const handleCancel = () => {
    setCmd("...");
    setCmdGraphic("");
    setGraphic("");
    setCmdReport("Adicionar");
    setCmdIsReport(false);
    formik.setFieldValue("operation", "");
    formik.setFieldValue("activityGraphic", "");
    formik.setFieldValue("metaGraphic", "");
    formik.setFieldValue("note", "");
    formik.resetForm();
  };

  const handleSaveReport = async () => {
    setCmdIsReport(true);

    let formData = {
      profileId: profile._id,
      status: formik.values.status,
      activity: formik.values.activity,
      operation: formik.values.operation,
      reportInfo: {
        key: formik.values.activityGraphic,
        operationType: formik.values.activityGraphic,
        dataTimeStart: formik.values.dataTimeStart,
        dataTimeEnd: formik.values.dataTimeEnd,
        meta: formik.values.metaGraphic,
        note: formik.values.note,
      },
      reportId: idReport,
    };

    await createReport(formData)
      .then(async (result) => {
        if (
          result.payload.report.profile &&
          result.payload.report.reportInfo.length === 1
        ) {
          formik.setFieldValue("activityGraphic", "");
          formik.setFieldValue("metaGraphic", "");
          formik.setFieldValue("note", "");
        } else if (
          result.payload.report.profile &&
          result.payload.report.reportInfo.length === 2
        ) {
          setCmdReport(""); //Gerar Relatório
          await generatePDF(formData);
          setCmd("...");
          setCmdGraphic("");
          setGraphic("");
          formik.setFieldValue("operation", "");
          formik.setFieldValue("activityGraphic", "");
          formik.setFieldValue("metaGraphic", "");
          formik.setFieldValue("note", "");
          formik.resetForm();
        }
      })
      .catch((error) => {});

    setCmdReport("Adicionar");
    setCmdIsReport(false);
    setGraphic("");
    handleCancel();
  };

  const formik = useFormik({
    initialValues: formData,
    enableReinitialize: true,
    
    onSubmit: async () => {
      try {
        let formData = {
          profileId: profile._id,
          status:
            formik.values.operation === "Gerar Lista - Inserção"
              ? formik.values.store
              : formik.values.status,
          activity:
            formik.values.operation === "Gerar Lista - Inserção"
              ? "BayQi Marketplace"
              : formik.values.activity,
          operation: formik.values.operation,
          reportInfo: {
            key:
              formik.values.operation === "Gerar Lista - Inserção"
                ? "BayQi Marketplace"
                : formik.values.activity,
            operationType:
              formik.values.operation === "Gerar Lista - Inserção"
                ? "Gerar Lista - Inserção"
                : "Gerar Lista",
            dataTimeStart: formik.values.dataTimeStart,
            dataTimeEnd: formik.values.dataTimeEnd,
            meta: 0,
            note: formik.values.note,
          },
          reportId: moment().format("DD-MM-YYYY"),
        };
        
       await createReport(formData).then(async (result) => {
          if (result.payload.report.profile) {
            await generatePDF(formData);
            if (
              formik.values.operation === "Gerar Lista" ||
              formik.values.operation === "Gerar Lista - Inserção"
            ) {
              await deleteReport(formData);
            }
          }
        });
      } catch (error) {
        console.error("Failed to load data", error);
      }
      formik.setSubmitting(false);
      handleCancel();
    },
  }); 

  const { isSubmitting, handleSubmit } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        {idReport === "" ? (
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            display={"flex"}
          >
            <Iconify
              icon="line-md:document-report-twotone"
              sx={{ width: 100, height: 100, my: 1 }}
            />

            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: "text.secondary", mb: 3 }}
            >
              Você pode facilmente comerçar a criar relatórios com base nos
              dados do sistema e dar o seu parecer. Você também pode escolher os
              documentos prontos e fazer as alterações desejadas (nota).
            </Typography>
          </Stack>
        ) : (
          <>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: "text.secondary", mb: 3 }}
              paddingLeft={1}
              paddingRight={1}
            >
              Relatório {` Id: #${idReport}`}
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
            >
              <Item sx={{ width: isDesktop ? 375 : "100%" }}>
                <FormControl fullWidth>
                  <InputLabel id="operation">Operação (Gerar PDF)</InputLabel>
                  <Select
                    labelId="operation"
                    name="operation"
                    label="Operação (Gerar PDF)"
                    onChange={(e) => {
                      formik.handleChange(e);
                      setCmd(e.target.value);
                      if (
                        e.target.value === "Gerar Relatório" ||
                        e.target.value === "Gerar Lista - Inserção"
                      ) {
                        formik.setFieldValue("status", "Todos");
                        formik.setFieldValue("activity", "Todos Parceiros");
                        formik.setFieldValue(
                          "store_activity",
                          "BayQi Marketplace"
                        );
                      }
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.operation}
                    error={Boolean(
                      formik.touched.operation && formik.errors.operation
                    )}
                    helperText={
                      formik.touched.operation && formik.errors.operation
                    }
                  >
                    <MenuItem value={"Gerar Relatório"}>
                      Gerar Relatório
                    </MenuItem>
                    <MenuItem value={"Gerar Lista"}>Gerar Lista</MenuItem>
                    <MenuItem value={"Gerar Lista - Inserção"}>
                      Gerar Lista - Inserção
                    </MenuItem>
                  </Select>
                </FormControl>
              </Item>
              <Item sx={{ width: isDesktop ? 375 : "100%" }}>
                <LocalizationProvider locale={pt} dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      name="dataTimeStart"
                      label="Data Início"
                      inputFormat="dd/MM/yyyy"
                      value={formik.values.dataTimeStart}
                      onChange={handleChangeStart}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </Item>
              <Item sx={{ width: isDesktop ? 375 : "100%" }}>
                <LocalizationProvider locale={pt} dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      name="dataTimeEnd"
                      label="Data Término"
                      inputFormat="dd/MM/yyyy"
                      value={formik.values.dataTimeEnd}
                      onChange={handleChangeEnd}
                      disabled={
                        formik.values.operation === "Gerar Relatório"
                          ? true
                          : false
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </Item>
            </Stack>

            {formik.values.operation === "Gerar Lista - Inserção" ? (
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
              >
                <Item sx={{ width: isDesktop ? 375 : "100%" }}>
                  <TextField
                    fullWidth
                    type="text"
                    name="store_activity"
                    label="Actividade"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.store_activity}
                    disabled
                  />
                </Item>
                <Item sx={{ width: isDesktop ? 375 : "100%" }}>
                  <FormControl fullWidth>
                    <InputLabel id="store">Loja</InputLabel>
                    <Select
                      labelId="store"
                      name="store"
                      label="Loja"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.store}
                      error={Boolean(
                        formik.touched.store && formik.errors.store
                      )}
                      helperText={formik.touched.store && formik.errors.store}
                    >
                      <MenuItem value={"Todos"}>Todos</MenuItem>
                      <MenuItem value={"Publicado"}>Publicado</MenuItem>
                      <MenuItem value={"Pendente"}>Pendente</MenuItem>
                      <MenuItem value={"Removido"}>Removido</MenuItem>
                    </Select>
                  </FormControl>
                </Item>
              </Stack>
            ) : (
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
              >
                <Item sx={{ width: isDesktop ? 375 : "100%" }}>
                  <FormControl fullWidth>
                    <InputLabel id="activity">Actividade</InputLabel>
                    <Select
                      labelId="activity"
                      name="activity"
                      label="Actividade"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.activity}
                      disabled={
                        formik.values.operation === "Gerar Relatório"
                          ? true
                          : false
                      }
                      error={Boolean(
                        formik.touched.activity && formik.errors.activity
                      )}
                      helperText={
                        formik.touched.activity && formik.errors.activity
                      }
                    >
                      <MenuItem value={"Todos Parceiros"}>
                        Todos Parceiros
                      </MenuItem>
                      {getAllActivityData().map((activ, index) => (
                        <MenuItem key={index} value={activ.value}>
                          {activ.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Item>
                <Item sx={{ width: isDesktop ? 375 : "100%" }}>
                  <FormControl fullWidth>
                    <InputLabel id="status">Contrato</InputLabel>
                    <Select
                      labelId="status"
                      name="status"
                      label="Contrato"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.status}
                      disabled={
                        formik.values.operation === "Gerar Relatório"
                          ? true
                          : false
                      }
                      error={Boolean(
                        formik.touched.status && formik.errors.status
                      )}
                      helperText={formik.touched.status && formik.errors.status}
                    >
                      <MenuItem value={"Todos"}>Todos</MenuItem>
                      <MenuItem value={"Fechado"}>Fechado</MenuItem>
                      <MenuItem value={"Aberto"}>Aberto</MenuItem>
                      <MenuItem value={"Cancelado"}>Cancelado</MenuItem>
                    </Select>
                  </FormControl>
                </Item>
              </Stack>
            )}

            {formik.values.operation === "Gerar Relatório" && (
              <>
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
                          handlePieChart(e);
                          if (
                            e.target.value === "BayQi Ponto" ||
                            e.target.value === "BayQi Marketplace"
                          ) {
                            setGraphic("cmdGraphic");
                            setCmdGraphic("cmdGraphic");
                          }
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.activityGraphic}
                        error={Boolean(
                          formik.touched.activityGraphic &&
                            formik.errors.activityGraphic
                        )}
                        helperText={
                          formik.touched.activityGraphic &&
                          formik.errors.activityGraphic
                        }
                      >
                        {getAllActivityData()
                          .filter(
                            (option) => option.label !== "BayQi Publicidade"
                          )
                          .map((activ, index) => (
                            <MenuItem key={index} value={activ.value}>
                              {activ.label}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Item>
                  <Item sx={{ width: isDesktop ? 375 : "100%" }}>
                    <TextField
                      fullWidth
                      type="text"
                      id="metaGraphic"
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
                  </Item>
                </Stack>
              </>
            )}

            {graphic === "cmdGraphic" && (
              <>
                <Stack sx={{ padding: 1 }}>
                  <Grid item xs={12} md={6} lg={8}>
                    <AppChartBarReport
                      title={`Balanço Mensal ${moment().format("YYYY")}`}
                      chartLabels={[
                        "Semana 1",
                        "Semana 2",
                        "Semana 3",
                        "Semana 4",
                      ]}
                      chartData={[
                        {
                          name: formik.values.activityGraphic,
                          type: "column",
                          fill: "solid",
                          data: [
                            companys.filter(
                              (company) =>
                                company.company_activity ===
                                  formik.values.activityGraphic &&
                                getDateMonthYear(
                                  formik.values.dataTimeStart
                                ) === getDateMonthYear(company.date) &&
                                getDateFull(company.date) >=
                                  getDateDay(
                                    "01",
                                    formik.values.dataTimeStart
                                  ) &&
                                getDateFull(company.date) <=
                                  getDateDay("07", formik.values.dataTimeStart)
                            ).length,
                            companys.filter(
                              (company) =>
                                company.company_activity ===
                                  formik.values.activityGraphic &&
                                getDateMonthYear(
                                  formik.values.dataTimeStart
                                ) === getDateMonthYear(company.date) &&
                                getDateFull(company.date) >
                                  getDateDay(
                                    "07",
                                    formik.values.dataTimeStart
                                  ) &&
                                getDateFull(company.date) <=
                                  getDateDay("14", formik.values.dataTimeStart)
                            ).length,
                            companys.filter(
                              (company) =>
                                company.company_activity ===
                                  formik.values.activityGraphic &&
                                getDateMonthYear(
                                  formik.values.dataTimeStart
                                ) === getDateMonthYear(company.date) &&
                                getDateFull(company.date) >
                                  getDateDay(
                                    "14",
                                    formik.values.dataTimeStart
                                  ) &&
                                getDateFull(company.date) <=
                                  getDateDay("21", formik.values.dataTimeStart)
                            ).length,
                            companys.filter(
                              (company) =>
                                company.company_activity ===
                                  formik.values.activityGraphic &&
                                getDateMonthYear(
                                  formik.values.dataTimeStart
                                ) === getDateMonthYear(company.date) &&
                                getDateFull(company.date) >
                                  getDateDay(
                                    "21",
                                    formik.values.dataTimeStart
                                  ) &&
                                getDateFull(company.date) <=
                                  getDateDay("31", formik.values.dataTimeStart)
                            ).length,
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
              </>
            )}

            <Stack sx={{ padding: 1 }}>
              <TextField
                fullWidth
                multiline
                rows={6}
                id="note"
                name="note"
                label="Detalhes do Relatório"
                placeholder="Deixe uma nota aqui..."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.note}
              />
            </Stack>

            {cmdGraphic === "cmdGraphic" ? (
              <>
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
                      variant="contained"
                      onClick={handleSaveReport}
                      loading={cmdIsReport}
                    >
                      {cmdReport}
                    </LoadingButton>
                  </Item>
                  <Item sx={{ width: isDesktop ? 375 : "100%" }}>
                    <Button
                      fullWidth
                      variant="outlined"
                      size="medium"
                      onClick={handleCancel}
                      disabled={cmdIsReport ? true : false}
                    >
                      Cancelar
                    </Button>
                  </Item>
                </Stack>
              </>
            ) : (
              <>
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
                    >
                      {cmd}
                    </LoadingButton>
                  </Item>
                  <Item sx={{ width: isDesktop ? 375 : "100%" }}>
                    <Button
                      fullWidth
                      variant="outlined"
                      size="medium"
                      component={RouterLink}
                      to="/dashboard/app"
                      disabled={isSubmitting ? true : false}
                    >
                      Cancelar
                    </Button>
                  </Item>
                </Stack>
              </>
            )}
          </>
        )}
      </Form>
    </FormikProvider>
  );
};

ReportForm.propTypes = {
  createReport: PropTypes.func.isRequired,
  generatePDF: PropTypes.func.isRequired,
  deleteReport: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  company: state.company,
});

export default connect(mapStateToProps, {
  generatePDF,
  createReport,
  deleteReport,
})(ReportForm);
