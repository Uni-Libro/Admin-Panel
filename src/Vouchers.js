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
import { CollectionCreateForm, DeleteModal } from './hooks/VouchersDialog';
import ResponsiveAppBar from './NavBar';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';
const columns = [
  { id: 'id', label: 'ID', minWidth: 100, align: 'center' },
  {
    id: 'code',
    label: 'Code',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'aDate',
    label: 'Activation date',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'eDate',
    label: 'Expiration date',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'percentage',
    label: 'Discount percentage',
    minWidth: 100,
    align: 'center',
  },
];

function createData(id, code, aDate, eDate, percentage) {
  return { id, code, aDate, eDate, percentage };
}

const rows = [
  createData(1, 'Penguin Random House', 1, 3, 4),
  createData(2, 'HarperCollins', 1, 6, 4),
  createData(3, 'Simon & Schuster', 4, 6, 7),
  createData(4, 'Hachette Book Group', 4, 7, 8),
  createData(5, 'Macmillan', 6, 8, 0),
  createData(6, 'Scholastic', 4, 6, 8),
  createData(7, 'Disney Publishing Worldwide', 3, 5, 7),
  createData(8, 'Houghton Mifflin Harcourt', 2, 6, 8),
  createData(9, '	Workman', 4, 8, 9),
  createData(10, 'Sterling', 5, 7, 9),
  createData(11, 'John Wiley and Sons', 5, 8, 4),
  createData(12, 'Abrams', 4, 7, 3),
  createData(13, 'Dover', 3, 7, 4),
  createData(14, 'Candlewick', 76, 8, 4),
  createData(15, 'W.W. Norton', 54, 8, 6),
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
                          <Button variant="contained" sx={{ marginRight: matches ? 1 : 0 }} color="error" onClick={(row) => {
                            setActiveDialog('delete');
                          }}>
                            Delete
                          </Button>
                          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success" sx={{ width: '100%', boxShadow: 'none' }}>
                              Successfully deleted!
                            </Alert>
                          </Snackbar>
                          <Button variant="outlined" sx={{ marginLeft: matches ? 1 : 0, backgroundColor: '--bs-blue', marginTop: matches ? 0 : 1 }} onClick={() => {
                            setActiveDialog('edit');
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
          open={activeDialog === 'edit'}
          onCreate={onCreate}
          onCancel={() => {
            setActiveDialog(false);
          }}
        />
        <DeleteModal
          open={activeDialog === 'delete'}
          onDelete={handleClick}
          onCancel={() => {
            setActiveDialog(false);
          }}
        />
      </div>
      <Button variant="outlined" sx={{ marginLeft: '45%' }} endIcon={<AddIcon />} onClick={() => {
        setActiveDialog('edit');
      }}>Add
      </Button>
    </div>
  );
}