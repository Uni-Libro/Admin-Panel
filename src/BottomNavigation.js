import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import "./bottom_navigation.css"

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='bottom'>
      <BottomNavigation sx={{ width: '70%', maxHeight: 250, background: 'black', borderRadius: 6 }} value={value} onChange={handleChange}>
        <BottomNavigationAction
          label="Recents"
          value="recents"
          sx={{ color: 'white' }}
          icon={<RestoreIcon />}
        />
        <BottomNavigationAction
          label="Favorites"
          value="favorites"
          sx={{ color: 'white' }}
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
          label="Nearby"
          value="nearby"
          sx={{ color: 'white' }}
          icon={<LocationOnIcon />}
        />
        <BottomNavigationAction label="Folder" value="folder" sx={{ color: 'white' }} icon={<FolderIcon />} />
      </BottomNavigation>
    </div>

  );
}