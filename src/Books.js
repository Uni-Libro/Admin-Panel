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
import { FormDialog } from './hooks/BooksDialog';
import ResponsiveAppBar from './NavBar';
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const columns = [
  { id: 'name', label: 'Book name', minWidth: 100, align: 'center' },
  { id: 'authors', label: 'Authors', minWidth: 100, align: 'center' },
  {
    id: 'categories',
    label: 'Categories',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'picture',
    label: 'Book picture',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'pdf',
    label: 'Book PDF',
    minWidth: 100,
    align: 'center',
  },
];

function createData(name, authors, categories, picture, pdf) {
  return { name, authors, categories, picture, pdf };
}

const rows = [
  createData(1, 'Penguin Random House', 'Printing your dreams', 4, 4,),
  createData(2, 'HarperCollins', 'You write, we publish', 5, 5,),
  createData(3, 'Simon & Schuster', 'Presenting your thoughts to the world', 6, 5,),
  createData(4, 'Hachette Book Group', 'Quality printing', 7, 5,),
  createData(5, 'Macmillan', 'Get your dreams inked', 8, 5,),
  createData(6, 'Scholastic', 'Fast and reliable', 9, 5,),
  createData(7, 'Disney Publishing Worldwide', 'Experts in the field', 10, 5,),
  createData(8, 'Houghton Mifflin Harcourt', 'One-stop for printing solutions', 11, 5,),
  createData(9, '	Workman', 'To make sales easier', 12, 5,),
  createData(10, 'Sterling', 'Printing your needs', 13, 5,),
  createData(11, 'John Wiley and Sons', 'Publishing better', 14, 5,),
  createData(12, 'Abrams', 'Motivating Community', 15, 5,),
  createData(13, 'Dover', 'A new Words for all', 16, 5,),
  createData(14, 'Candlewick', 'Printing is our Language', 17, 5,),
  createData(15, 'W.W. Norton', 'Writing for your Success', 18, 5,),
];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [activeDialog, setActiveDialog] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(30);
  const matches = useMediaQuery('(min-width:1045px)');
  const [open, setOpen] = React.useState(false);

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
        <FormDialog open={activeDialog === 'form'} handleClose={() => {
          setActiveDialog(false);
        }} />
      </div>
      <Button variant="outlined" sx={{ marginLeft: '45%' }} endIcon={<AddIcon />} onClick={() => {
        setActiveDialog('form');
      }}>Add
      </Button>
    </div>
  );
}