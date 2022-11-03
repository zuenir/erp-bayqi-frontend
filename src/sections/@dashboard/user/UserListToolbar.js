import PropTypes from "prop-types";
// material
import { styled } from "@mui/material/styles";
import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
// component
import Iconify from "../../../components/Iconify";
import CompanySort from "../company/CompanySort";
import { getAllActivityData,getAllProfileRoles,getAllStoreStatusData } from "../../../data/dataProfile";

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": { width: 320, boxShadow: theme.customShadows.z8 },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onDelete: PropTypes.func,
  handleChange: PropTypes.func,
};

export default function UserListToolbar({
  numSelected,
  filterName,
  onFilterName,
  onDelete,
  handleChange,
  form,
}) {
  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: "primary.main",
          bgcolor: "primary.lighter",
        }),
      }}
    >
      {form === "user" ? (
        <>
          
        </>
      ) : (
        <>
          {numSelected > 0 ? (
            <Typography component="div" variant="subtitle1">
              {numSelected} Selecionado
            </Typography>
          ) : (
            <SearchStyle
              value={filterName}
              onChange={onFilterName}
              placeholder="Pesquisar..."
              startAdornment={
                <InputAdornment position="start">
                  <Iconify
                    icon="eva:search-fill"
                    sx={{ color: "text.disabled", width: 20, height: 20 }}
                  />
                </InputAdornment>
              }
            />
          )}
        </>
      )}

      {form === "clockingUser" ? (
        <></>
      ) : (
        <>
          {numSelected > 0 && form !== "clocking" ? (
            <Tooltip title="Delete">
              <IconButton onClick={onDelete}>
                <Iconify icon="eva:trash-2-fill" />
              </IconButton>
            </Tooltip>
          ) : (<></>)}
        </>
      )}
      { (form === "company" || form ==="userAgent") && numSelected === 0 ?(<CompanySort form={form} SORT_BY_OPTIONS={form ==="company" ? getAllActivityData() : getAllProfileRoles()}/>): (<></>)}
      { form === "Parceiro Publicidade"  && (<CompanySort form={form} SORT_BY_OPTIONS={getAllStoreStatusData()}/>)}
    </RootStyle>
  );
}
