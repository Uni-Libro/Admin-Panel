import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 400,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export function FormDialog({
  handleClose,
  open,
}) {
  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={handleClose} maxWidth='sm'>
        <DialogTitle style={{ display: 'flex', textAlign: 'center', justifyContent: 'center' }}>User</DialogTitle>
        <DialogContent>
          <DialogContentText>

          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="name"
            fullWidth
            variant="standard"
            sx={{ marginBottom: '10px' }}
          /> <TextField
            autoFocus
            margin="dense"
            id="picture"
            label="Author picture"
            type="name"
            fullWidth
            variant="standard"
            sx={{ marginBottom: '10px' }}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>

  );
}