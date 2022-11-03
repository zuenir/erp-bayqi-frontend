import { useState } from "react";
// material
import { Menu, Button, MenuItem, Typography } from "@mui/material";
// component
import Iconify from "../../../components/Iconify";
import { Tooltip, IconButton } from "@mui/material";
import { getAllCompanyByFilter } from "../../../redux/company/companyAction";
import { getAllUsersProfilesByFilter } from "../../../redux/profile/profileAction";
import { getAllAdvertisingCompanyByFilter } from "../../../redux/advertising/advertisingAction";
import { useDispatch } from "react-redux";
import { getProfileLabelRole } from "../../../data/dataProfile";
// ----------------------------------------------------------------------

export default function CompanySort({ form, SORT_BY_OPTIONS }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState("Todos");

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleFilter = async (label) => {
    try {
      if (form === "company") {
        await dispatch(getAllCompanyByFilter(label));
      } else  if (form === 'userAgent'){
        await dispatch(
          getAllUsersProfilesByFilter(
            label === "Todos" ? "Todos" : getProfileLabelRole(label).value
          )
        );
      }else if(form === 'Parceiro Publicidade'){
        await dispatch(getAllAdvertisingCompanyByFilter(label));
      }
    } catch (error) {console.log(error)}
  };

  return (
    <>
      <Button
        color="inherit"
        disableRipple
        onClick={handleOpen}
        endIcon={
          <Iconify
            icon={open ? "eva:chevron-up-fill" : "eva:chevron-down-fill"}
          />
        }
      >
        <Tooltip title="Filter list">
          <IconButton>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>{" "}
        Filtar Por:&nbsp;
        <Typography
          component="span"
          variant="subtitle2"
          sx={{ color: "text.secondary" }}
        >
          {selectedLabel}
        </Typography>
      </Button>
      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          key="Todos"
          onClick={() => {
            handleClose();
            setSelectedLabel("Todos");
            handleFilter("Todos");
          }}
          sx={{ typography: "body2" }}
        >
          Todos
        </MenuItem>
        {SORT_BY_OPTIONS.map((option, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              handleClose();
              setSelectedLabel(option.label);
              handleFilter(option.label);
            }}
            sx={{ typography: "body2" }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
