import React from "react";
import Page from "./../components/Page";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link as RouterLink } from "react-router-dom";
import { Card, Container, Stack, Typography } from "@mui/material";
import SettingsForm from "../sections/@dashboard/settings/SettingsForm";
import { styled } from "@mui/material/styles";
import Iconify from "./../components/Iconify";

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 750,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "flex-start",
  flexDirection: "column",
  padding: theme.spacing(5, 0),
}));

const Settings = () => {
  return (
    <Page title="Definições">
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
              sx={{
                display: "flex",
                alignItems: "center",
                textDecorationLine: "none",
              }}
              color="inherit"
              component={RouterLink}
              to="/dashboard/app"
            >
              <Iconify icon={"eva:pie-chart-2-fill"} width={22} height={22} />
              Dashboard
            </Typography>

            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              color="text.primary"
            >
              Definições
            </Typography>
          </Breadcrumbs>
        </Stack>
        <Card>
          <Container maxWidth="md">
            <ContentStyle>
              <SettingsForm />
            </ContentStyle>
          </Container>
        </Card>
      </Container>
    </Page>
  );
};

export default Settings;
