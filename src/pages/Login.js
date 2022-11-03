// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';

// components
import Page from '../components/Page';
// sections
import { LoginForm } from '../sections/auth/login';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
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

export default function Login() {

  return (
    <Page title="Login">
      <RootStyle>
        <HeaderStyle/>
        <Container maxWidth="md">
          <ContentStyle>
              <Typography variant="h4" gutterBottom>
                Entrar na BayQi Erp
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 5 }}>Insira seus dados abaixo.</Typography>
              <LoginForm />            
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
