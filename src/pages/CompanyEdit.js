import React from "react";
import Page from "./../components/Page";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Card, Container, Stack, Typography } from "@mui/material";
import CompanyEditForm from "../sections/@dashboard/company/CompanyEditForm";
import { styled } from "@mui/material/styles";
import Iconify from "./../components/Iconify";
import { Link as RouterLink } from "react-router-dom";

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 750,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "flex-start",
  flexDirection: "column",
  padding: theme.spacing(5, 0),
}));

const CompanyEdit = () => {
  return (
    <Page title="Editar Parceiro">
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
              to="/dashboard/parceiros"
            >
              <Iconify icon={"bxs:business"} width={22} height={22} />
              Parceiros
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
              <CompanyEditForm />
            </ContentStyle>
          </Container>
        </Card>
      </Container>
    </Page>
  );
};

export default CompanyEdit;
