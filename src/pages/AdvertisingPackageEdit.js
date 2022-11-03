import React from "react";
import Page from "../components/Page";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Card, Container, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Iconify from "../components/Iconify";
import { Link as RouterLink } from "react-router-dom";
import AdvertisingEditForm from "../sections/@dashboard/advertisingPackage/AdvertisingEditForm";

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 750,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "flex-start",
  flexDirection: "column",
  padding: theme.spacing(5, 0),
}));

const AdvertisingPackageEdit = () => {
  return (
    <Page title="Editar Pacote Publicitário">
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
              Editar
            </Typography>
          </Breadcrumbs>
        </Stack>
        <Card>
          <Container maxWidth="md">
            <ContentStyle>
              <AdvertisingEditForm />
            </ContentStyle>
          </Container>
        </Card>
      </Container>
    </Page>
  );
};

export default AdvertisingPackageEdit;
