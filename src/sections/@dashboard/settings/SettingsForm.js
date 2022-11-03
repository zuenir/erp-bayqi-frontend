import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
// material
import {
  Badge,
  Stack,
  TextField,
  Typography,
  Button,
  IconButton,
  InputAdornment,
  Avatar,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";

// redux
import { getProfileRole } from "./../../../data/dataProfile";
import { updateUserLogedById } from "../../../redux/auth/authAction";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../../redux/profile/profileAction";
import useResponsive from "../../../hooks/useResponsive";
import Iconify from "../../../components/Iconify";
import { sentenceCase } from "change-case";
import { toast } from "react-toastify";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const SettingsForm = ({
  getCurrentProfile,
  updateUserLogedById,
  profile: { profile, loading },
  auth: { roles, user },
}) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((show) => !show);
  };

  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState(
    loading || !user?.avatar
      ? "/static/mock-images/avatars/avatar_default.jpg"
      : profile?.user.avatar
  );

  const isDesktop = useResponsive("up", "lg");

  const [formData, setFormData] = useState({
    avatar: previewSource,
    id: loading || !user?._id ? "" : user?._id,
    status: loading || !user?.status ? "" : sentenceCase(user?.status),
    role: loading || !roles ? "" : getProfileRole(user?.roles).label,
    email: loading || !profile?.user.email ? "" : profile?.user.email,
    myPassword: "",
    password: "",
  });

  useEffect(() => {
    getCurrentProfile()
      .finally()
      .then((result) => {
        setFormData({
          id: result?.payload.user._id,
          status: sentenceCase(result?.payload.user.status),
          role: getProfileRole(result?.payload.user.roles).label,
          email: result?.payload.user.email,
          myPassword: "",
          password: "",
        });
      });
  }, [getCurrentProfile, roles]);

  const handleFileInputChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    previewFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      setFormData({
        id: user._id,
        avatar: reader?.result,
        status: sentenceCase(user.status),
        email: profile?.user.email,
        role: getProfileRole(user.roles).label,
        myPassword: formik.values.myPassword,
        password: formik.values.password,
      });
    };
  };

  const formik = useFormik({
    initialValues: formData,
    enableReinitialize: true,
    onSubmit: async (values, actions) => {
      try {
        let data = {
          user_id: formData.id,
          value: {
            status: formData.status,
            avatar: formData.avatar,
            email: formData.email,
            roles: roles,
            password: values.password,
            myPassword: values.myPassword,
          },
        };

        await updateUserLogedById(data)
          .finally()
          .then(
            (result) => {
              const { status, email } = result.payload;
              if (status === 400) {
                actions.setFieldError("myPassword", "Invalid Credentials");
              }

              if (email) {
                if (values.password !== "" && values.myPassword !== "") {
                  toast.warn("A sua palavra-passe foi alterada, será redirecionado(a) para a pagina de login", {
                    delay: 2000,
                  });
                  localStorage.setItem("bayqi_erp_loginlogout", "sair");
                  formik.setFieldValue("password", "");
                  formik.setFieldValue("myPassword", "");
                  setTimeout(() => {
                    navigate("/dashboard/app", { replace: true });
                  }, 5000);
                }
              }
            },
            (error) => {
              console.log("error:", error);
            }
          );

        actions.setSubmitting(false);
      } catch (error) {
        console.error("Failed to load data", error);
      }
    },
  });

  const { errors, touched, isSubmitting, handleSubmit } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
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
          sx={{ mb: 2 }}
        >
          <Item sx={{ width: isDesktop ? 375 : "100%" }}>
            <Typography variant="h6" component="h6" sx={{ mb: 1 }}>
              Foto Perfil
            </Typography>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input
                    hidden
                    accept="image/*"
                    id="avatar"
                    type="file"
                    name="avatar"
                    onChange={(e) => {
                      formik.handleChange(e);
                      handleFileInputChange(e);
                    }}
                    onBlur={formik.handleBlur}
                    value={fileInputState}
                  />
                  <PhotoCamera />
                </IconButton>
              }
            >
              <Avatar
                alt="userImage"
                src={previewSource}
                sx={{ width: 100, height: 100 }}
              />
            </Badge>
          </Item>
          <Item sx={{ width: isDesktop ? 375 : "100%" }}>
            <TextField
              fullWidth
              type="text"
              name="status"
              label="Status"
              disabled
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.status}
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
              type="text"
              name="role"
              label="Perfil"
              disabled
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.role}
            />
          </Item>
          <Item sx={{ width: isDesktop ? 375 : "100%" }}>
            <TextField
              fullWidth
              type="text"
              name="email"
              label="Email"
              disabled
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
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
              name="myPassword"
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              label="Palavra-Passe Actual"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.myPassword}
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
              error={Boolean(touched.myPassword && errors.myPassword)}
              helperText={touched.myPassword && errors.myPassword}
            />
          </Item>
          <Item sx={{ width: isDesktop ? 375 : "100%" }}>
            <TextField
              fullWidth
              name="password"
              autoComplete="current-password"
              type={showConfirmPassword ? "text" : "password"}
              label="Palavra-Passe Nova"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowConfirmPassword} edge="end">
                      <Iconify
                        icon={
                          showConfirmPassword
                            ? "eva:eye-fill"
                            : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
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
              onClick={handleSubmit}
              variant="contained"
              loading={isSubmitting}
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
              disabled={isSubmitting?true:false}
            >
              Voltar
            </Button>
          </Item>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

SettingsForm.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  updateUserLogedById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  updateUserLogedById,
})(SettingsForm);
