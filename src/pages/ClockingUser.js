import { filter } from "lodash";
import { useState } from "react";
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
import Page from "../components/Page";
import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "../components/SearchNotFound";
import { UserListHead, UserListToolbar } from "../sections/@dashboard/user";

import { connect } from "react-redux";
import { getAllClockingsByProfileId } from "../redux/clocking/clockingAction";
import { getCurrentProfile } from "../redux/profile/profileAction";
import { useEffect } from "react";
import PropTypes from "prop-types";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "checkin", label: "Entrada", alignRight: false },
  { id: "locationIn", label: "Local/E", alignRight: false },
  { id: "checkout", label: "Saída", alignRight: false },
  { id: "locationOut", label: "Local/S", alignRight: false },
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
      (_clocking) =>
        _clocking.checkinDate.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

const ClockingUser = ({
  getCurrentProfile,
  getAllClockingsByProfileId,
  clocking: { clockings },
  auth: { user, roles },
}) => {
  useEffect(() => {
    async function fetchData() {
      try {
        await getCurrentProfile().then(async (result) => {
          if (result?.payload._id) {
            await getAllClockingsByProfileId(result?.payload._id);
          }
        });
      } catch (error) {
        console.log("Server Error", error);
      }
    } 

    fetchData();
  }, [getCurrentProfile, getAllClockingsByProfileId]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [orderBy, setOrderBy] = useState("checkinDate");

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

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - clockings.length) : 0;

  const filteredUsers = applySortFilter(
    clockings,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Marcação de Ponto">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Controle de Marcação de Ponto
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar
            filterName={filterName}
            onFilterName={handleFilterByName}
            form={'user'}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={clockings.length}
                  onRequestSort={handleRequestSort}
                  form={"user"}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        _id,
                        checkin,
                        checkout,
                        locationIn,
                        locationOut,
                      } = row;

                      return (
                        <TableRow hover key={_id} tabIndex={-1}>
                          <TableCell align="left">{checkin}</TableCell>
                          <TableCell align="left">{locationIn}</TableCell>
                          <TableCell align="left">{checkout}</TableCell>
                          <TableCell align="left">{locationOut}</TableCell>
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
            count={clockings.length}
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

ClockingUser.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getAllClockingsByProfileId: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  clocking: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  clocking: state.clocking,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  getAllClockingsByProfileId,
})(ClockingUser);
