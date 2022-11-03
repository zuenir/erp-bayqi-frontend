import React, { useState, useEffect } from "react";
import Page from "../components/Page";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {
  Card,
  Container,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  useMediaQuery,
  useTheme,
  Box,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination
} from "@mui/material";
import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { styled } from "@mui/material/styles";
import Iconify from "../components/Iconify";
import { Link as RouterLink, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { getAllAdvertisingPackage } from "../redux/advertisingPackage/advertisingPackageAction";
import { createAdvertisingCompanyV1, getAllAdvertisingCompanyById,verifyAdvertisingCompany } from "../redux/advertising/advertisingAction";
import Moment from "react-moment";
import UserListHead from './../sections/@dashboard/user/UserListHead';
import Scrollbar from './../components/Scrollbar';
import Label from './../components/Label';
import { UserMoreMenu } from "../sections/@dashboard/user";
import SearchNotFound from './../components/SearchNotFound';
import UserListToolbar from './../sections/@dashboard/user/UserListToolbar';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "pacote", label: "Pacote", alignRight: false },
  { id: "preço", label: "Preço", alignRight: false },
  { id: "período", label: "Período", alignRight: false },
  { id: "duração", label: "Duração", alignRight: false },
  { id: "detalhes", label: "Detalhes", alignRight: false },
  { id: "data", label: "Data", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_advertising) =>
        _advertising.advertising[0].name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 1000,
  margin: "auto",
  display: "flex",
  justifyContent: "flex-start",
  flexDirection: "column",
  padding: theme.spacing(5, 0),
}));


const AdvertisingCompany = ({
  getAllAdvertisingPackage,
  getAllAdvertisingCompanyById,
  createAdvertisingCompanyV1,
  verifyAdvertisingCompany,
  auth: { user, roles },
  profile: { profile },
  advertisingPackage: { advertisingPackages, verify },
  advertising: { advertisingCompanys },
  company: { company },
}) => {
  let { company_id } = useParams();

  useEffect(() => {
    getAllAdvertisingCompanyById(company_id);
    getAllAdvertisingPackage();
  }, [getAllAdvertisingCompanyById, company_id, getAllAdvertisingPackage]);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleClose = () => {
    setOpen(loading ? true : false);
  };

  const AdvertisingCompanySchema = Yup.object().shape({
    name: Yup.string().required("Pacote Publicitário é obrigatório"),
  });

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleStore = (store) => {
    return store === "Pendente"
      ? "warning"
      : store === "Removido"
      ? "error"
      : store === "Publicado"
      ? "success"
      : store;
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - advertisingCompanys.length)
      : 0;

  const filteredUsers = applySortFilter(
    advertisingCompanys,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Parceiro Publicidade">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Typography
              underline="hover"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecorationLine: "none",
              }}
              color="inherit"
              component={RouterLink}
              to="/dashboard/parceiros/publicidade"
            >
              <Iconify icon={"icons8:advertising"} width={22} height={22} />
              Parceiro Publicidade
            </Typography>
            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              color="text.primary"
            >
              {company?.company_name}
            </Typography>
          </Breadcrumbs>
          <Button
            variant="contained"
            onClick={(e) => setOpen(true)}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Add Pacote Publicitário
          </Button>
        </Stack>
        <Card>
          <Container>
            <ContentStyle>
              <Page title="Categoria">
                <Container>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={5}
                  >
                    <Typography variant="h5" gutterBottom>
                      Histórico
                    </Typography>
                  </Stack>

                  <>
                    <UserListToolbar
                      filterName={filterName}
                      onFilterName={handleFilterByName}
                    />

                    <Scrollbar>
                      <TableContainer sx={{ minWidth: 800 }}>
                        <Table>
                          <UserListHead
                            order={order}
                            orderBy={orderBy}
                            headLabel={TABLE_HEAD}
                            rowCount={advertisingCompanys.length}
                            onRequestSort={handleRequestSort}
                            form={"user"}
                          />
                          <TableBody>
                            {filteredUsers
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((row) => {
                                const {
                                  _id,
                                  storeStatus,
                                  advertising,
                                  date,
                                } = row;

                                return (
                                  <TableRow
                                    hover
                                    key={_id}
                                    tabIndex={-1}
                                    role="checkbox"
                                  >
                                    <TableCell
                                      component="th"
                                      scope="row"
                                      padding="none"
                                    >
                                      <Stack
                                        direction="row"
                                        alignItems="center"
                                        spacing={3}
                                      >
                                        <Typography variant="subtitle2" sx={{ marginLeft: 2 }} noWrap>
                                          {advertising[0].name}
                                        </Typography>
                                      </Stack>
                                    </TableCell>
                                    <TableCell align="left">
                                      {advertising[0].price} kz
                                    </TableCell>
                                    <TableCell align="left">
                                      {advertising[0].period}
                                    </TableCell>
                                    <TableCell align="left">
                                      {advertising[0].duration}
                                    </TableCell>
                                    <TableCell align="left">
                                      {advertising[0].details}
                                    </TableCell>
                                    <TableCell align="left">
                                      <Moment format="DD/MM/YYYY">
                                        {date}
                                      </Moment>
                                    </TableCell>
                                    <TableCell align="left">
                                      <Label
                                        variant="ghost"
                                        color={handleStore(storeStatus)}
                                      >
                                        {sentenceCase(storeStatus)}
                                      </Label>
                                    </TableCell>

                                    <TableCell align="right">
                                      <UserMoreMenu
                                        itemForm="Publicidade"
                                        itemId={_id}
                                        ItemTitle={advertising[0].name}
                                        itemUrl={`/dashboard/parceiros/publicidade/${user}`}
                                        ItemOption={["Eliminar"]}
                                      />
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            {emptyRows > 0 && (
                              <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                              </TableRow>
                            )}
                          </TableBody>

                          {isUserNotFound && (
                            <TableBody>
                              <TableRow>
                                <TableCell
                                  align="center"
                                  colSpan={6}
                                  sx={{ py: 3 }}
                                >
                                  <SearchNotFound searchQuery={filterName} />
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          )}
                        </Table>
                      </TableContainer>
                    </Scrollbar>

                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={advertisingCompanys.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </>
                </Container>
              </Page>
            </ContentStyle>
          </Container>
        </Card>
      </Container>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Pacote Publicitário
        </DialogTitle>

        <Formik
          initialValues={{
            name: "",
          }}
          validationSchema={AdvertisingCompanySchema}
          onSubmit={(values, actions) => {
            try {
              setLoading(true);
              setTimeout(async () => {
                actions.setSubmitting(false);
                setLoading(false);

                var advpackage = advertisingPackages.filter(
                  (adv) => adv.name === values.name
                );

                var formData = {
                  company_id,
                  advertising: {
                    name: advpackage[0].name,
                    price: advpackage[0].price,
                    period: advpackage[0].period,
                    details: advpackage[0].details,
                    duration: advpackage[0].duration,
                    date: advpackage[0].date,
                  },
                };

                await verifyAdvertisingCompany(formData).then(async(result) => {
                  const {msg} = result.payload;
                  if(msg === "no"){
                    await createAdvertisingCompanyV1(formData).then((result) => {
                      if(result.payload.length !== 0) {
                        toast.success("Pacote Publicitário adicionado com sucesso");
                      }
                    });
                  }
                });
                
                setOpen(false);
                actions.resetForm();
              }, 1000);
            } catch (error) {
              console.error("Failed to load data", error);
            }
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <DialogContent dividers>
                <DialogContentText sx={{ mb: 2 }}>
                  {` Selecionar o Pacote Publicitário`}
                </DialogContentText>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                  sx={{ mb: 2 }}
                >
                  <FormControl fullWidth>
                    <InputLabel id="name">Pacote publicitário</InputLabel>
                    <Select
                      labelId="name"
                      name="name"
                      label="Pacote publicitário"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.name}
                      error={Boolean(props.touched.name && props.errors.name)}
                      helperText={props.touched.name && props.errors.name}
                    >
                      {advertisingPackages.map((adv, index) => (
                        <MenuItem key={index} value={adv.name}>
                          {adv.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
                {advertisingPackages.map(
                  (adv) =>
                    adv.name === props.values.name && (
                      <>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              pl: 1,
                              pb: 1,
                            }}
                          >
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
                              {adv?.price} Kz
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              pl: 1,
                              pb: 1,
                            }}
                          >
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
                              {adv?.period}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              pl: 1,
                              pb: 1,
                            }}
                          >
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
                              {adv?.duration}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              pl: 1,
                              pb: 1,
                            }}
                          >
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
                              {adv?.details}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              pl: 1,
                              pb: 1,
                            }}
                          >
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
                              <Moment format="DD/MM/YYYY">{adv?.date}</Moment>
                            </Typography>
                          </Box>
                        </Box>
                      </>
                    )
                )}
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleClose}
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
    </Page>
  );
};

AdvertisingCompany.propTypes = {
  getAllAdvertisingCompanyById: PropTypes.func.isRequired,
  getAllAdvertisingPackage: PropTypes.func.isRequired,
  createAdvertisingCompany: PropTypes.func.isRequired,
  verifyAdvertisingCompany: PropTypes.func.isRequired,
  company: PropTypes.object.isRequired,
  advertisingPackage: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  advertising: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  advertising: state.advertising,
  company: state.company,
  advertisingPackage: state.advertisingPackage,
});

export default connect(mapStateToProps, {
  getAllAdvertisingPackage,
  getAllAdvertisingCompanyById,
  createAdvertisingCompanyV1,
  verifyAdvertisingCompany
})(AdvertisingCompany);
