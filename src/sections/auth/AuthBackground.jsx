// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

// project-import
import { ThemeDirection, ThemeMode } from 'config';

// ==============================|| AUTH BLUR BACK SVG ||============================== //

const AuthBackground = () => (
  <svg
    width="100%"
    height="100vh"
    viewBox="50 0 1300 500"
    xmlns="http://www.w3.org/2000/svg"
    style={{ position: 'absolute', top: 0, left: 0, zIndex: -1,width: '160%', height: '100%' }}
  >
    <path fill="#A3A1FB" d="M0,396L180,340L360,359L540,403L720,347L900,343L900,601L720,601L540,601L360,601L180,601L0,601Z"/>
    <path fill="#6C63FF" d="M0,431L180,450L360,390L540,387L720,421L900,403L900,601L720,601L540,601L360,601L180,601L0,601Z"/>
    <path fill="#5650DE" d="M0,470L180,468L360,452L540,480L720,445L900,472L900,601L720,601L540,601L360,601L180,601L0,601Z"/>
    <path fill="#3D3ACD" d="M0,498L180,513L360,519L540,481L720,490L900,504L900,601L720,601L540,601L360,601L180,601L0,601Z"/>
    <path fill="#FF4081" d="M0,524L180,569L360,542L540,552L720,571L900,572L900,601L720,601L540,601L360,601L180,601L0,601Z"/>
  </svg>
);

export default AuthBackground;