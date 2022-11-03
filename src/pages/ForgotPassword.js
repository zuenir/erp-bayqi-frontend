// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';

// components
import Page from '../components/Page';
// sections
import { ForgotPasswordForm } from '../sections/auth/login';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function ForgotPassword() {

  return (
    <Page title="Esqueceu Palarvra-Passe">
      <RootStyle>
        <Container maxWidth="md">
          <ContentStyle>
              <Typography variant="h4" gutterBottom>
                Redefinir Palavra-Passe
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 5 }}>Insira seus dados abaixo.</Typography>
              <ForgotPasswordForm />            
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
