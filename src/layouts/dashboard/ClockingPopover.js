import { useRef, useState } from "react";
// material
import { alpha } from "@mui/material/styles";
import {
  Box,
  MenuItem,
  Stack,
  IconButton,
  Divider,
  Typography,
} from "@mui/material";
// components
import MenuPopover from "../../components/MenuPopover";
import Iconify from "./../../components/Iconify";
import { connect, useDispatch } from "react-redux";
import {
  createClockingsByProfileId,
  updateClockingsByProfileId,
  getAllClockingsByProfileId,
  getAllClockings
} from "./../../redux/clocking/clockingAction";
import moment from 'moment/dist/moment';
import 'moment/dist/locale/pt-br';
import PropTypes from "prop-types";
// ----------------------------------------------------------------------

const ClockingPopover = ({ auth: {roles}, profile: { profile } }) => {
  const dispatch = useDispatch();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckIn = () => {
    try {
      let formData = {
        profile_id: profile._id,
        values: {
          checkin: moment().format("LLLL"),
          checkinDate: moment().format("DD/MM/YYYY"),
          locationIn: localStorage.getItem("bayqi_erp_location"),
          checkout: "aguardando...",
          locationOut: "aguardando...",
          checkoutDate: "aguardando..."
        },
      };

     dispatch(createClockingsByProfileId(formData)).then((result) => {
        if(roles !== 2001) {
          dispatch(getAllClockings());
        }else {
          dispatch(getAllClockingsByProfileId(profile._id));
        }
      });
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
  };

  const handleCheckOut = () => {
    try {

      let formData = {
        profile_id: profile._id,
        values: {
          checkin: moment().format("DD/MM/YYYY"),
          checkout: moment().format("LLLL"),
          locationOut: localStorage.getItem("bayqi_erp_location"),
          checkoutDate: moment().format("DD/MM/YYYY")
        },
      };

      dispatch(updateClockingsByProfileId(formData)).then((result) => {
        if(roles !== 2001) {
          dispatch(getAllClockings());
        }else {
          dispatch(getAllClockingsByProfileId(profile._id));
        }
      });
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.focusOpacity
              ),
          }),
        }}
      >
        <IconButton>
          <Iconify icon="icon-park-outline:check-in" />
        </IconButton>
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{
          mt: 1.5,
          ml: 0.75,
          width: 180,
          "& .MuiMenuItem-root": {
            px: 1,
            typography: "body2",
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary" }}
            mt={2}
            noWrap
          >
            {"Sistema de Ponto"}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />
        <Stack spacing={0.75}>
          <MenuItem onClick={handleCheckIn}>Check-In</MenuItem>

          <Divider sx={{ borderStyle: "dashed" }} />

          <MenuItem onClick={handleCheckOut}>Check-Out</MenuItem>
        </Stack>
      </MenuPopover>
    </>
  );
};

ClockingPopover.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps)(ClockingPopover);
