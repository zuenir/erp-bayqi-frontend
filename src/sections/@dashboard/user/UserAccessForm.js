import React, { useEffect } from "react";
import * as Yup from "yup";
import { useState } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink, useParams } from "react-router-dom";
import { FormikProvider,Form, useFormik } from "formik";

// material
import {
  Stack,
  TextField,
  Typography,
  Button,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";

// redux
import { getAllProfileRoles } from "./../../../data/dataProfile";
import { connect } from "react-redux";
import { getSelectedProfileById } from "./../../../redux/profile/profileAction";
import { updateUserById } from "../../../redux/auth/authAction";
import useResponsive from "../../../hooks/useResponsive";
import Iconify from "../../../components/Iconify";
import { generatePassword } from "./../../../utils/generatePassword";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const UserAccessForm = ({
  getSelectedProfileById, updateUserById,
  profile: { profileSelectedBy, loading },
}) => {
  const { user_id } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const isDesktop = useResponsive("up", "lg");

  const [formData, setFormData] = useState({
    status:
      loading || !profileSelectedBy.user.status
        ? ""
        : profileSelectedBy.user.status,
    roles:
      loading || !profileSelectedBy.user.roles
        ? ""
        : profileSelectedBy.user.roles,
    name: loading || !profileSelectedBy.name ? "" : profileSelectedBy.name,
    email:
      loading || !profileSelectedBy.user.email
        ? ""
        : profileSelectedBy.user.email,
    password: "",
  });

  useEffect(() => {
    getSelectedProfileById(user_id)
      .finally()
      .then((result) => {
        setFormData({
          status: result.payload.user.status,
          roles: result.payload.user.roles,
          name: result.payload.name,
          email: result.payload.user.email,
          password: "",
        });
      });
  }, [getSelectedProfileById, user_id]);

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleGeneratePassword = () => {
    formikAccess.setFieldValue("password", generatePassword(6, true, true));
  };

  const UserAccessSchema = Yup.object().shape({
    email: Yup.string().required("Email é obrigatório"),
  });

  const formikAccess = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: UserAccessSchema,
    onSubmit: async (values, actions) => {
      let data = {
        user_id,
        values
      }
      await updateUserById(data);
      actions.setSubmitting(false);
      formikAccess.resetForm();
    },
  });

  return (
    <FormikProvider value={formikAccess}>
      <Form autoComplete="off" noValidate onSubmit={formikAccess.handleSubmit}>
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
              <InputLabel id="status">Status</InputLabel>
              <Select
                labelId="status"
                name="status"
                label="Status"
                onChange={formikAccess.handleChange}
                onBlur={formikAccess.handleBlur}
                value={formikAccess.values.status}
              >
                <MenuItem value={"Activo"}>Activo</MenuItem>
                <MenuItem value={"Bloqueado"}>Bloqueado</MenuItem>
              </Select>
            </FormControl>
          </Item>
          <Item sx={{ width: isDesktop ? 375 : "100%" }}>
            <FormControl fullWidth>
              <InputLabel id="roles">Perfil</InputLabel>
              <Select
                labelId="roles"
                name="roles"
                label="Perfil"
                onChange={formikAccess.handleChange}
                onBlur={formikAccess.handleBlur}
                value={formikAccess.values.roles}
              >
                {getAllProfileRoles().map((role, index) => (
                  <MenuItem key={index} value={role.value}>
                    {role.label}
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
              name="name"
              label="Nome"
              disabled
              onChange={formikAccess.handleChange}
              onBlur={formikAccess.handleBlur}
              value={formikAccess.values.name}
            />
          </Item>
          <Item sx={{ width: isDesktop ? 375 : "100%" }}>
            <TextField
              fullWidth
              type="email"
              name="email"
              label="Email"
              disabled
              onChange={formikAccess.handleChange}
              onBlur={formikAccess.handleBlur}
              value={formikAccess.values.email}
              error={Boolean(formikAccess.touched.email && formikAccess.errors.email)}
              helperText={formikAccess.touched.email && formikAccess.errors.email}
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
          Alterar Palavra-Passe
        </Typography>

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
              value={formikAccess.values.password}
              onChange={formikAccess.handleChange}
              onBlur={formikAccess.handleBlur}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Iconify
                        icon={
                          showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
              onClick={formikAccess.handleSubmit}
              variant="contained"
              loading={formikAccess.isSubmitting}
            >
              Actualizar
            </LoadingButton>
          </Item>
          <Item sx={{ width: isDesktop ? 375 : "100%" }}>
            <Button
              fullWidth
              variant="outlined"
              size="medium"
              component={RouterLink}
              to="/dashboard/agentes"
              disabled={formikAccess.isSubmitting?true:false}
            >
              Voltar
            </Button>
          </Item>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

UserAccessForm.propTypes = {
  getSelectedProfileById: PropTypes.func.isRequired,
  updateUserById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getSelectedProfileById,updateUserById})(
  UserAccessForm
);
