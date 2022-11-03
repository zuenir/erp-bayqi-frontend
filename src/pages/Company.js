import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";
// components
import Page from "../components/Page";
import Label from "../components/Label";
import Scrollbar from "../components/Scrollbar";
import Iconify from "../components/Iconify";
import SearchNotFound from "../components/SearchNotFound";
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from "../sections/@dashboard/user";

import { connect } from "react-redux";
import { loadUser } from "../redux/auth/authAction";
import { getCurrentProfile } from "../redux/profile/profileAction";
import {
  getAllCompanys,
  getAllCompanysByProfileId,
  deleteCompanyById,
} from "../redux/company/companyAction";
import { useEffect } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { toast } from "react-toastify";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "parceiro", label: "Parceiros", alignRight: false },
  { id: "actividade", label: "Actividade", alignRight: false },
  { id: "categoria", label: "Categoria", alignRight: false },
  { id: "data", label: "Data", alignRight: false },
  { id: "contrato", label: "Contrato", alignRight: false },
  { id: "loja", label: "Loja", alignRight: false },
  { id: "agente", label: "Agente", alignRight: false },
  { id: "" },
];
 
const TABLE_HEAD_USER = [
  { id: "parceiro", label: "Parceiros", alignRight: false },
  { id: "actividade", label: "Actividade", alignRight: false },
  { id: "categoria", label: "Categoria", alignRight: false },
  { id: "data", label: "Data", alignRight: false },
  { id: "contrato", label: "Contrato", alignRight: false },
  { id: "loja", label: "Loja", alignRight: false },
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
      (_company) =>
        _company.company_name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

const Company = ({
  loadUser,
  getCurrentProfile,
  getAllCompanys,
  getAllCompanysByProfileId,
  deleteCompanyById,
  auth: { user, roles },
  profile: { profile },
  company: { companys },
}) => {
  useEffect(() => {
    async function fetchData() {
      try {
        if (roles === 5150 || roles === 1984) {
          await getAllCompanys();
        }else if(roles === 2001 || roles === 2055){
          await getCurrentProfile().then(async (result) => {
            if (result.payload._id) {
                await getAllCompanysByProfileId(result.payload._id);
            }
          });
        }       
      } catch (error) {
        console.log("Server Error", error);
      }
    }
    fetchData();
  }, [loadUser, roles, getAllCompanys, getAllCompanysByProfileId,getCurrentProfile]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);
  const [selectedId, setSelectedId] = useState([]);

  const [orderBy, setOrderBy] = useState("company_name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = companys.map((n) => n.company_name);
      setSelected(newSelecteds);
      const newSelectedsId = companys.map((n) => n.id);
      setSelectedId(newSelectedsId);
      return;
    }
    setSelected([]);
    setSelectedId([]);
  };

  const handleClick = (event, company_name, id) => {
    const selectedIndex = selected.indexOf(company_name);
    const selectedIndexId = selectedId.indexOf(id);
    let newSelected = [];
    let newSelectedId = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, company_name);
      newSelectedId = newSelectedId.concat(selectedId, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      newSelectedId = newSelectedId.concat(selectedId.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      newSelectedId = newSelectedId.concat(selectedId.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
      newSelectedId = newSelectedId.concat(
        selectedId.slice(0, selectedIndexId),
        selectedId.slice(selectedIndexId + 1)
      );
    }
    setSelected(newSelected);
    setSelectedId(newSelectedId);
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

  const handleDeleteSelected = () => {
    selectedId.map(async (id) => await deleteCompanyById(id));
    toast.success("Parceiro(s) removido com sucesso");
    setSelected([]);
    setSelectedId([]);
  };

  const handleStatus = (status) => {
    return status === "Aberto" ? "warning" : status === "Cancelado"? "error" : status === "Fechado" ? "success" : status;
  };

  const handleStore = (store) => {
    return store === "Pendente" ? "warning" : store === "Removido" || store === "N/Disponível" ? "error" : store === "Publicado" ? "success" : store;
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - companys.length) : 0;

  const filteredUsers = applySortFilter(
    companys,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Parceiro">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Parceiros
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/parceiros/add"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Add Parceiro
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            onDelete={handleDeleteSelected}
            form={"company"}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={(roles === 2055 || roles === 2001)? TABLE_HEAD_USER : TABLE_HEAD}
                  rowCount={companys.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                  form={roles === 2001 ? "user" : "Parceiro"}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        _id,
                        company_name,
                        company_activity,
                        company_sector,
                        date,
                        store,
                        status,
                        name
                      } = row;
                      const isItemSelected =
                        selected.indexOf(company_name) !== -1;

                      return (
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          {roles === 2001 ? (
                            <></>
                          ) : (
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                onChange={(event) =>
                                  handleClick(event, company_name, _id)
                                }
                              />
                            </TableCell>
                          )}

                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={3}
                            >
                              <Typography variant="subtitle2" noWrap sx={{marginLeft: roles === 2001 ? 2 : 0}}>
                                {company_name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{company_activity}</TableCell>
                          <TableCell align="left">{company_sector}</TableCell>
                          <TableCell align="left">
                            <Moment format="DD/MM/YYYY">{date}</Moment>
                          </TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={handleStatus(status)}
                            >
                              {sentenceCase(status)}
                            </Label>
                          </TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={handleStore(store)}
                            >
                              {sentenceCase(store)}
                            </Label>
                          </TableCell>
                          {(roles === 5150 || roles === 1984 || roles === 1990) && (<TableCell align="left">{name}</TableCell>)}
                          <TableCell align="right">
                            <UserMoreMenu
                              itemForm={(roles === 2001 || roles === 2055) ? "ParceiroUser" : "Parceiro"}
                              itemId={_id}
                              itemUrl={`/dashboard/parceiros/edit/${_id}`}
                              ItemTitle={company_name}
                              ItemOption={(roles === 2001 || roles === 2055) ? ["Previsualizar","Editar","Eliminar"] : ["Previsualizar","Editar","Publicidade","Eliminar"]}
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
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
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
            count={companys.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
};

Company.propTypes = {
  loadUser: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  getAllCompanys: PropTypes.func.isRequired,
  getAllCompanysByProfileId: PropTypes.func.isRequired,
  deleteCompanyById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  company: state.company,
});

export default connect(mapStateToProps, {
  loadUser,
  getCurrentProfile,
  getAllCompanys,
  getAllCompanysByProfileId,
  deleteCompanyById,
})(Company);
