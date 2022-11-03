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
import {
  getCurrentProfile,
  updateProfileById,
} from "./../../../redux/profile/profileAction";
import { getProvincia, getMunicipio } from "./../../../data/dataLocation";
import useResponsive from "./../../../hooks/useResponsive";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ProfileForm = ({
  getCurrentProfile,
  updateProfileById,
  profile: { profile, loading },
  auth: { roles },
}) => {
  const [municipioData, setMunicipioData] = useState();
  const [loadingBt, setLoadingBt] = useState(true);
  const isDesktop = useResponsive("up", "lg");

  const [formData, setFormData] = useState({
    name: loading || !profile?.name ? "" : profile?.name,
    genre: loading || !profile?.genre ? "" : profile?.genre,
    office: loading || !profile?.office ? "" : profile?.office,
    email: loading || !profile?.user.email ? "" : profile?.user.email,
    phone1: loading || !profile?.phones.phone1 ? "" : profile?.phones.phone1,
    phone2: loading || !profile?.phones.phone2 ? "" : profile?.phones.phone2,
    pais: "Angola",
    provincia:
      loading || !profile?.location.provincia ? "" : profile?.location.provincia,
    municipio:
      loading || !profile?.location.municipio ? "" : profile?.location.municipio,
    endereco:
      loading || !profile?.location.endereco ? "" : profile?.location.endereco,
  });

  useEffect(() => {
    getCurrentProfile()
      .finally()
      .then((result) => {
        setFormData({
          name: result?.payload.name,
          genre: result?.payload.genre,
          office: result?.payload.office,
          email: result?.payload.user.email,
          phone1: result?.payload.phones.phone1,
          phone2: result?.payload.phones.phone2,
          pais: result?.payload.location.pais,
          provincia: result?.payload.location.provincia,
          municipio: result?.payload.location.municipio,
          endereco: result?.payload.location.endereco,
        });
        setLoadingBt(true);
      });
  }, [getCurrentProfile]);

  const AddProfileSchema = Yup.object().shape({
    name: Yup.string().required("Nome is required"),
    genre: Yup.string().required("Gênero is required"),
    office: Yup.string().required("Cargo is required"),
    email: Yup.string().required("Email is required"),
    phone1: Yup.string().required("Contacto #1 is required"),
    provincia: Yup.string().required("Província is required"),
    municipio: Yup.string().required("Munícipio is required"),
    endereco: Yup.string().required("Endereço is required"),
  });

  return (
    <Formik
      initialValues={formData}
      enableReinitialize
      validationSchema={AddProfileSchema}
      onSubmit={(values, actions) => {
        try {
          setTimeout(async () => {
            let data = {
              user_id: profile._id,
              values,
            };
            await updateProfileById(data);
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
                name="office"
                label="Cargo"
                disabled
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.office}
              />
            </Item>
            <Item sx={{ width: isDesktop ? 375 : "100%" }}>
              <TextField
                fullWidth
                type="text"
                name="name"
                label="Nome"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.name}
                error={Boolean(props.touched.name && props.errors.name)}
                helperText={props.touched.name && props.errors.name}
              />
            </Item>
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Item sx={{ width: isDesktop ? 375 : "100%" }}>
              <FormControl fullWidth>
                <InputLabel id="genre">Gênero</InputLabel>
                <Select
                  labelId="genre"
                  name="genre"
                  label="genre"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.genre}
                >
                  <MenuItem value={"m"}>Homem</MenuItem>
                  <MenuItem value={"f"}>Mulher</MenuItem>
                </Select>
              </FormControl>
            </Item>
            <Item sx={{ width: isDesktop ? 375 : "100%" }} />
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
                    value={props.values.municipio}
                    onChange={props.handleChange}
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
                to="/dashboard/app"
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

ProfileForm.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  updateProfileById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  updateProfileById,
})(ProfileForm);
