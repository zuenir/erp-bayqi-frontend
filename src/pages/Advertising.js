import { filter } from "lodash";
import { useState } from "react";
import { sentenceCase } from "change-case";

// material
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";
// components
import Label from "../components/Label";
import Page from "../components/Page";
import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "../components/SearchNotFound";
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from "../sections/@dashboard/user";

import { connect } from "react-redux";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { getAllAdvertisingCompany,deleteAdvertisingCompany,deleteverifyAdvertisingCompany, getAllAdvertisingCompanyByProfileId } from '../redux/advertising/advertisingAction';
import { getCurrentProfile } from './../redux/profile/profileAction';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "parceiro", label: "Parceiro", alignRight: false },
  { id: "actividade", label: "Actividade", alignRight: false },
  { id: "pacote", label: "Pacote", alignRight: false },
  { id: "período", label: "Período", alignRight: false },
  { id: "data-inicio", label: "Data - Início", alignRight: false },
  { id: "data-termino", label: "Data - Terminio", alignRight: false },
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
        _advertising.company_name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

const Advertising = ({
  getCurrentProfile,
  getAllAdvertisingCompany, 
  getAllAdvertisingCompanyByProfileId,
  deleteAdvertisingCompany,
  deleteverifyAdvertisingCompany,
  auth: { user, roles },
  advertising:{advertisings}}) => {
    useEffect(() => {
      async function fetchData() {
        try {
          if (roles === 5150 || roles === 1984) {
            await getAllAdvertisingCompany();
          }else if(roles === 2001 || roles === 2055){
            await getCurrentProfile().then(async (result) => {
              if (result.payload._id) {
                  await getAllAdvertisingCompanyByProfileId(result.payload._id);
              }
            });
          } 
        } catch (error) {
          console.log("Server Error", error);
        }
      }
      fetchData();
      }, [getCurrentProfile, getAllAdvertisingCompany, getAllAdvertisingCompanyByProfileId, roles]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");
  
  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

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
    return store === "Pendente" ? "warning" : store === "Removido" ? "error" : store === "Publicado" ? "success" : store;
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - advertisings.length) : 0;

  const filteredUsers = applySortFilter(
    advertisings,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="BayQi Publicidade">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            BayQi Publicidade
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar 
            filterName={filterName}
            onFilterName={handleFilterByName} 
            form={"Parceiro Publicidade"}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={advertisings.length}
                  onRequestSort={handleRequestSort}
                  form={"user"}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { _id, company, company_name, company_sector, advertising, startDate, endDate, storeStatus} = row;

                    return (
                      <TableRow
                        hover
                        key={_id}
                        tabIndex={-1}
                        role="checkbox"
                      >
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography variant="subtitle2" sx={{ marginLeft: 2 }} noWrap>
                              {company_name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{company_sector}</TableCell>
                        <TableCell align="left">{advertising[0].name}</TableCell> 
                        <TableCell align="left">{advertising[0].period} ({advertising[0].duration})</TableCell>
                        <TableCell align="left">{startDate}</TableCell>
                        <TableCell align="left">{endDate}</TableCell>
                        <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={handleStore(storeStatus)}
                            >
                              {sentenceCase(storeStatus)}
                            </Label>
                          </TableCell>
                          {roles !== 2055 && (
                            <TableCell align="right">
                              <UserMoreMenu 
                                itemForm="Parceiro Publicidade" 
                                itemId={{company,_id}} 
                                ItemTitle={company_name}
                                itemUrl={`/dashboard/parceiros/publicidade/${company}`}
                                ItemOption={startDate === "Pendente" & endDate ==="Pendente" ? ["Publicar","Editar","Eliminar"] : storeStatus === "Publicado" ? ["Parar","Editar","Eliminar"] : ["Editar","Eliminar"] }
                              />
                            </TableCell>
                          )}
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
            count={advertisings.length}
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

Advertising.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    getAllAdvertisingCompany: PropTypes.func.isRequired,
    getAllAdvertisingCompanyByProfileId: PropTypes.func.isRequired,
    deleteAdvertisingCompany: PropTypes.func.isRequired,
    deleteverifyAdvertisingCompany: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    advertising:PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  advertising : state.advertising
});

export default connect(mapStateToProps, { 
  getCurrentProfile,
  getAllAdvertisingCompany,
  getAllAdvertisingCompanyByProfileId,
  deleteverifyAdvertisingCompany,
  deleteAdvertisingCompany})(Advertising);
