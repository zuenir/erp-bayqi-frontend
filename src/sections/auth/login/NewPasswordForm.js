import * as Yup from "yup";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
// material
import {
  Button,
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
import { ChangeForgotPasswordUserById } from "../../../redux/auth/authAction";
import { getCurrentProfile } from "./../../../redux/profile/profileAction";

import { toast } from "react-toastify";
// ----------------------------------------------------------------------

const NewPasswordForm = ({ ChangeForgotPasswordUserById, auth: { roles } }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (roles) {
      return navigate("/dashboard/app");
    }
  }, [roles, navigate]);

  let { user_id } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);

  const LoginSchema = Yup.object().shape({
    passwordNew: Yup.string().required("Palavra-passe é obrigatório"),
    password: Yup.string().required("Confirmar Palavra-passe é obrigatório"),
  });

  const formik = useFormik({
    initialValues: {
      passwordNew: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async () => {
      try {
        if (formik.values.password !== formik.values.passwordNew) {
          toast.error("A Palavra-passe deve ser a mesma");
          formik.setFieldError("passwordNew", ".");
          formik.setFieldError("password", ".");
        } else {
          let formData = {
            _id: user_id,
            password: formik.values.password,
          };

          await ChangeForgotPasswordUserById(formData).then((result) => {
            const { msg } = result.payload;
            if (msg === "OK") navigate("/", { replace: true });
          });
        }
      } catch (error) {
        console.error("Failed to load data", error);
      }
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleShowPasswordNew = () => {
    setShowPasswordNew((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPasswordNew ? "text" : "password"}
            label="Palavra-passe"
            {...getFieldProps("passwordNew")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPasswordNew} edge="end">
                    <Iconify
                      icon={
                        showPasswordNew ? "eva:eye-fill" : "eva:eye-off-fill"
                      }
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.passwordNew && errors.passwordNew)}
            helperText={touched.passwordNew && errors.passwordNew}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Confirmar Palavra-passe"
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
            Confirmar
          </LoadingButton>
        </Stack>

        <Stack alignItems="center" justifyContent="center">
          <Button
            fullWidth
            variant="outlined"
            size="large"
            component={RouterLink}
            to="/"
          >
            Cancelar
          </Button>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

NewPasswordForm.propTypes = {
  ChangeForgotPasswordUserById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  ChangeForgotPasswordUserById,
  getCurrentProfile,
})(NewPasswordForm);
