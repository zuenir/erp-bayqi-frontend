import React, { useEffect } from "react";
import * as Yup from "yup";
import { useState } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink, useParams } from "react-router-dom";
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
import {
  getCurrentCompanyById,
  updateCompanyById,
} from "./../../../redux/company/companyAction";
import { getAllCompanyCategorys } from "../../../redux/companyCategory/categoryAction";
import { getProvincia, getMunicipio } from "./../../../data/dataLocation";
import useResponsive from "./../../../hooks/useResponsive";
import { getAllActivityData } from "../../../data/dataProfile";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const CompanyEditForm = ({
  getCurrentCompanyById,
  updateCompanyById,
  getAllCompanyCategorys,
  company: { company, loading },
  category: { categorys },
  auth: { roles },
}) => {
  let { company_id } = useParams();
  const [municipioData, setMunicipioData] = useState();
  const [loadingBt, setLoadingBt] = useState(true);
  const isDesktop = useResponsive("up", "lg");

  const [formData, setFormData] = useState({
    status: loading || !company?.status ? "" : company?.status,
    store: loading || !company?.store ? "" : company?.store,
    company_name: loading || !company?.company_name ? "" : company?.company_name,
    company_activity:loading || !company?.company_activity ? "" : company?.company_activity,
    company_sector:loading || !company?.company_sector ? "" : company?.company_sector,
    company_manager:loading || !company?.company_manager ? "" : company?.company_manager,
    nif: loading || !company?.nif ? "" : company?.nif,
    commission: loading || !company.commission ? "" : company?.commission,
    note: loading || !company?.note ? "" : company?.note,
    email: loading || !company?.email ? "" : company?.email,
    phone1: loading || !company?.phones.phone1 ? "" : company?.phones.phone1,
    phone2: loading || !company?.phones.phone2 ? "" : company?.phones.phone2,
    pais: "Angola",
    provincia:loading || !company?.location.provincia ? "" : company?.location.provincia,
    municipio:loading || !company?.location.municipio ? "" : company?.location.municipio,
    endereco:loading || !company?.location.endereco ? "" : company?.location.endereco,
  });

  useEffect(() => {
    getAllCompanyCategorys();
    getCurrentCompanyById(company_id).then((result) => {
      console.log(result);
      setFormData({
        status: result.payload.status,
        store: result.payload.store,
        company_name: result.payload.company_name,
        company_activity: result.payload.company_activity,
        company_sector: result.payload.company_sector,
        company_manager: result.payload.company_manager,
        nif: result.payload.nif,
        commission: result.payload.commission,
        note: result.payload.note,
        email: result.payload.email,
        phone1: result.payload.phones.phone1,
        phone2: result.payload.phones.phone2,
        pais: result.payload.location.pais,
        provincia: result.payload.location.provincia,
        municipio: result.payload.location.municipio,
        endereco: result.payload.location.endereco,
      });
      setLoadingBt(true);
    });
  }, [getCurrentCompanyById, getAllCompanyCategorys, company_id]);

  const AddCompanySchema = Yup.object().shape({
    company_name: Yup.string().required("Parceiro é obrigatório"),
    company_activity: Yup.string().required("Actividade é obrigatório"),
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
      initialValues={formData}
      enableReinitialize
      validationSchema={AddCompanySchema}
      onSubmit={async (values, actions) => {
        try {
          let data = {
            values,
            company_id,
          };
          console.log(data);
          await updateCompanyById(data);
          actions.setSubmitting(false);
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
                <InputLabel id="company_sector">Catgeoria</InputLabel>
                <Select
                  name="company_sector"
                  labelId="company_sector"
                  id="company_sector"
                  label="Categoria"
                  onBlur={props.handleBlur}
                  value={props.values.company_sector}
                  onChange={props.handleChange}
                  error={Boolean(
                    props.touched.company_sector && props.errors.company_sector
                  )}
                  helperText={
                    props.touched.company_sector && props.errors.company_sector
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
            {roles === 2001 ? (
              <>
                <Item sx={{ width: isDesktop ? 375 : "100%" }}>
                  <TextField
                    fullWidth
                    type="text"
                    id="status"
                    name="status"
                    label="Contrato"
                    disabled
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.status}
                  />
                </Item>

                <Item sx={{ width: isDesktop ? 375 : "100%" }}>
                  <TextField
                    fullWidth
                    type="text"
                    id="store"
                    name="store"
                    label="Contrato"
                    disabled
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.store}
                  />
                </Item>
              </>
            ) : (
              <>
                <Item sx={{ width: isDesktop ? 375 : "100%" }}>
                  <FormControl fullWidth>
                    <InputLabel id="status">Contrato</InputLabel>
                    <Select
                      labelId="status"
                      name="status"
                      label="Contrato"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.status}
                    >
                      <MenuItem value={"Aberto"}>Aberto</MenuItem>
                      <MenuItem value={"Fechado"}>Fechado</MenuItem>
                      <MenuItem value={"Cancelado"}>Cancelado</MenuItem>
                    </Select>
                  </FormControl>
                </Item>
                <Item sx={{ width: isDesktop ? 375 : "100%" }}>
                  <FormControl fullWidth>
                    <InputLabel id="store">Loja</InputLabel>
                    <Select
                      labelId="store"
                      name="store"
                      label="Loja"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.store}
                      disabled={props.values.company_activity === "BayQi Ponto" ? true:false}
                    >
                      <MenuItem value={"Pendente"}>Pendente</MenuItem>
                      <MenuItem value={"Publicado"}>Publicado</MenuItem>
                      <MenuItem value={"Removido"}>Removido</MenuItem>
                      {props.values.company_activity === "BayQi Ponto" && (<MenuItem value={"N/Disponível"}>N/Disponível</MenuItem>)}
                    </Select>
                  </FormControl>
                </Item>
              </>
            )}

            <Item sx={{ width: isDesktop ? 375 : "100%" }}>
              <TextField
                fullWidth
                type="text"
                name="commission"
                label="Comissão"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.commission}
              />
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
                    setLoadingBt(true);
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

                {municipioData && loadingBt ? (
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
                    name="municipio"
                    labelId="municipio"
                    id="municipio"
                    label="Município"
                    onChange={props.handleChange}
                    value={props.values.municipio}
                    error={Boolean(
                      props.touched.municipio && props.errors.municipio
                    )}
                    helperText={
                      props.touched.municipio && props.errors.municipio
                    }
                  >
                    {getMunicipio(formData.provincia).municipio.map((muni) => (
                      <MenuItem key={muni.id} value={muni.nome}>
                        {muni.nome}
                      </MenuItem>
                    ))}
                  </Select>
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
                Confirmar
              </LoadingButton>
            </Item>
            <Item sx={{ width: isDesktop ? 375 : "100%" }}>
              <Button
                fullWidth
                variant="outlined"
                size="medium"
                component={RouterLink}
                to="/dashboard/parceiros"
                disabled = {props.isSubmitting? true : false}
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

CompanyEditForm.propTypes = {
  getCurrentCompanyById: PropTypes.func.isRequired,
  updateCompanyById: PropTypes.func.isRequired,
  getAllCompanyCategorys: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  company: state.company,
  category: state.category,
});

export default connect(mapStateToProps, {
  getCurrentCompanyById,
  updateCompanyById,
  getAllCompanyCategorys,
})(CompanyEditForm);
