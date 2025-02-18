import { useState } from 'react';

// material-ui
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// assets
import AlignLeftOutlined from '@ant-design/icons/AlignLeftOutlined';
import AlignCenterOutlined from '@ant-design/icons/AlignCenterOutlined';
import AlignRightOutlined from '@ant-design/icons/AlignRightOutlined';
import UnorderedListOutlined from '@ant-design/icons/UnorderedListOutlined';

// ==============================|| TOGGLE BUTTON - COLOR ||============================== //

export default function ColorToggleButton() {
  const [alignment, setAlignment] = useState('left');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup color="primary" value={alignment} exclusive onChange={handleAlignment} aria-label="text alignment">
      <ToggleButton value="left" aria-label="left aligned">
        <AlignLeftOutlined />
      </ToggleButton>
      <ToggleButton value="center" aria-label="centered">
        <AlignCenterOutlined />
      </ToggleButton>
      <ToggleButton value="right" aria-label="right aligned">
        <AlignRightOutlined />
      </ToggleButton>
      <ToggleButton value="list" aria-label="list">
        <UnorderedListOutlined />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
