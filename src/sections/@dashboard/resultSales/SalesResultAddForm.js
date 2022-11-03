import React, { useEffect } from "react";
import * as Yup from "yup";
import { useState } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { Formik } from "formik";

// material
import {
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";

// redux
import { connect } from "react-redux";
import { createCompany } from "./../../../redux/company/companyAction";
import { getAllCompanyCategorys } from "../../../redux/companyCategory/categoryAction";
import { getProvincia, getMunicipio } from "./../../../data/dataLocation";
import { getAllActivityData } from "../../../data/dataProfile";
import useResponsive from "./../../../hooks/useResponsive";
import { getAllAdvertisingPackage } from "../../../redux/advertisingPackage/advertisingPackageAction";
import { createAdvertisingCompany } from "../../../redux/advertising/advertisingAction";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const SalesResultAddForm = ({
  createCompany,
  createAdvertisingCompany,
  getAllAdvertisingPackage,
  getAllCompanyCategorys,
  category: { categorys },
  advertisingPackage: { advertisingPackages },
}) => {
  const [municipioData, setMunicipioData] = useState();
  const [loading, setLoading] = useState(false);

  const isDesktop = useResponsive("up", "lg");

  useEffect(() => {
    getAllCompanyCategorys();
    getAllAdvertisingPackage();
  }, [getAllCompanyCategorys,getAllAdvertisingPackage]);

  const AddCompanySchema = Yup.object().shape({
    status: Yup.string().required("Contrato é obrigatório"),
    company_name: Yup.string().required("Parceiro é obrigatório"),
    company_activity: Yup.string().required("Actividae é obrigatório"),
    company_sector: Yup.string().required("Categoria é obrigatório"),
    company_manager: Yup.string().required("Responsável é obrigatório"),
    nif: Yup.string().required("NIF é obrigatório"),
    phone1: Yup.string().required("Contacto #1 é obrigatório"),
    provincia: Yup.string().required("Província é obrigatório"),
    municipio: Yup.string().required("Munícipio é obrigatório"),
    endereco: Yup.string().required("Endereço é obrigatório"),
  });

  return (
    <Formik
      initialValues={{
        status: "Aberto",
        company_name: "",
        company_activity: "",
        company_sector: "",
        company_manager: "",
        nif: "",
        commission: "",
        note: "",
        email: "",
        phone1: "",
        phone2: "",
        pais: "Angola",
        provincia: "",
        municipio: "",
        endereco: "",
        advertising:"",
      }}
      validationSchema={AddCompanySchema}
      onSubmit={(values, actions) => {
        try {

          let advertising = advertisingPackages.filter((advert) => advert.name === values.advertising);

          setTimeout(async () => {
            await createCompany(values).then(async(result) => {
              var formData = {
                companyId: result.payload.id,
                advertising: advertising[0],
              }
              await createAdvertisingCompany(formData);
            });
            setLoading(false);
            actions.resetForm();
            actions.setSubmitting(false);
          }, 5000);
        } catch (error) {
          console.error("Failed to load data", error);
        }
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
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
              <TextField
                fullWidth
                type="text"
                name="nif"
                label="NIF"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.nif}
                error={Boolean(props.touched.nif && props.errors.nif)}
                helperText={props.touched.nif && props.errors.nif}
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
                <InputLabel id="company_activity">Actividade</InputLabel>
                <Select
                  labelId="company_activity"
                  name="company_activity"
                  label="Actividade"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.company_activity}
                  error={Boolean(
                    props.touched.company_activity &&
                      props.errors.company_activity
                  )}
                  helperText={
                    props.touched.company_activity &&
                    props.errors.company_activity
                  }
                >
                  {getAllActivityData().map((activ,index) => (
                    <MenuItem key={index} value={activ.value}>{activ.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Item>
            <Item sx={{ width: isDesktop ? 375 : "100%" }}>
              <FormControl fullWidth>
                <InputLabel id="company_sector">Categoria</InputLabel>
                <Select
                  name="company_sector"
                  labelId="company_sector"
                  id="company_sector"
                  label="Categoria"
                  onBlur={props.handleBlur}
                  value={props.values.company_sector}
                  onChange={props.handleChange}
                  error={Boolean(
                    props.touched.company_sector &&
                      props.errors.company_sector
                  )}
                  helperText={
                    props.touched.company_sector &&
                    props.errors.company_sector
                  }
                >
                  {categorys.map((category) => (
                    <MenuItem key={category._id} value={category.name}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Item>
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Item sx={{ width: isDesktop ? 375 : "100%" }}>
              <TextField
                fullWidth
                type="text"
                name="company_name"
                label="Parceiro"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.company_name}
                error={Boolean(
                  props.touched.company_name && props.errors.company_name
                )}
                helperText={
                  props.touched.company_name && props.errors.company_name
                }
              />
            </Item>
            <Item sx={{ width: isDesktop ? 375 : "100%" }}>
              <TextField
                fullWidth
                type="text"
                name="company_manager"
                label="Responsável"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.company_manager}
                error={Boolean(
                  props.touched.company_manager && props.errors.company_manager
                )}
                helperText={
                  props.touched.company_manager && props.errors.company_manager
                }
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
            Acordo
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Item sx={{ width: isDesktop ? 375 : "100%" }}>
              <TextField
                fullWidth
                id="status"
                type="text"
                name="status"
                label="Contrato"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.status}
                disabled
              />
            </Item>
            <Item sx={{ width: isDesktop ? 375 : "100%" }}>
              {props.values.company_activity === "BayQi Publicidade" 
                ?
                  (<>
                    <FormControl fullWidth>
                      <InputLabel id="advertising">Pacote Publicitário</InputLabel>
                      <Select
                        name="advertising"
                        labelId="advertising"
                        id="advertising"
                        label="Pacote Publicitário"
                        onBlur={props.handleBlur}
                        value={props.values.advertising}
                        onChange={props.handleChange}
                        error={Boolean(
                          props.touched.advertising &&
                            props.errors.advertising
                        )}
                        helperText={
                          props.touched.advertising &&
                          props.errors.advertising
                        }
                      >
                        {advertisingPackages.map((advert) => (
                          <MenuItem key={advert._id} value={advert.name}>
                            {advert.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </>) 
                : 
                  <TextField
                    fullWidth
                    type="text"
                    name="commission"
                    label="Comissão"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.commission}
                />     
              }  
              
            </Item>
          </Stack>

          <Stack sx={{ padding: 1 }}>
            <TextField
              fullWidth
              multiline
              rows={2}
              id="note"
              name="note"
              label="Nota"
              placeholder="Deixe uma nota aqui..."
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.note}
            />
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
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.email}
                error={Boolean(props.touched.email && props.errors.email)}
                helperText={props.touched.email && props.errors.email}
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
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.phone1}
                error={Boolean(props.touched.phone1 && props.errors.phone1)}
                helperText={props.touched.phone1 && props.errors.phone1}
              />
            </Item>
            <Item sx={{ width: isDesktop ? 375 : "100%" }}>
              <TextField
                fullWidth
                type="text"
                name="phone2"
                label="* Número de Telefone #2 (opcional)"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.phone2}
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
                label="Pais"
                disabled
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.pais}
                error={Boolean(props.touched.pais && props.errors.pais)}
                helperText={props.touched.pais && props.errors.pais}
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
                  onBlur={props.handleBlur}
                  value={props.values.provincia}
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    const muni = getMunicipio(selectedId).municipio;
                    setMunicipioData(muni);
                    setLoading(true);
                    props.handleChange(e);
                  }}
                  error={Boolean(
                    props.touched.provincia && props.errors.provincia
                  )}
                  helperText={props.touched.provincia && props.errors.provincia}
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

                {municipioData && loading ? (
                  <Select
                    labelId="municipio"
                    id="municipio"
                    label="Município"
                    name="municipio"
                    onBlur={props.handleBlur}
                    value={props.values.municipio}
                    onChange={props.handleChange}
                    error={Boolean(
                      props.touched.municipio && props.errors.municipio
                    )}
                    helperText={
                      props.touched.municipio && props.errors.municipio
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
                      props.touched.municipio && props.errors.municipio
                    )}
                    helperText={
                      props.touched.municipio && props.errors.municipio
                    }
                  ></Select>
                )}
              </FormControl>
            </Item>
          </Stack>

          <Stack spacing={3} paddingLeft={1} paddingRight={1} marginTop={1}>
            <TextField
              fullWidth
              type="text"
              name="endereco"
              label="Endereço"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.endereco}
              error={Boolean(props.touched.endereco && props.errors.endereco)}
              helperText={props.touched.endereco && props.errors.endereco}
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
                fullWidth
                size="medium"
                onClick={props.handleSubmit}
                variant="contained"
                loading={props.isSubmitting}
              >
                Cadastrar
              </LoadingButton>
            </Item>
            <Item sx={{ width: isDesktop ? 375 : "100%" }}>
              <Button
                fullWidth
                variant="outlined"
                size="medium"
                component={RouterLink}
                to="/dashboard/parceiros"
                disabled={props.isSubmitting?true:false}
              >
                Voltar
              </Button>
            </Item>
          </Stack>
        </form>
      )}
    </Formik>
  );
};

SalesResultAddForm.propTypes = {
  createCompany: PropTypes.func.isRequired,
  createAdvertisingCompany: PropTypes.func.isRequired,
  getAllAdvertisingPackage: PropTypes.func.isRequired,
  getAllCompanyCategorys: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  advertisingPackage: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  category: state.category,
  advertisingPackage : state.advertisingPackage
});

export default connect(mapStateToProps, {
  createCompany,
  createAdvertisingCompany,
  getAllAdvertisingPackage,
  getAllCompanyCategorys,
})(SalesResultAddForm);
