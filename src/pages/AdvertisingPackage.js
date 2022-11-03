import { filter } from "lodash";
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
import Scrollbar from "../components/Scrollbar";
import Iconify from "../components/Iconify";
import SearchNotFound from "../components/SearchNotFound";
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from "../sections/@dashboard/user";

import { connect } from "react-redux";
import {
  getAllAdvertisingPackage,
  deleteAdvertisingPackageById,
} from "../redux/advertisingPackage/advertisingPackageAction";
import { useEffect } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { toast } from "react-toastify";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "pacote", label: "Pacote", alignRight: false },
  { id: "preço", label: "Preço", alignRight: false },
  { id: "período", label: "Período", alignRight: false },
  { id: "duração", label: "Duração", alignRight: false },
  { id: "data", label: "Data", alignRight: false },
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
      (_advertisingPackages) =>
        _advertisingPackages.name.toLowerCase().indexOf(query.toLowerCase()) !==
        -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

const AdvertisingPackage = ({
  getAllAdvertisingPackage,
  deleteAdvertisingPackageById,
  auth: { user, roles },
  advertisingPackage: { advertisingPackages },
}) => {
  useEffect(() => {
    getAllAdvertisingPackage();
  }, [getAllAdvertisingPackage]);

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
      const newSelecteds = advertisingPackages.map((n) => n.name);
      setSelected(newSelecteds);
      const newSelectedsId = advertisingPackages.map((n) => n._id);
      setSelectedId(newSelectedsId);
      return;
    }
    setSelected([]);
    setSelectedId([]);
  };

  const handleClick = (event, name, id) => {
    const selectedIndex = selected.indexOf(name);
    const selectedIndexId = selectedId.indexOf(id);
    let newSelected = [];
    let newSelectedId = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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
    selectedId.map(async (id) => await deleteAdvertisingPackageById(id));
    toast.success("Parceiro(s) removido com sucesso");
    setSelected([]);
    setSelectedId([]);
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - advertisingPackages.length)
      : 0;

  const filteredUsers = applySortFilter(
    advertisingPackages,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Pacote Publicitário">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Pacote Publicitário
          </Typography>
          {roles !== 2055  && (
            <Button
              variant="contained"
              component={RouterLink}
              to="/dashboard/publicidade/add"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Add Pacote Publicitário
            </Button>)
          }
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            onDelete={handleDeleteSelected}
            form={"advertisingPackage"}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={advertisingPackages.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                  form={roles === 2055 ? 'user' : ''}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { _id, name, price, period, duration, date } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;

                      return (
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          {(roles !== 2055) && (<TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) =>
                                handleClick(event, name, _id)
                              }
                            />
                          </TableCell>)} 
                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={3}
                            >
                              <Typography variant="subtitle2" noWrap sx={{marginLeft: roles === 2055 ? 2 : 0}}>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{`${price} Kz`}</TableCell>
                          <TableCell align="left">{period}</TableCell>
                          <TableCell align="left">{duration}</TableCell>
                          <TableCell align="left">
                            <Moment format="DD/MM/YYYY">{date}</Moment>
                          </TableCell>

                          <TableCell align="right">
                            <UserMoreMenu
                              itemForm="Pacote Publicitário"
                              itemId={_id}
                              ItemTitle={name}
                              itemUrl={`/dashboard/publicidade/edit/${_id}`}
                              ItemOption={roles === 2055 ? ["Previsualizar"] : ["Previsualizar","Editar", "Eliminar"]}
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
            count={advertisingPackages.length}
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

AdvertisingPackage.propTypes = {
  getAllAdvertisingPackage: PropTypes.func.isRequired,
  deleteAdvertisingPackageById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  advertisingPackage: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  advertisingPackage: state.advertisingPackage,
});

export default connect(mapStateToProps, {
  getAllAdvertisingPackage,
  deleteAdvertisingPackageById,
})(AdvertisingPackage);
