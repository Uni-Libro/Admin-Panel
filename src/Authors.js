import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import './Table-design.css'
import { Button, useMediaQuery } from '@mui/material';
import { CollectionCreateForm } from './hooks/AuthorsDialog';
import ResponsiveAppBar from './NavBar';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';
const columns = [
  { id: 'name', label: 'Author Name', minWidth: 100, align: 'center' },
  {
    id: 'picture',
    label: 'Author picture',
    minWidth: 300,
    align: 'center',
  },
];

function createData(name, picture) {
  return { name, picture };
}

const rows = [
  createData(1, 'Penguin Random House',),
  createData(2, 'HarperCollins',),
  createData(3, 'Simon & Schuster',),
  createData(4, 'Hachette Book Group',),
  createData(5, 'Macmillan',),
  createData(6, 'Scholastic',),
  createData(7, 'Disney Publishing Worldwide',),
  createData(8, 'Houghton Mifflin Harcourt',),
  createData(9, '	Workman',),
  createData(10, 'Sterling',),
  createData(11, 'John Wiley and Sons',),
  createData(12, 'Abrams',),
  createData(13, 'Dover',),
  createData(14, 'Candlewick',),
  createData(15, 'W.W. Norton',),
];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [activeDialog, setActiveDialog] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(30);
  const [open, setOpen] = React.useState(false);
  const matches = useMediaQuery('(min-width:520px)');
  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (row) => {
    setOpen(true);
    rows.filter((item) => item !== row);
    //delete a row from the table

  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (

    <div className='content'>
      <ResponsiveAppBar />
      <div className='table'>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 500 }} className='table-container'>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell align='center'
                    style={{ minWidth: 100, fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                        <TableCell align='center'>
                          <Button variant="contained" sx={{ marginRight: matches ? 1 : 0 }} color="error" onClick={(row) => {
                            //asinc function
                            handleClick(row);
                          }}>
                            Delete
                          </Button>
                          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success" sx={{ width: '100%', boxShadow: 'none' }}>
                              Successfully deleted!
                            </Alert>
                          </Snackbar>
                          <Button variant="outlined" sx={{ marginLeft: matches ? 1 : 0, backgroundColor: '--bs-blue', marginTop: matches ? 0 : 1 }} onClick={() => {
                            setActiveDialog('form');
                          }}>
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[50]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <CollectionCreateForm
          open={activeDialog === 'form'}
          onCreate={onCreate}
          onCancel={() => {
            setActiveDialog(false);
          }}
        />
      </div>
      <Button variant="outlined" sx={{ marginLeft: '45%' }} endIcon={<AddIcon />} onClick={() => {
        setActiveDialog('form');
      }}>Add
      </Button>
    </div>
  );
}