import React from "react";
import Page from "../components/Page";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Card, Container, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Iconify from "../components/Iconify";
import { Link as RouterLink } from "react-router-dom";
import AdvertisingAddForm from "../sections/@dashboard/advertisingPackage/AdvertisingAddForm";


const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 750,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "flex-start",
  flexDirection: "column",
  padding: theme.spacing(5, 0),
}));

const AdvertisingPackageAdd = () => {
  return (
    <Page title="Cadastrar Pacote Publicitário">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Typography
              underline="hover"
              sx={{ display: "flex", alignItems: "center", textDecorationLine: "none" }}
              color="inherit"
              component={RouterLink}
              to="/dashboard/publicidade"
            >
              <Iconify icon={"icons8:advertising"} width={22} height={22} />
              Pacote Publicitário
            </Typography>
            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              color="text.primary"
            >
              Cadastro
            </Typography>
          </Breadcrumbs>
        </Stack>
        <Card>
          <Container maxWidth="md">
            <ContentStyle>
              <AdvertisingAddForm />
            </ContentStyle>
          </Container>
        </Card>
      </Container>
    </Page>
  );
};

export default AdvertisingPackageAdd;
