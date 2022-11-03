import React from "react";
import Page from "./../components/Page";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Card, Container, Stack, Typography } from "@mui/material";
import { UserAccessForm } from "../sections/@dashboard/user";
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

const UserAccess = () => {
  return (
    <Page title="Acesso">
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
              to="/dashboard/agentes"
            >
              <Iconify icon={"eva:people-fill"} width={22} height={22} />
              Agente Comercial
            </Typography>
            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              color="text.primary"
            >
              Acesso
            </Typography>
          </Breadcrumbs>
        </Stack>
        <Card>
          <Container maxWidth="md">
            <ContentStyle>
              <UserAccessForm />
            </ContentStyle>
          </Container>
        </Card>
      </Container>
    </Page>
  );
};

export default UserAccess;
