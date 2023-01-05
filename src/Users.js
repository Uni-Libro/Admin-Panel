import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { DeleteModal } from './hooks/UserDialog';
import './Table-design.css'
import { Button } from '@mui/material';
import ResponsiveAppBar from './NavBar';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const columns = [
  { id: 'name', label: 'Username', minWidth: 100, align: 'center' },
  { id: 'date', label: 'Join date', minWidth: 100, align: 'center' },
];

function createData(name, date) {
  return { name, date };
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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



export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(30);
  const [open, setOpen] = React.useState(false);
  const [activeDialog, setActiveDialog] = React.useState(false);
  // const matches = useMediaQuery('(min-width:600px)');

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
    setActiveDialog(false);

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
                          <Button variant="contained" color="error" onClick={() => {
                            setActiveDialog('delete');
                          }}>
                            Delete
                          </Button>
                          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success" sx={{ width: '100%', boxShadow: 'none' }}>
                              Successfully deleted!
                            </Alert>
                          </Snackbar>
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
        <DeleteModal
          open={activeDialog === 'delete'}
          onDelete={handleClick}
          onCancel={() => {
            setActiveDialog(false);
          }}
        />
      </div>
    </div>
  );
}