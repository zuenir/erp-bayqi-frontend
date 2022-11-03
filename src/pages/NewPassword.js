// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';

// components
import Page from '../components/Page';
// sections
import { NewPasswordForm } from '../sections/auth/login';

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

export default function NewPassword() {

  return (
    <Page title="Nova Palavra-passe">
      <RootStyle>
        <HeaderStyle/>
        <Container maxWidth="md">
          <ContentStyle>
              <Typography variant="h4" gutterBottom>
                Nova Palavra-passe
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 5 }}>Insira seus dados abaixo.</Typography>
              <NewPasswordForm />            
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
