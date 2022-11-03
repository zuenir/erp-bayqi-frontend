import React from "react";
import * as Yup from "yup";
import { useState } from "react";
import PropTypes from "prop-types";
import { useFormik, Form, FormikProvider } from "formik";
import { Link as RouterLink } from "react-router-dom";

// material
import {
  Container,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  CardContent,
  Card,
  CardMedia,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";

// redux
import { connect } from "react-redux";
import { getProfileRole } from "./../../../data/dataProfile";
import { getProvincia, getMunicipio } from "./../../../data/dataLocation";
import { getAllProfileRoles,getAllOccupationData } from "./../../../data/dataProfile";
import useResponsive from "./../../../hooks/useResponsive";
import Iconify from "./../../../components/Iconify";
import { generatePassword } from "./../../../utils/generatePassword";
import { createUserById } from "./../../../redux/auth/authAction";
import { createProfileById } from "../../../redux/profile/profileAction";
import Label from "./../../../components/Label";
import { sentenceCase } from "change-case";

const steps = ["Criar Usuário", "Criar Perfirl", "Finalizado"];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const UserAddForm = ({ createUserById, createProfileById, auth: { user } }) => {
  const isDesktop = useResponsive("up", "lg");
  const [btLogin, setBtLogin] = useState(false);
  const [btPerfil, setBtPerfil] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [municipioData, setMunicipioData] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    status: "",
    email: "",
    roles: "",
    name: "",
    genre: "",
    office: "",
    phone1: "",
    phone2: "",
    provincia: "",
    municipio: "",
    endereco: "",
  });

  /**
   * Step - Config
   */

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  //------------------------------------------------------------------------------------
  /**
   * Step #1 - Criar Login
   */

  const LoginSchema = Yup.object().shape({
    status: Yup.string().required("Status is required"),
    email: Yup.string()
      .required("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    roles: Yup.string().required("Perfil is required"),
  });

  const formikLogin = useFormik({
    enableReinitialize: true,
    initialValues: {
      status: "",
      email: "",
      roles: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      setBtLogin(true);
      setTimeout(() => {
        formikPerfil.setFieldValue("email", values.email);
        setBtLogin(false);
        handleNext();
      }, 1000);
    },
  });

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleGeneratePassword = () => {
    formikLogin.setFieldValue("password", generatePassword(6, true, true));
  };

  //---------------------------------------------------------------------------------
  /**
   * Step # 2 - Criar Perfil
   */

  const handleStatus = (status) => {
    return status === "Bloqueado" ? "banned" : status;
  };

  const ProfileSchema = Yup.object().shape({
    name: Yup.string().required("Nome is required"),
    genre: Yup.string().required("Gênero is required"),
    office: Yup.string().required("Cargo is required"),
    phone1: Yup.string().required("Telemóvel #1 is required"),
    provincia: Yup.string().required("Província is required"),
    municipio: Yup.string().required("Munícipio is required"),
    endereco: Yup.string().required("Endereço is required"),
  });

  const formikPerfil = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      genre: "",
      office: "",
      email: "",
      phone1: "",
      phone2: "",
      provincia: "",
      municipio: "",
      endereco: "",
    },
    validationSchema: ProfileSchema,
    onSubmit: async (values) => {
      setBtPerfil(true);
      try {
        let formDataLogin = {
          status: formikLogin.values.status,
          email: formikLogin.values.email,
          roles: formikLogin.values.roles,
          password: formikLogin.values.password,
          createBy: user._id,
        };

        await createUserById(formDataLogin)
          .finally()
          .then(async (result) => {
            let formDataPerfil = {
              user_id: result.payload.user._id,
              name: values.name,
              genre: values.genre,
              office: values.office,
              phone1: values.phone1,
              phone2: values.phone2,
              provincia: values.provincia,
              municipio: values.municipio,
              endereco: values.endereco,
            };

            await createProfileById(formDataPerfil).then(() => {
              setFormData({
                status: formikLogin.values.status,
                email: formikLogin.values.email,
                roles: formikLogin.values.roles,
                name: values.name,
                genre: values.genre,
                office: values.office,
                phone1: values.phone1,
                phone2: values.phone2,
                provincia: values.provincia,
                municipio: values.municipio,
                endereco: values.endereco,
              });
              setBtPerfil(false);
              formikLogin.resetForm();
              formikPerfil.resetForm();
              handleNext();
            });
          });
      } catch (error) {
        console.error("Failed to load data", error);
      }
    },
  });

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label} </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Stack sx={{ marginTop: 3 }}>
            <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
              Todas as etapas foram concluídas - Agente Cadastrado.
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Novo</Button>
              <Button component={RouterLink} to="/dashboard/agentes">
                Concluir
              </Button>
            </Box>
          </Stack>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep === 0 ? (
            <>
              <Container maxWidth="md">
                <Stack
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 2,
                    mt: 5,
                  }}
                >
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: "text.secondary", mb: 1 }}
                    paddingLeft={1}
                    paddingRight={1}
                    marginBottom={3}
                  >
                    Criar Usuário
                  </Typography>
                </Stack>

                <FormikProvider value={formikLogin}>
                  <Form
                    autoComplete="off"
                    noValidate
                    onSubmit={formikLogin.handleSubmit}
                  >
                    <Stack spacing={3}>
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                      >
                        <Item sx={{ width: isDesktop ? 375 : "100%" }}>
                          <FormControl fullWidth>
                            <InputLabel id="status">Status</InputLabel>
                            <Select
                              labelId="status"
                              name="status"
                              label="Status"
                              onChange={formikLogin.handleChange}
                              onBlur={formikLogin.handleBlur}
                              value={formikLogin.values.status}
                              error={Boolean(
                                formikLogin.touched.status &&
                                  formikLogin.errors.status
                              )}
                              helperText={
                                formikLogin.touched.status &&
                                formikLogin.errors.status
                              }
                            >
                              <MenuItem value={"Activo"}>Activo</MenuItem>
                              <MenuItem value={"Bloqueado"}>Bloqueado</MenuItem>
                            </Select>
                          </FormControl>
                        </Item>
                        <Item sx={{ width: isDesktop ? 375 : "100%" }} />
                      </Stack>

                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                      >
                        <Item sx={{ width: isDesktop ? 375 : "100%" }}>
                          <FormControl fullWidth>
                            <InputLabel id="roles">Perfil</InputLabel>
                            <Select
                              labelId="roles"
                              name="roles"
                              label="Perfil"
                              value={formikLogin.values.roles}
                              onChange={formikLogin.handleChange}
                              onBlur={formikLogin.handleBlur}
                              error={Boolean(
                                formikLogin.touched.roles &&
                                  formikLogin.errors.roles
                              )}
                              helperText={
                                formikLogin.touched.roles &&
                                formikLogin.errors.roles
                              }
                            >
                              {getAllProfileRoles().map((role, index) => (
                                <MenuItem key={index} value={role.value}>
                                  {role.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Item>

                        <Item sx={{ width: isDesktop ? 375 : "100%" }}>
                          <TextField
                            fullWidth
                            autoComplete="username"
                            name="email"
                            type="email"
                            label="Email"
                            value={formikLogin.values.email}
                            onChange={formikLogin.handleChange}
                            onBlur={formikLogin.handleBlur}
                            error={Boolean(
                              formikLogin.touched.email &&
                                formikLogin.errors.email
                            )}
                            helperText={
                              formikLogin.touched.email &&
                              formikLogin.errors.email
                            }
                          />
                        </Item>
                      </Stack>

                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                      >
                        <Item sx={{ width: isDesktop ? 375 : "100%" }}>
                          <TextField
                            fullWidth
                            autoComplete="current-password"
                            type={showPassword ? "text" : "password"}
                            label="Palavra-Passe"
                            name="password"
                            value={formikLogin.values.password}
                            onChange={formikLogin.handleChange}
                            onBlur={formikLogin.handleBlur}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={handleShowPassword}
                                    edge="end"
                                  >
                                    <Iconify
                                      icon={
                                        showPassword
                                          ? "eva:eye-fill"
                                          : "eva:eye-off-fill"
                                      }
                                    />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                            error={Boolean(
                              formikLogin.touched.password &&
                                formikLogin.errors.password
                            )}
                            helperText={
                              formikLogin.touched.password &&
                              formikLogin.errors.password
                            }
                          />
                        </Item>
                        <Item sx={{ width: isDesktop ? 375 : "100%" }}>
                          <Button
                            fullWidth
                            variant="outlined"
                            size="medium"
                            sx={{ marginTop: 1 }}
                            onClick={handleGeneratePassword}
                          >
                            Gerar Palavra-passe
                          </Button>
                        </Item>
                      </Stack>
                    </Stack>

                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={{ xs: 1, sm: 2, md: 4 }}
                      marginTop={3}
                    >
                      <Item sx={{ width: isDesktop ? 375 : "100%" }} />
                      <Item sx={{ width: isDesktop ? 375 : "100%" }}>
                        <LoadingButton
                          fullWidth
                          type="submit"
                          size="medium"
                          onClick={formikLogin.handleSubmit}
                          variant="contained"
                          loading={btLogin}
                        >
                          Próximo
                        </LoadingButton>
                      </Item>
                      <Item sx={{ width: isDesktop ? 375 : "100%" }}>
                        <Button
                          fullWidth
                          variant="outlined"
                          size="medium"
                          component={RouterLink}
                          to="/dashboard/agentes"
                          disabled={formikLogin.handleSubmit?false:true}
                        >
                          Cancelar
                        </Button>
                      </Item>
                    </Stack>
                  </Form>
                </FormikProvider>
              </Container>
            </>
          ) : activeStep === 1 ? (
            <>
              <Container maxWidth="md">
                <Stack
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 2,
                    mt: 5,
                  }}
                >
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: "text.secondary", mb: 1 }}
                    paddingLeft={1}
                    paddingRight={1}
                    marginBottom={3}
                  >
                    Criar Perfil
                  </Typography>
                </Stack>

                <FormikProvider value={formikPerfil}>
                  <Form
                    autoComplete="off"
                    noValidate
                    onSubmit={formikPerfil.handleSubmit}
                  >
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{ color: "text.secondary", mb: 1 }}
                      paddingLeft={1}
                      paddingRight={1}
                    >
                      Info
                    </Typography>

                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={{ xs: 1, sm: 2, md: 4 }}
                    >
                      <Item sx={{ width: isDesktop ? 375 : "100%" }}>
                        <FormControl fullWidth>
                          <InputLabel id="office">Cargo</InputLabel>
                          <Select
                            labelId="office"
                            name="office"
                            label="office"
                            onChange={formikPerfil.handleChange}
                            onBlur={formikPerfil.handleBlur}
                            value={formikPerfil.values.office}
                            error={Boolean(
                              formikPerfil.touched.office &&
                                formikPerfil.errors.office
                            )}
                            helperText={
                              formikPerfil.touched.office &&
                              formikPerfil.errors.office
                            }
                          >
                          {getAllOccupationData().map((occupt, index) =>  
                            <MenuItem key={index} value={occupt.value}>
                              {occupt.label}
                            </MenuItem>
                          )}
                          </Select>
                        </FormControl>
                      </Item>
                      <Item sx={{ width: isDesktop ? 375 : "100%" }} />
                    </Stack>

                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={{ xs: 1, sm: 2, md: 4 }}
                    >
                      <Item sx={{ width: isDesktop ? 375 : "100%" }}>
                        <TextField
                          fullWidth
                          type="text"
                          name="name"
                          label="Nome"
                          onChange={formikPerfil.handleChange}
                          onBlur={formikPerfil.handleBlur}
                          value={formikPerfil.values.name}
                          error={Boolean(
                            formikPerfil.touched.name &&
                              formikPerfil.errors.name
                          )}
                          helperText={
                            formikPerfil.touched.name &&
                            formikPerfil.errors.name
                          }
                        />
                      </Item>
                      <Item sx={{ width: isDesktop ? 375 : "100%" }}>
                        <FormControl fullWidth>
                          <InputLabel id="genre">Gênero</InputLabel>
                          <Select
                            labelId="genre"
                            name="genre"
                            label="genre"
                            onChange={formikPerfil.handleChange}
                            onBlur={formikPerfil.handleBlur}
                            value={formikPerfil.values.genre}
                          >
                            <MenuItem value={"m"}>Homem</MenuItem>
                            <MenuItem value={"f"}>Mulher</MenuItem>
                          </Select>
                        </FormControl>
                      </Item>
                    </Stack>

                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{ color: "text.secondary", mb: 1 }}
                      paddingLeft={1}
                      paddingRight={1}
                      marginTop={3}
                    >
                      Contacto
                    </Typography>

                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={{ xs: 1, sm: 2, md: 4 }}
                    >
                      <Item sx={{ width: isDesktop ? 375 : "100%" }}>
                        <TextField
                          fullWidth
                          type="email"
                          name="email"
                          label="Email"
                          onChange={formikPerfil.handleChange}
                          onBlur={formikPerfil.handleBlur}
                          value={formikPerfil.values.email}
                          disabled
                        />
                      </Item>
                      <Item sx={{ width: isDesktop ? 375 : "100%" }} />
                    </Stack>

                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={{ xs: 1, sm: 2, md: 4 }}
                    >
                      <Item sx={{ width: isDesktop ? 375 : "100%" }}>
                        <TextField
                          fullWidth
                          type="text"
                          name="phone1"
                          label="* Número de Telefone #1"
                          onChange={formikPerfil.handleChange}
                          onBlur={formikPerfil.handleBlur}
                          value={formikPerfil.values.phone1}
                          error={Boolean(
                            formikPerfil.touched.phone1 &&
                              formikPerfil.errors.phone1
                          )}
                          helperText={
                            formikPerfil.touched.phone1 &&
                            formikPerfil.errors.phone1
                          }
                        />
                      </Item>
                      <Item sx={{ width: isDesktop ? 375 : "100%" }}>
                        <TextField
                          fullWidth
                          type="text"
                          name="phone2"
                          label="* Número de Telefone #2 (opcional)"
                          onChange={formikPerfil.handleChange}
                          onBlur={formikPerfil.handleBlur}
                          value={formikPerfil.values.phone2}
                        />
                      </Item>
                    </Stack>

                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{ color: "text.secondary", mb: 1 }}
                      paddingLeft={1}
                      paddingRight={1}
                      marginTop={3}
                    >
                      Endereço
                    </Typography>

                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={{ xs: 1, sm: 2, md: 4 }}
                    >
                      <Item sx={{ width: isDesktop ? 375 : "100%" }}>
                        <TextField
                          fullWidth
                          type="text"
                          name="pais"
                          label="Angola"
                          disabled
                          onChange={formikPerfil.handleChange}
                          onBlur={formikPerfil.handleBlur}
                          value={formikPerfil.values.pais}
                          error={Boolean(
                            formikPerfil.touched.pais &&
                              formikPerfil.errors.pais
                          )}
                          helperText={
                            formikPerfil.touched.pais &&
                            formikPerfil.errors.pais
                          }
                        />
                      </Item>
                      <Item sx={{ width: isDesktop ? 375 : "100%" }} />
                    </Stack>

                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={{ xs: 1, sm: 2, md: 4 }}
                    >
                      <Item sx={{ width: isDesktop ? 375 : "100%" }}>
                        <FormControl fullWidth>
                          <InputLabel id="provincia">Província</InputLabel>
                          <Select
                            name="provincia"
                            labelId="provincia"
                            id="provincia"
                            label="Província"
                            onBlur={formikPerfil.handleBlur}
                            value={formikPerfil.values.provincia}
                            onChange={(e) => {
                              const selectedId = e.target.value;
                              const muni = getMunicipio(selectedId).municipio;
                              setMunicipioData(muni);
                              formikPerfil.handleChange(e);
                            }}
                            error={Boolean(
                              formikPerfil.touched.provincia &&
                                formikPerfil.errors.provincia
                            )}
                            helperText={
                              formikPerfil.touched.provincia &&
                              formikPerfil.errors.provincia
                            }
                          >
                            {getProvincia().map((prov) => (
                              <MenuItem key={prov.id} value={prov.nome}>
                                {prov.nome}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Item>
                      <Item sx={{ width: isDesktop ? 375 : "100%" }}>
                        <FormControl fullWidth>
                          <InputLabel id="municipio">Munícipio</InputLabel>

                          {municipioData ? (
                            <Select
                              labelId="municipio"
                              id="municipio"
                              label="Município"
                              name="municipio"
                              onBlur={formikPerfil.handleBlur}
                              value={formikPerfil.values.municipio}
                              onChange={formikPerfil.handleChange}
                              error={Boolean(
                                formikPerfil.touched.municipio &&
                                  formikPerfil.errors.municipio
                              )}
                              helperText={
                                formikPerfil.touched.municipio &&
                                formikPerfil.errors.municipio
                              }
                            >
                              {municipioData.map((muni) => (
                                <MenuItem key={muni.id} value={muni.nome}>
                                  {muni.nome}
                                </MenuItem>
                              ))}
                            </Select>
                          ) : (
                            <Select
                              labelId="municipio"
                              id="municipio"
                              label="Município"
                              name="municipio"
                              error={Boolean(
                                formikPerfil.touched.municipio &&
                                  formikPerfil.errors.municipio
                              )}
                              helperText={
                                formikPerfil.touched.municipio &&
                                formikPerfil.errors.municipio
                              }
                            ></Select>
                          )}
                        </FormControl>
                      </Item>
                    </Stack>

                    <Stack
                      spacing={3}
                      paddingLeft={1}
                      paddingRight={1}
                      marginTop={1}
                    >
                      <TextField
                        fullWidth
                        type="text"
                        name="endereco"
                        label="Endereço"
                        onChange={formikPerfil.handleChange}
                        onBlur={formikPerfil.handleBlur}
                        value={formikPerfil.values.endereco}
                        error={Boolean(
                          formikPerfil.touched.endereco &&
                            formikPerfil.errors.endereco
                        )}
                        helperText={
                          formikPerfil.touched.endereco &&
                          formikPerfil.errors.endereco
                        }
                      />
                    </Stack>

                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={{ xs: 1, sm: 2, md: 4 }}
                      marginTop={3}
                    >
                      <Item sx={{ width: isDesktop ? 375 : "100%" }} />

                      <Item sx={{ width: isDesktop ? 375 : "100%" }}>
                        <LoadingButton
                          type="submit"
                          fullWidth
                          size="medium"
                          onClick={formikPerfil.handleSubmit}
                          variant="contained"
                          loading={btPerfil}
                        >
                          Próximo
                        </LoadingButton>
                      </Item>

                      <Item sx={{ width: isDesktop ? 375 : "100%" }}>
                        <Button
                          fullWidth
                          size="medium"
                          onClick={handleBack}
                          variant="outlined"
                          disabled={btPerfil?true:false}
                        >
                          Voltar
                        </Button>
                      </Item>
                    </Stack>
                  </Form>
                </FormikProvider>
              </Container>
            </>
          ) : (
            <>
              <Container maxWidth="md">
                <Stack
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 2,
                    mt: 5,
                  }}
                >
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: "text.secondary", mb: 1 }}
                    paddingLeft={1}
                    paddingRight={1}
                    marginBottom={3}
                  >
                    Perfil do Usário
                  </Typography>
                </Stack>

                <Card sx={{ display: "flex" }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image="/static/mock-images/avatars/avatar_default.jpg"
                    alt="avatar"
                  />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          pl: 1,
                          pb: 1,
                        }}
                      >
                        <Typography component="div" variant="h5" sx={{ mr: 3 }}>
                          {formData.name}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          component="div"
                        >
                          <Label
                            variant="ghost"
                            color={
                              (handleStatus(formData.status) === "banned" &&
                                "warning") ||
                              "success"
                            }
                          >
                            {sentenceCase(formData.status)}
                          </Label>
                        </Typography>
                      </Box>

                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        component="div"
                      >
                        {`${getProfileRole(formData.roles).label} / ${
                          formData.office
                        }`}
                      </Typography>

                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        component="div"
                      >
                        {`${formData.email} / ${formData.phone1} - ${formData.phone2}`}
                      </Typography>

                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        component="div"
                      >
                        {`Angola - ${formData.provincia}, ${formData.municipio}`}
                      </Typography>

                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        component="div"
                      >
                        {formData.endereco}
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                  marginTop={3}
                >
                  <Item sx={{ width: isDesktop ? 375 : "100%" }} />

                  <Item sx={{ width: isDesktop ? 375 : "100%" }} />

                  <Item sx={{ width: isDesktop ? 375 : "100%" }}>
                    <Button
                      fullWidth
                      size="medium"
                      onClick={handleNext}
                      variant="contained"
                    >
                      Finalizar
                    </Button>
                  </Item>
                </Stack>
              </Container>
            </>
          )}
        </React.Fragment>
      )}
    </Box>
  );
};

UserAddForm.propTypes = {
  createUserById: PropTypes.func.isRequired,
  createProfileById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { createUserById, createProfileById })(
  UserAddForm
);
