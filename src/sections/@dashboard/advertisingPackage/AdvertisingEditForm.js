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
  Typography,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";

// redux
import { connect } from "react-redux";
import useResponsive from "./../../../hooks/useResponsive";
import {
  getSelectedAdvertisingPackageById,
  updateAdvertisingPackageById,
} from "../../../redux/advertisingPackage/advertisingPackageAction";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const AdvertisingEditForm = ({
  updateAdvertisingPackageById,
  getSelectedAdvertisingPackageById,
  advertisingPackage: { advertisingPackage, loading },
  auth: { roles },
}) => {
  let { advertisingPackage_id } = useParams();
  const isDesktop = useResponsive("up", "lg");

  const [formData, setFormData] = useState({
    name: loading || !advertisingPackage?.name ? "" : advertisingPackage?.name,
    price:
      loading || !advertisingPackage?.price ? "" : advertisingPackage?.price,
    period:
      loading || !advertisingPackage?.period ? "" : advertisingPackage?.period,
    duration:
      loading || !advertisingPackage?.duration
        ? ""
        : advertisingPackage?.duration,
    details:
      loading || !advertisingPackage?.details
        ? ""
        : advertisingPackage?.details,
  });

  useEffect(() => {
    getSelectedAdvertisingPackageById(advertisingPackage_id).then((result) => {
      setFormData({
        name: result?.payload.name,
        price: result?.payload.price,
        period: result?.payload.period,
        duration: result?.payload.duration,
        details: result?.payload.details,
      });
    });
  }, [getSelectedAdvertisingPackageById, advertisingPackage_id]);

  const AddAdvertisingSchema = Yup.object().shape({
    name: Yup.string().required("Parceiro é obrigatório"),
    price: Yup.string().required("Actividade é obrigatório"),
    period: Yup.string().required("Período é obrigatório"),
    duration: Yup.string().required("Categoria é obrigatório"),
    details: Yup.string().required("Responsável é obrigatório"),
  });

  return (
    <Formik
      initialValues={formData}
      enableReinitialize
      validationSchema={AddAdvertisingSchema}
      onSubmit={async (values, actions) => {
        try {
          let data = {
            values,
            advertisingPackage_id,
          };
          await updateAdvertisingPackageById(data);
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
                name="name"
                label="Pacote Publicitário"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.name}
                error={Boolean(props.touched.name && props.errors.name)}
                helperText={props.touched.name && props.errors.name}
              />
            </Item>
            <Item sx={{ width: isDesktop ? 375 : "100%" }}>
              <TextField
                fullWidth
                type="text"
                name="price"
                label="Preço"
                placeholder="0,00 Kz"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.price}
                error={Boolean(props.touched.price && props.errors.price)}
                helperText={props.touched.price && props.errors.price}
              />
            </Item>
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Item sx={{ width: isDesktop ? 375 : "100%" }}>
              <FormControl fullWidth>
                <InputLabel id="period">Período</InputLabel>
                <Select
                  labelId="period"
                  name="period"
                  label="Período"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.period}
                  error={Boolean(props.touched.period && props.errors.period)}
                  helperText={props.touched.period && props.errors.period}
                >
                  <MenuItem value={"Diário"}>Diário</MenuItem>
                  <MenuItem value={"Mensal"}>Mensal</MenuItem>
                </Select>
              </FormControl>
            </Item>
            <Item sx={{ width: isDesktop ? 375 : "100%" }}>
              <TextField
                fullWidth
                type="text"
                name="duration"
                label="Duração"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.duration}
                error={Boolean(props.touched.duration && props.errors.duration)}
                helperText={props.touched.duration && props.errors.duration}
              />
            </Item>
          </Stack>

          <Stack sx={{ padding: 1 }}>
            <TextField
              fullWidth
              multiline
              rows={5}
              id="note"
              name="details"
              label="Detalhes"
              placeholder="Deixe uma nota aqui..."
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.details}
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
                to="/dashboard/publicidade"
                disabled={props.isSubmitting ? true : false}
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

AdvertisingEditForm.propTypes = {
  getSelectedAdvertisingPackageById: PropTypes.func.isRequired,
  updateAdvertisingPackageById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  advertisingPackage: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  advertisingPackage: state.advertisingPackage,
});

export default connect(mapStateToProps, {
  updateAdvertisingPackageById,
  getSelectedAdvertisingPackageById,
})(AdvertisingEditForm);
