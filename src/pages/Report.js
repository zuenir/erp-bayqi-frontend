import React, { useState } from "react";
// material
import { Button, Container, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
// components
import Page from "../components/Page";

// ----------------------------------------------------------------------

import { Card } from "@mui/material";
import ReportForm from "./../sections/@dashboard/report/ReportForm";
import Iconify from "../components/Iconify";
import { generatePassword } from "../utils/generatePassword";

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 750,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "flex-start",
  flexDirection: "column",
  padding: theme.spacing(5, 0),
}));

const Report = () => {
  const[idReport, setIdReport] = useState("");

  const handleReport = () => {
    setIdReport(generatePassword(10,false,true,false));
  }

  return (
    <Page title="Dashboard: Relatório">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Relatório
          </Typography>
          <Button
            variant="contained"
            onClick={handleReport}
            startIcon={<Iconify icon="line-md:document-report-twotone" />}
          >
            Novo Relatório
          </Button>
        </Stack>

        <Card>
          <Container maxWidth="md">
            <ContentStyle>
              <ReportForm idReport={idReport}/>
            </ContentStyle>
          </Container>
        </Card>
      </Container>
    </Page>
  );
};

export default Report;
