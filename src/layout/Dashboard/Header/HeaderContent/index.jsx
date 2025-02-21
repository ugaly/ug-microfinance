import { useMemo, useState } from 'react';

import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';

// project import
import Search from './Search';
import Message from './Message';
import Profile from './Profile';
import Localization from './Localization';
import Notification from './Notification';
import FullScreen from './FullScreen';
import Customization from './Customization';
import MobileSection from './MobileSection';
import MegaMenuSection from './MegaMenuSection';

import useConfig from 'hooks/useConfig';
import { MenuOrientation } from 'config';
import DrawerHeader from 'layout/Dashboard/Drawer/DrawerHeader';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  const { menuOrientation } = useConfig();

  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const localization = useMemo(() => <Localization />, []);

  const megaMenu = useMemo(() => <MegaMenuSection />, []);
  const { defaultOfficeId, setDefaultOfficeId } = useState('');


  return (
    <>
    
      {menuOrientation === MenuOrientation.HORIZONTAL && !downLG && <DrawerHeader open={true} />}
      
      {!downLG && <Search />}
      {/* {!downLG && megaMenu} */}
      {/* {!downLG && localization} */}

      <div>

        

      <FormControl size="small" sx={{ minWidth: 300 }}>
        <InputLabel>Chagua Tawi</InputLabel>
          <Select
                value={defaultOfficeId || ''}
                onChange={(e) => {
                  sessionStorage.setItem('defaultOfficeId', e.target.value);
                  setDefaultOfficeId(e.target.value);
                }}
                label="Chagua Tawi"
              >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="1">Product 1</MenuItem>
            <MenuItem value="2">Product 2</MenuItem>
          </Select>
        </FormControl>

        


      </div>
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}

      {/* <Notification /> */}
      {/* <Message /> */}
      {!downLG && <FullScreen />}
      {/* <Customization /> */}
      {!downLG && <Profile />}
      {downLG && <MobileSection />}
      
    </>
  );
}
