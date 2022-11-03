import * as Yup from "yup";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
// material
import { Stack, TextField, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

//redux
import { connect } from "react-redux";
import { sendEmail } from "../../../redux/service/serviceAction";
// ----------------------------------------------------------------------

const ForgotPasswordForm = ({ sendEmail, auth: { roles } }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (roles) {
      return navigate("/dashboard/app");
    }
  }, [roles, navigate]);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email deve ser um endereço de e-mail válido")
      .required("Email é obrigatório"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async () => {
      try {
        let formData = {
          email: formik.values.email,
        };
        await sendEmail(formData)
          .then((result) => {
            const { msg } = result.payload;
            if (msg === "OK") navigate("/", { replace: true });
          })
      } catch (error) {
        console.error("Failed to load data", error);
      }
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

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
        </Stack>

        <Stack paddingTop={3} paddingBottom={3}>
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

        <Button
          fullWidth
          variant="outlined"
          size="large"
          component={RouterLink}
          to="/"
        >
          Cancelar
        </Button>
      </Form>
    </FormikProvider>
  );
};

ForgotPasswordForm.propTypes = {
  sendEmail: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { sendEmail })(ForgotPasswordForm);
