import React from "react";
// material
import { Container, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
// components
import Page from "../components/Page";

// ----------------------------------------------------------------------

import { Card } from "@mui/material";
import MyReportForm from "./../sections/@dashboard/report/MyReportForm";

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 750,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "flex-start",
  flexDirection: "column",
  padding: theme.spacing(5, 0),
}));

const MyReport = () => {
  return (
    <Page title="Dashboard: Meus Relatórios">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Meus Relatórios
          </Typography>
        </Stack>

        <Card>
          <Container maxWidth="md">
            <ContentStyle>
              <MyReportForm />
            </ContentStyle>
          </Container>
        </Card>
      </Container>
    </Page>
  );
};

export default MyReport;
