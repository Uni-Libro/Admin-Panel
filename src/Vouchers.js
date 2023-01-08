import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
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
import { createVoucher, deleteVoucher, getVouchers, updateVoucher } from './service/vouchers';
const columns = [
  { id: 'id', label: 'Voucher Id', minWidth: 50, align: 'center' },
  {
    id: 'code',
    label: 'Code',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'discount',
    label: 'Discount percentage',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'upTo',
    label: 'Up tp',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'validFrom',
    label: 'Active from',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'validTo',
    label: 'Active to',
    minWidth: 100,
    align: 'center',
  },
];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [activeDialog, setActiveDialog] = React.useState({ type: false });
  const [rowsPerPage, setRowsPerPage] = React.useState(30);
  const [data, setData] = useState({ count: 0, rows: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);
  const matches = useMediaQuery('(min-width:520px)');
  const onCreate = async (values) => {
    const finalDatas = {
      description: "",
      ...(activeDialog.data || {}),
      ...values,
    };

    try {
      const response = finalDatas.id
        ? await updateVoucher(finalDatas.id, finalDatas)
        : await createVoucher(finalDatas);
      const updatedData = response.data.data;
      setData((prev) => {
        const rows = prev.fillter((row) => row.id !== updatedData.id);
        return { ...prev, rows: [...rows, updatedData] };
      });
    } catch (err) {
      console.log(err.response.data.message);
      setError(err.response.data.message || true);
    }

    setOpen(false);
    setActiveDialog({});
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    loadData(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = async (row) => {
    if (activeDialog.data) {
      try {
        await deleteVoucher(activeDialog.data.id);
        setOpen(true);
      } catch {
        setError(true);
      }
    }
    setActiveDialog(false);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setError(false);
  };

  const loadData = async (newPage = page) => {
    setIsLoading(true);

    try {
      const response = await getVouchers(newPage, rowsPerPage);
      setData((prev) => {
        const updatedRows = [...prev.rows, ...response.data.data.rows];

        const uniqueRows = updatedRows.filter(
          (row, index, self) => index === self.findIndex((r) => r.id === row.id)
        );
        return {
          count: response.data.data.count,
          rows: uniqueRows,
        };
      });
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (isLoading) {
    return (
      <Grid container justifyContent="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );
  }

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
                {data.rows
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
                          <Button variant="contained" sx={{ marginRight: matches ? 1 : 0 }} color="error" onClick={() => {
                            setActiveDialog({ type: "delete", data: row });
                          }}>
                            Delete
                          </Button>
                          <Snackbar open={open || error} autoHideDuration={4000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity={error ? "error" : "success"} sx={{ width: '100%', boxShadow: 'none' }}>
                              {error
                                ? typeof error === "string"
                                  ? error
                                  : "Something Went Wrong"
                                : "Successfully deleted!"}
                            </Alert>
                          </Snackbar>
                          <Button variant="outlined" sx={{ marginLeft: matches ? 1 : 0, backgroundColor: '--bs-blue', marginTop: matches ? 0 : 1 }} onClick={() => {
                            setActiveDialog({ type: "form", data: row });
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
            count={data.count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <CollectionCreateForm
          open={activeDialog.type === 'form'}
          data={activeDialog.data}
          onCreate={onCreate}
          onCancel={() => {
            setActiveDialog({});
          }}
        />
        <DeleteModal
          open={activeDialog.type === 'delete'}
          onDelete={handleClick}
          onCancel={() => {
            setActiveDialog({});
          }}
        />
      </div>
      <Button variant="outlined" sx={{ marginLeft: '45%' }} endIcon={<AddIcon />} onClick={() => {
        setActiveDialog({ type: "form" });
      }}>Add
      </Button>
    </div>
  );
}