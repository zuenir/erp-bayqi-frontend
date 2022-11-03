import { useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
// ----------------------------------------------------------------------
import { useDispatch, connect } from 'react-redux';
import { auth_actions } from '../../redux/auth/authSlice';
import { profile_actions } from '../../redux/profile/profileSlice';
import PropTypes from "prop-types";
import Iconify from './../../components/Iconify';

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:pie-chart-2-fill',
    linkTo: '/dashboard/app',
  },
  {
    label: 'Perfil',
    icon: 'eva:person-fill',
    linkTo: '/dashboard/perfil',
  },
  {
    label: 'Definições',
    icon: 'eva:settings-2-fill',
    linkTo: '/dashboard/definicoes',
  },
];

// ----------------------------------------------------------------------

const AccountPopover = ({profile:{profile}}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const anchorRef = useRef(null);

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const logout = async() => {
    await dispatch(auth_actions());
    await dispatch(profile_actions());
    navigate('/',{replace:true});
    setOpen(null);
  }

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={profile?.user.avatar} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {profile?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {profile?.user.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem 
              key={option.label} 
              to={option.linkTo} 
              component={RouterLink} 
              onClick={handleClose}>
                <Iconify icon={option.icon} sx={{ width: 16, height: 16}}/>
                {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={logout} sx={{ m: 1 }}>
          <Iconify icon={'ri:logout-box-r-fill'} sx={{ width: 16, height: 16}}/>
          Sair
        </MenuItem>
      </MenuPopover>
    </>
  );
}

AccountPopover.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(AccountPopover)
