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
import { Button } from '@mui/material';
import { AlertDialog, FormDialog } from './hooks/Dialog';
import ResponsiveAppBar from './NavBar';
const columns = [
  { id: 'id', label: 'Request Id', minWidth: 100, align: 'center' },
  { id: 'name', label: 'Request Name', minWidth: 100, align: 'center' },
  {
    id: 'description',
    label: 'Description',
    minWidth: 100,
    align: 'center',
  },
];

function createData(id, name, description) {
  return { id, name, description };
}

const rows = [
  createData(1, 'Penguin Random House', 'Printing your dreams',),
  createData(2, 'HarperCollins', 'You write, we publish',),
  createData(3, 'Simon & Schuster', 'Presenting your thoughts to the world',),
  createData(4, 'Hachette Book Group', 'Quality printing',),
  createData(5, 'Macmillan', 'Get your dreams inked',),
  createData(6, 'Scholastic', 'Fast and reliable',),
  createData(7, 'Disney Publishing Worldwide', 'Experts in the field',),
  createData(8, 'Houghton Mifflin Harcourt', 'One-stop for printing solutions',),
  createData(9, '	Workman', 'To make sales easier',),
  createData(10, 'Sterling', 'Printing your needs',),
  createData(11, 'John Wiley and Sons', 'Publishing better',),
  createData(12, 'Abrams', 'Motivating Community',),
  createData(13, 'Dover', 'A new Words for all',),
  createData(14, 'Candlewick', 'Printing is our Language',),
  createData(15, 'W.W. Norton', 'Writing for your Success',),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [activeDialog, setActiveDialog] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(30);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell align='center'
                    style={{ minWidth: 100 }}>Actions</TableCell>
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
                          <Button variant="contained" style={{ marginRight: 4 }} color="success" onClick={() => {
                            setActiveDialog('alert');
                          }}>
                            Accept
                          </Button>
                          <Button variant="contained" style={{ marginLeft: 4 }} color="error" onClick={() => {
                            setActiveDialog('form');
                          }}>
                            Reject
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
        <AlertDialog open={activeDialog === 'alert'} handleClose={() => {
          setActiveDialog(false);
          alert('It is being developed');
        }
        } />
        <FormDialog open={activeDialog === 'form'} handleClose={() => {
          setActiveDialog(false);
          alert('It is being developed');
        }} />
      </div>
    </div>
  );
}