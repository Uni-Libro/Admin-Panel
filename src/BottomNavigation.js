import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import './bottom_navigation.css'
import DeleteIcon from '@mui/icons-material/Delete';


export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <div className='bottom'>
      <BottomNavigation
        showLabels
        value={value}
        sx={{ width: "50%", backgroundColor: "black", borderRadius: 30 }}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Add" icon={<AddIcon />} sx={{
          "&.Mui-selected, .Mui-selected > svg": {
            color: "#ff3c78"
          },
          color: "white"
        }} />
        <BottomNavigationAction label="Delete" icon={<DeleteIcon />} sx={{
          "&.Mui-selected, .Mui-selected > svg": {
            color: "#ff3c78"
          },
          color: "white"
        }}
        />
        <BottomNavigationAction label="Edit" icon={<EditIcon />} sx={{
          "&.Mui-selected, .Mui-selected > svg": {
            color: "#ff3c78"
          },
          color: "white"
        }} />
      </BottomNavigation>
    </div>
  );
}