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
  createData('India', 'IN', 1324171354,),
  createData('China', 'CN', 1403500365,),
  createData('Italy', 'IT', 60483973,),
  createData('United States', 'US', 327167434,),
  createData('Canada', 'CA', 37602103,),
  createData('Australia', 'AU', 25475400,),
  createData('Germany', 'DE', 83019200,),
  createData('Ireland', 'IE', 4857000,),
  createData('Mexico', 'MX', 126577691,),
  createData('Japan', 'JP', 126317000,),
  createData('France', 'FR', 67022000,),
  createData('United Kingdom', 'GB', 67545757,),
  createData('Russia', 'RU', 146793744,),
  createData('Nigeria', 'NG', 200962417,),
  createData('Brazil', 'BR', 210147125,),
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
      <Paper sx={{ width: '70%', overflow: 'hidden' }} className='paper'>
        <TableContainer sx={{ maxHeight: 440 }} className='table-container'>
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
      <AlertDialog open={activeDialog === 'alert'} handleClose={() => setActiveDialog(false)} />
      <FormDialog open={activeDialog === 'form'} handleClose={() => setActiveDialog(false)} />
    </div>
  );
}