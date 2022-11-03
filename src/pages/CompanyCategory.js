import { filter } from "lodash";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useMediaQuery,
  useTheme,
  TextField,
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
import { getAllCompanyCategorys,CreateCompanyCategory,DeleteCompanyCategoryById } from "../redux/companyCategory/categoryAction";
import { useEffect } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "Categoria", label: "Categoria", alignRight: false },
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
      (_category) =>
        _category.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

const CompanyCategory = ({ getAllCompanyCategorys, CreateCompanyCategory, DeleteCompanyCategoryById, category: {categorys}}) => {
  useEffect(() => {
    getAllCompanyCategorys();
  }, [getAllCompanyCategorys]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  
  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = categorys.map((n) => n.name);
      setSelected(newSelecteds);
      const newSelectedsId = categorys.map((n) => n.id);
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
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
      newSelectedId = newSelectedId.concat(selectedId.slice(0, selectedIndexId), selectedId.slice(selectedIndexId + 1));
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
    selectedId.map((id) => DeleteCompanyCategoryById(id));
    toast.success("Categoria(s) removida com sucesso");
    setSelected([]);
    setSelectedId([]);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categorys.length) : 0;

  const filteredUsers = applySortFilter(
    categorys,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(loading ? true : false);
  };

  const AddCompanyCategorySchema = Yup.object().shape({
    name: Yup.string().required("Categoria é obrigatório"),
  });

  return (
    <Page title="Categoria">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Categoria
          </Typography>
          <Button
            variant="contained"
            onClick={(e) => setOpen(true)}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Add Categoria
          </Button>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} onDelete={handleDeleteSelected}/>

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={categorys.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { _id, name, date } = row;
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
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name, _id)} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left"><Moment format="DD/MM/YYYY">{date}</Moment></TableCell>
                        
                        <TableCell align="right">
                          <UserMoreMenu 
                            itemForm="Categoria" 
                            itemId={_id} 
                            ItemTitle={name}
                            ItemOption={["Editar","Eliminar"]}
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
            count={categorys.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Categoria</DialogTitle>

        <Formik
          initialValues={{
            name: "",
          }}
          validationSchema={AddCompanyCategorySchema}
          onSubmit={(values, actions) => {
            try {
              setLoading(true);
              setTimeout(async () => {
                await CreateCompanyCategory(values);
                actions.setSubmitting(false);
                setLoading(false);
                actions.resetForm();
                toast.success("Categoria cadastrada com sucesso");
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
                  {`Digite a baixo a Categoria que deseja cadastrar`}
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
                <Button onClick={handleClose} disabled={props.isSubmitting?true:false}>
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

CompanyCategory.propTypes = {
  getAllCompanyCategorys: PropTypes.func.isRequired,
  CreateCompanyCategory: PropTypes.func.isRequired,
  DeleteCompanyCategoryById: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.category
});

export default connect(mapStateToProps, { getAllCompanyCategorys,CreateCompanyCategory,DeleteCompanyCategoryById })(
  CompanyCategory
);
