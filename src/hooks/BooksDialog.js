import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createTheme, ThemeProvider } from '@mui/material';

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
      <Dialog open={open} onClose={handleClose} maxWidth='sm' >
        <DialogTitle style={{ display: 'flex', textAlign: 'center', justifyContent: 'center' }}>Book</DialogTitle>
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
            id="authors"
            label="Authors"
            type="name"
            fullWidth
            variant="standard"
            sx={{ marginBottom: '10px' }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="categories"
            label="Categories"
            type="name"
            fullWidth
            variant="standard"
            sx={{ marginBottom: '10px' }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="picture"
            label="Book picture"
            type="name"
            fullWidth
            variant="standard"
            sx={{ marginBottom: '10px' }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="pdf"
            label="Book PDF"
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