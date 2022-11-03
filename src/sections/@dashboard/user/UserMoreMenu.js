import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
  Container,
  Box,
} from "@mui/material";

// component
import Iconify from "../../../components/Iconify";

//UserDialog
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";

import {
  getCurrentCompanyById,
  deleteCompanyById,
  deleteCompanyByProfileId
} from "../../../redux/company/companyAction";
import {
  getSelectedProfileById,
  deleteProfileById,
} from "./../../../redux/profile/profileAction";
import {
  DeleteCompanyCategoryById,
  EditCompanyCategoryById,
} from "../../../redux/companyCategory/categoryAction";
import {
  getSelectedAdvertisingPackageById,
  deleteAdvertisingPackageById,
} from "../../../redux/advertisingPackage/advertisingPackageAction";
import {
  getAllAdvertisingCompany,
  getAllAdvertisingCompanyById,
  publishAdvertisingCompanyById,
  publishAdvertisingCompanyChecking,
  stopAdvertisingCompanyById,
  deleteverifyAdvertisingCompany,
  deleteAdvertisingCompany,
  deleteAdvertisingCompanyById,
} from "../../../redux/advertising/advertisingAction";
import { deleteClockingsByProfileId } from './../../../redux/clocking/clockingAction';
import { Formik } from "formik";
import { toast } from "react-toastify";
import Label from "../../../components/Label";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { fDateTime } from "../../../utils/formatTime";


// ----------------------------------------------------------------------

const UserMoreMenu = ({
  itemForm,
  itemId,
  itemUrl,
  ItemTitle,
  ItemOption,
  ItemOptionAction,
  getCurrentCompanyById,
  publishAdvertisingCompanyById,
  publishAdvertisingCompanyChecking,
  getAllAdvertisingCompany,
  getAllAdvertisingCompanyById,
  getSelectedProfileById,
  deleteCompanyById,
  deleteProfileById,
  stopAdvertisingCompanyById,
  deleteverifyAdvertisingCompany,
  deleteCompanyByProfileId,
  deleteAdvertisingCompany,
  deleteAdvertisingCompanyById,
  DeleteCompanyCategoryById,
  deleteAdvertisingPackageById,
  deleteClockingsByProfileId,
  EditCompanyCategoryById,
  getSelectedAdvertisingPackageById,
  company: { company },
  advertising: { advertisings },
  advertisingPackage: { advertisingPackage, advertisingPackages },
}) => {
  const navigate = useNavigate();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [open_cp, setOpen_cp] = useState(false);
  const [open_ct, setOpen_ct] = useState(false);
  const [open_ad, setOpen_ad] = useState(false);
  const [loading_ct, setLoading_ct] = useState(false);

  let { company_id } = useParams();

  const handleStatus = (status) => {
    return status === "Aberto"
      ? "warning"
      : status === "Cancelado"
      ? "error"
      : status === "Fechado"
      ? "success"
      : status;
  };

  const handleStore = (store) => {
    return store === "Pendente"
      ? "warning"
      : store === "Removido" || store === "N/Disponível"
      ? "error"
      : store === "Publicado"
      ? "success"
      : store;
  };

  const handleClose_ct = () => {
    setOpen_ct(loading_ct ? true : false);
  };

  const handleClose = () => {
    setOpen(loading ? true : false);
  };

  const handleDeleteOnClick = () => {
    setIsOpen(false);
    setOpen(true);
  };

  function addDays(date, days) {
    const copy = new Date(Number(date));
    copy.setDate(date.getDate() + days);
    return copy;
  }

  const handlePublishOnClick = async () => {
    try {
      setIsOpen(false);
      const result = advertisings.filter((adv) => adv._id === itemId._id);
      const dat = new Date();
      const startDate = fDateTime(dat);
      const day =
        result[0].advertising[0].period === "Diário"
          ? parseInt(result[0].advertising[0].duration)
          : parseInt(result[0].advertising[0].duration * 30);
      const endDate = fDateTime(addDays(dat, day));
      var formData = {
        company_id: itemId.company,
        advertising_id: itemId._id,
        startDate,
        endDate,
      };
      await publishAdvertisingCompanyById(formData);
      toast.success("Publicidade Publicada com sucesso");
    } catch (error) {
      console.error("Failed to load data", error);
    }
  };

  const handleStopOnClick = async () => {
    try {
      setIsOpen(false);
      await stopAdvertisingCompanyById(itemId._id);
      toast.success("Publicidade foi suspensa");
    } catch (error) {
      console.error("Failed to load data", error);
    }
  }

  const handleEditOnClick = async () => {
    setIsOpen(false);

    try {
      if (itemForm === "Parceiro" || itemForm === "ParceiroUser") {
        await getCurrentCompanyById(itemId).then((result) => {
          navigate(itemUrl);
        });
      } else if (itemForm === "Agente") {
        await getSelectedProfileById(itemId).then((result) => {
          navigate(itemUrl);
        });
      } else if (itemForm === "Categoria") {
        setOpen_ct(true);
      } else if (itemForm === "Pacote Publicitário") {
        await getSelectedAdvertisingPackageById(itemId).then((result) => {
          navigate(itemUrl);
        });
      } else if (itemForm === "Parceiro Publicidade") {
        await getCurrentCompanyById(itemId.company).then(
          async (resultCompany) => {
            if (resultCompany.payload.id) {
              await getAllAdvertisingCompanyById(itemId.company).then(
                (resultAdvertising) => {
                  if (resultAdvertising.payload.length !== 0) {
                    navigate(itemUrl);
                  }
                }
              );
            }
          }
        );
      }
    } catch (error) {
      console.error("Failed to load data", error);
    }
  };

  const handleAdvertisingOnClick = async () => {
    setIsOpen(false);
    try {
      await getCurrentCompanyById(itemId).then(async (resultCompany) => {
        if (resultCompany.payload.id) {
          await getAllAdvertisingCompanyById(itemId).then(
            (resultAdvertising) => {
              navigate(`/dashboard/parceiros/publicidade/${itemId}`);
            }
          );
        }
      });
    } catch (error) {
      console.error("Failed to load data", error);
    }
  };

  const handlePreviewOnClick = async () => {
    try {
      if (itemForm === "Parceiro" || itemForm === "ParceiroUser") {
       getCurrentCompanyById(itemId).then((result) => {
          if (result.payload[0]._id) {
            setOpen_cp(true);
            setIsOpen(false);
          }
        });
      } else if (itemForm === "Pacote Publicitário") {
        getSelectedAdvertisingPackageById(itemId).then((result) => {
          if (result.payload._id) {
            setOpen_ad(true);
            setIsOpen(false);
          }
        });
      }
    } catch (error) {
      console.error("Failed to load data", error);
    }
  };

  const handleConfirmar = async () => {
    setLoading(true);

    try {
      if (itemForm === "Parceiro") {
        await deleteCompanyById(itemId).then((result) => {
          if (result.payload.length !== null)
            toast.success("Parceiro Removido com sucesso");
        });
        setOpen(false);
        setLoading(false);
      }else if(itemForm === "ParceiroUser"){
        /*await deleteCompanyByProfileId().then((result) => {
          if (result.payload.length !== null)
          toast.success("Parceiro Removido com sucesso");
        })*/
      }else if (itemForm === "Agente") {
        await deleteProfileById(itemId).then((result) => {
          if (result.payload.length !== null)
            toast.success("Agente Removido com sucesso");
        });
        setOpen(false);
        setLoading(false);
      } else if (itemForm === "Categoria") {
        await DeleteCompanyCategoryById(itemId).then((result) => {
          if (result.payload.length !== null)
            toast.success("Categoria Removida com sucesso");
        });
        setOpen(false);
        setLoading(false);
      } else if (itemForm === "Pacote Publicitário") {
        await deleteAdvertisingPackageById(itemId).then((result) => {
          if (result.payload.length !== null)
            toast.success("Pacote Publicitário Removido com sucesso");
        });
        setOpen(false);
        setLoading(false);
      } else if (itemForm === "Publicidade") {
        await deleteverifyAdvertisingCompany(itemId).then(async (result) => {
          const { msg } = result.payload;
          var formData = {
            company_id: company_id,
            advertising_id: itemId,
          };
          if (msg === "no") {
            await deleteAdvertisingCompanyById(formData);
            toast.success("Pacote Publicitário Removido com sucesso");
          }
        });
        setOpen(false);
        setLoading(false);
      } else if (itemForm === "Parceiro Publicidade") {
        //await publishAdvertisingCompanyChecking();
        await deleteverifyAdvertisingCompany(itemId._id).then(
          async (result) => {
            const { msg } = result.payload;
            if (msg === "no") {
              await deleteAdvertisingCompany(itemId._id);
              toast.success("Publicidade Removida com sucesso");
            }
          }
        );
        setOpen(false);
        setLoading(false);
      } else if (itemForm === "Ponto") {
        await deleteClockingsByProfileId(itemId);
        toast.success("Ponto Removido com sucesso");
      }
    } catch (error) {
      console.error("Failed to load data", error);
    }
  };

  const handleAccessOnClick = async () => {
    setIsOpen(false);
    try {
      await getSelectedProfileById(itemId);
      navigate(`/dashboard/agentes/access/${itemId}`);
    } catch (error) {
      console.error("Failed to load data", error);
    }
  };

  const AddCompanyCategorySchema = Yup.object().shape({
    name: Yup.string().required("Empresa é Obrigatório"),
  });

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {ItemOption.includes("Publicar") && (
          <MenuItem
            onClick={handlePublishOnClick}
            sx={{ color: "text.secondary" }}
          >
            <ListItemIcon>
              <Iconify
                icon="icon-park-solid:stopwatch-start"
                width={24}
                height={24}
              />
            </ListItemIcon>
            <ListItemText
              primary="Publicar"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        )}

        {ItemOption.includes("Acesso") && (
          <MenuItem
            onClick={handleAccessOnClick}
            sx={{ color: "text.secondary" }}
          >
            <ListItemIcon>
              <Iconify
                icon="teenyicons:password-outline"
                width={24}
                height={24}
              />
            </ListItemIcon>
            <ListItemText
              primary="Acesso"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        )}

        {ItemOption.includes("Previsualizar") && (
          <MenuItem
            onClick={handlePreviewOnClick}
            sx={{ color: "text.secondary" }}
          >
            <ListItemIcon>
              <Iconify
                icon="icon-park-solid:preview-open"
                width={24}
                height={24}
              />
            </ListItemIcon>
            <ListItemText
              primary="Previsualizar"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        )}

        {ItemOption.includes("Parar") && (
          <MenuItem
            onClick={handleStopOnClick}
            sx={{ color: "text.secondary" }}
          >
            <ListItemIcon>
              <Iconify
                icon="mdi:timer-stop-outline"
                width={24}
                height={24}
              />
            </ListItemIcon>
            <ListItemText
              primary="Parar"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        )}

        {ItemOption.includes("Editar") && (
          <MenuItem
            onClick={handleEditOnClick}
            sx={{ color: "text.secondary" }}
          >
            <ListItemIcon>
              <Iconify icon="eva:edit-fill" width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary="Editar"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        )}

        {ItemOption.includes("Eliminar") && (
          <MenuItem
            onClick={handleDeleteOnClick}
            sx={{ color: "text.secondary" }}
          >
            <ListItemIcon>
              <Iconify icon="eva:trash-2-outline" width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary="Eliminar"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        )}

        {ItemOption.includes("Publicidade") && (
          <MenuItem
            onClick={handleAdvertisingOnClick}
            sx={{ color: "text.secondary" }}
          >
            <ListItemIcon>
              <Iconify icon="icons8:advertising" width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary="Publicidade"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        )}
      </Menu>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{ItemTitle}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            {`Deseja Eliminar Permanentemente o ${itemForm} selecionado?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleClose}
            disabled={loading ? true : false}
          >
            Cancelar
          </Button>
          <LoadingButton autoFocus onClick={handleConfirmar} loading={loading}>
            Confirmar
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <Dialog
        fullScreen={fullScreen}
        open={open_ct}
        onClose={handleClose_ct}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Categoria</DialogTitle>

        <Formik
          initialValues={{
            name: ItemTitle,
          }}
          validationSchema={AddCompanyCategorySchema}
          onSubmit={(values, actions) => {
            try {
              setLoading_ct(true);
              setTimeout(async () => {
                let formData = {
                  category_id: itemId,
                  values,
                };
                await EditCompanyCategoryById(formData);
                actions.setSubmitting(false);
                setLoading_ct(false);
                actions.resetForm();
                setOpen_ct(false);
                toast.success("Categoria actualizada com sucesso");
              }, 1000);
            } catch (error) {
              console.error("Failed to load data", error);
            }
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <DialogContent dividers>
                <DialogContentText>
                  {`Digite a baixo a Categoria que deseja alterar`}
                </DialogContentText>
                <TextField
                  sx={{ mt: 1 }}
                  variant="standard"
                  fullWidth
                  type="text"
                  name="name"
                  label="Categoria"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.name}
                  error={Boolean(props.touched.name && props.errors.name)}
                  helperText={props.touched.name && props.errors.name}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleClose_ct}
                  disabled={props.isSubmitting ? true : false}
                >
                  Cancelar
                </Button>
                <LoadingButton
                  onClick={props.handleSubmit}
                  loading={props.isSubmitting}
                >
                  Confirmar
                </LoadingButton>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>

      <Dialog
        fullScreen={fullScreen}
        open={open_cp}
        onClose={() => setOpen_cp(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{ItemTitle}</DialogTitle>
        <DialogContent dividers>
          <Container maxWidth="md">
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
                <Typography
                  component="div"
                  sx={{ mr: 1, fontSize: 14, fontWeight: "bold" }}
                >
                  NIF:
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  component="div"
                >
                  {company?.nif}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
                <Typography
                  component="div"
                  sx={{ mr: 1, fontSize: 14, fontWeight: "bold" }}
                >
                  Actividade | Categoria:
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  component="div"
                >
                  {company?.company_activity} | {company?.company_sector}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
                <Typography
                  component="div"
                  sx={{ mr: 1, fontSize: 14, fontWeight: "bold" }}
                >
                  Responsável:
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  component="div"
                >
                  {company?.company_manager}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
                <Typography
                  component="div"
                  sx={{ mr: 1, fontSize: 14, fontWeight: "bold" }}
                >
                  Contacto #1 | Contacto #2:
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  component="div"
                >
                  {company?.phones.phone1} | {company?.phones.phone2}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
                <Typography
                  component="div"
                  sx={{ mr: 1, fontSize: 14, fontWeight: "bold" }}
                >
                  Email:
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  component="div"
                >
                  {company?.email}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
                <Typography
                  component="div"
                  sx={{ mr: 1, fontSize: 14, fontWeight: "bold" }}
                >
                  Endereço:
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  component="div"
                >
                  {company?.location.pais} - {company?.location.provincia} |{" "}
                  {company?.location.municipio}, {company?.location.endereco}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
                <Typography
                  component="div"
                  sx={{ mr: 1, fontSize: 14, fontWeight: "bold" }}
                >
                  Contrato | Loja:
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  component="div"
                >
                  <Label variant="ghost" color={handleStatus(company?.status)}>
                    {company?.status}
                  </Label>{" "}
                  |{" "}
                  <Label variant="ghost" color={handleStore(company?.store)}>
                    {company?.store}
                  </Label>
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
                <Typography
                  component="div"
                  sx={{ mr: 1, fontSize: 14, fontWeight: "bold" }}
                >
                  Data:
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  component="div"
                >
                  <Moment format="DD/MM/YYYY">{company?.date}</Moment>
                </Typography>
              </Box>
            </Box>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setOpen_cp(false)}>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullScreen={fullScreen}
        open={open_ad}
        onClose={() => setOpen_ad(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{ItemTitle}</DialogTitle>
        <DialogContent dividers>
          <Container maxWidth="md">
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
                <Typography
                  component="div"
                  sx={{ mr: 1, fontSize: 14, fontWeight: "bold" }}
                >
                  Preço:
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  component="div"
                >
                  {advertisingPackage?.price} Kz
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
                <Typography
                  component="div"
                  sx={{ mr: 1, fontSize: 14, fontWeight: "bold" }}
                >
                  Período:
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  component="div"
                >
                  {advertisingPackage?.period}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
                <Typography
                  component="div"
                  sx={{ mr: 1, fontSize: 14, fontWeight: "bold" }}
                >
                  Duração:
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  component="div"
                >
                  {advertisingPackage?.duration}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
                <Typography
                  component="div"
                  sx={{ mr: 1, fontSize: 14, fontWeight: "bold" }}
                >
                  Detalhes:
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  component="div"
                >
                  {advertisingPackage?.details}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
                <Typography
                  component="div"
                  sx={{ mr: 1, fontSize: 14, fontWeight: "bold" }}
                >
                  Data:
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  component="div"
                >
                  <Moment format="DD/MM/YYYY">
                    {advertisingPackage?.date}
                  </Moment>
                </Typography>
              </Box>
            </Box>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setOpen_ad(false)}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

UserMoreMenu.propTypes = {
  getAllAdvertisingCompany: PropTypes.func.isRequired,
  getCurrentCompanyById: PropTypes.func.isRequired,
  getAdvertisingCompanyById: PropTypes.func.isRequired,
  getSelectedProfileById: PropTypes.func.isRequired,
  publishAdvertisingCompanyById: PropTypes.func.isRequired,
  publishAdvertisingCompanyChecking: PropTypes.func.isRequired,
  deleteverifyAdvertisingCompany: PropTypes.func.isRequired,
  deleteCompanyById: PropTypes.func.isRequired,
  deleteProfileById: PropTypes.func.isRequired,
  DeleteCompanyCategoryById: PropTypes.func.isRequired,
  deleteAdvertisingCompany: PropTypes.func.isRequired,
  deleteAdvertisingCompanyById: PropTypes.func.isRequired,
  deleteAdvertisingPackageById: PropTypes.func.isRequired,
  deleteCompanyByProfileId: PropTypes.func.isRequired,
  EditCompanyCategoryById: PropTypes.func.isRequired,
  EditAdvertisingDate: PropTypes.func.isRequired,
  stopAdvertisingCompanyById: PropTypes.func.isRequired,
  getSelectedAdvertisingPackageById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
  advertising: PropTypes.object.isRequired,
  advertisingPackage: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  company: state.company,
  advertising: state.advertising,
  advertisingPackage: state.advertisingPackage,
});

export default connect(mapStateToProps, {
  getAllAdvertisingCompany,
  getAllAdvertisingCompanyById,
  getCurrentCompanyById,
  getSelectedProfileById,
  publishAdvertisingCompanyById,
  publishAdvertisingCompanyChecking,
  stopAdvertisingCompanyById,
  deleteCompanyById,
  deleteProfileById,
  deleteverifyAdvertisingCompany,
  DeleteCompanyCategoryById,
  deleteAdvertisingCompany,
  deleteAdvertisingCompanyById,
  deleteAdvertisingPackageById,
  deleteClockingsByProfileId,
  EditCompanyCategoryById,
  deleteCompanyByProfileId,
  getSelectedAdvertisingPackageById,
})(UserMoreMenu);
