import * as Yup from "yup";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
// material
import {
  Link,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// component
import Iconify from "../../../components/Iconify";

//redux
import { connect } from "react-redux";
import { loadUser, getLogin } from "../../../redux/auth/authAction";
import { getCurrentProfile } from "./../../../redux/profile/profileAction";

import { toast } from "react-toastify";
// ----------------------------------------------------------------------

const LoginForm = ({
  getLogin,
  loadUser,
  getCurrentProfile,
  auth: { roles },
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (roles) {
      return navigate("/dashboard/app");
    }
  }, [roles, navigate]);

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email deve ser um endereço de e-mail válido")
      .required("Email é obrigatório"),
    password: Yup.string().required("Palavra-passe é obrigatório"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: LoginSchema,
    onSubmit: async () => {
      try {
        localStorage.setItem("bayqi_erp_loginlogout", "entrar");
        await getLogin(formik.values);
        await loadUser();
        await getCurrentProfile().then((result) => {
          if(result.payload.name){
            toast.success("Login efectuado com sucesso");
            navigate("/dashboard/app", { replace: true });
          }
        });
      } catch (error) {
        console.error("Failed to load data", error);
      }
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Palavra-passe"
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack alignItems="center" justifyContent="center" sx={{ my: 2 }}>
          <LoadingButton
            fullWidth
            size="large"
            onClick={handleSubmit}
            variant="contained"
            loading={isSubmitting}
          >
            Entrar
          </LoadingButton>
        </Stack>

        <Stack alignItems="center" justifyContent="center">
          <Link
            component={RouterLink}
            variant="subtitle2"
            to="/redefinirpasse"
            underline="hover"
          >
            Esqueceu Palavra-Passe
          </Link>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

LoginForm.propTypes = {
  loadUser: PropTypes.func.isRequired,
  getLogin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  loadUser,
  getLogin,
  getCurrentProfile,
})(LoginForm);
