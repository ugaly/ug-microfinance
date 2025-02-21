// import PropTypes from 'prop-types';
// import React from 'react';
// import { Link as RouterLink, useSearchParams } from 'react-router-dom';

// // material-ui
// import Button from '@mui/material/Button';
// import Checkbox from '@mui/material/Checkbox';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormHelperText from '@mui/material/FormHelperText';
// import Grid from '@mui/material/Grid';
// import Link from '@mui/material/Link';
// import InputAdornment from '@mui/material/InputAdornment';
// import InputLabel from '@mui/material/InputLabel';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';

// // third party
// import * as Yup from 'yup';
// import { Formik } from 'formik';
// import { preload } from 'swr';

// // project import
// import IconButton from 'components/@extended/IconButton';
// import AnimateButton from 'components/@extended/AnimateButton';

// import useAuth from 'hooks/useAuth';

// import { fetcher } from 'utils/axios';

// // assets
// import EyeOutlined from '@ant-design/icons/EyeOutlined';
// import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';

// // ============================|| JWT - LOGIN ||============================ //

// export default function AuthLogin({ isDemo = false }) {
//   const [checked, setChecked] = React.useState(false);

//   const { login } = useAuth();

//   const [showPassword, setShowPassword] = React.useState(false);
//   const handleClickShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   const [searchParams] = useSearchParams();
//   const auth = searchParams.get('auth'); // get auth and set route based on that

//   return (
//     <>
//       <Formik
//         initialValues={{
//           email: 'akuku',
//           password: '1234',
//           submit: null
//         }}
//         // validationSchema={Yup.object().shape({
//         //   email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
//         //   password: Yup.string()
//         //     .required('Password is required')
//         //     .test('no-leading-trailing-whitespace', 'Password cannot start or end with spaces', (value) => value === value.trim())
//         //     .max(10, 'Password must be less than 10 characters')
//         // })}
//         onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
//           try {
//             const trimmedEmail = values.email.trim();
//             await login(trimmedEmail, values.password);
//             setStatus({ success: true });
//             setSubmitting(false);
//             preload('api/menu/dashboard', fetcher); // load menu on login success
//           } catch (err) {
//             console.error(err);
//             setStatus({ success: false });
//             setErrors({ submit: err.message });
//             setSubmitting(false);
//           }
//         }}
//       >
//         {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
//           <form noValidate onSubmit={handleSubmit}>
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="email-login">Email Address</InputLabel>
//                   <OutlinedInput
//                     id="email-login"
//                     type="email"
//                     value={values.email}
//                     name="email"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     placeholder="Enter email address"
//                     fullWidth
//                     error={Boolean(touched.email && errors.email)}
//                   />
//                 </Stack>
//                 {touched.email && errors.email && (
//                   <FormHelperText error id="standard-weight-helper-text-email-login">
//                     {errors.email}
//                   </FormHelperText>
//                 )}
//               </Grid>
//               <Grid item xs={12}>
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="password-login">Password</InputLabel>
//                   <OutlinedInput
//                     fullWidth
//                     error={Boolean(touched.password && errors.password)}
//                     id="-password-login"
//                     type={showPassword ? 'text' : 'password'}
//                     value={values.password}
//                     name="password"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     endAdornment={
//                       <InputAdornment position="end">
//                         <IconButton
//                           aria-label="toggle password visibility"
//                           onClick={handleClickShowPassword}
//                           onMouseDown={handleMouseDownPassword}
//                           edge="end"
//                           color="secondary"
//                         >
//                           {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
//                         </IconButton>
//                       </InputAdornment>
//                     }
//                     placeholder="Enter password"
//                   />
//                 </Stack>
//                 {touched.password && errors.password && (
//                   <FormHelperText error id="standard-weight-helper-text-password-login">
//                     {errors.password}
//                   </FormHelperText>
//                 )}
//               </Grid>
//               <Grid item xs={12} sx={{ mt: -1 }}>
//                 <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={checked}
//                         onChange={(event) => setChecked(event.target.checked)}
//                         name="checked"
//                         color="primary"
//                         size="small"
//                       />
//                     }
//                     label={<Typography variant="h6">Keep me sign in</Typography>}
//                   />
//                   <Link
//                     variant="h6"
//                     component={RouterLink}
//                     to={isDemo ? '/auth/forgot-password' : auth ? `/${auth}/forgot-password?auth=jwt` : '/forgot-password'}
//                     color="text.primary"
//                   >
//                     Forgot Password?
//                   </Link>
//                 </Stack>
//               </Grid>
//               {errors.submit && (
//                 <Grid item xs={12}>
//                   <FormHelperText error>{errors.submit}</FormHelperText>
//                 </Grid>
//               )}
//               <Grid item xs={12}>
//                 <AnimateButton>
//                   <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
//                     Login
//                   </Button>
//                 </AnimateButton>
//               </Grid>
//             </Grid>
//           </form>
//         )}
//       </Formik>
//     </>
//   );
// }

// AuthLogin.propTypes = { isDemo: PropTypes.bool };











import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import QRCode from "react-qr-code";
import useAuth from 'hooks/useAuth';
import { WEBSOCKET_URL } from "Service/baseUrl";


// const WEBSOCKET_URL = "ws://172.20.10.6:9876/ws";


// const WEBSOCKET_URL = "ws://172.20.10.6:9876/ws";


const AuthLogin = () => {
  const [uuid, setUuid] = useState("");
  const [ws, setWs] = useState(null);
  const { login } = useAuth();

  useEffect(() => {
    // Generate a unique UUID for the QR code
    const generateUUID = () => Math.floor(Math.random() * 1000000000).toString();
    const newUuid = generateUUID();
    // setUuid(newUuid);

    // Connect to WebSocket room based on the UUID
    // const socket = new WebSocket(`${WEBSOCKET_URL}${newUuid}/`);
    const socket = new WebSocket(`${WEBSOCKET_URL}`);


    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received authentication data:", data);
      // setUuid(data.sessionId);

      if (!uuid && data.sessionId) {
        setUuid(data.sessionId);
        // socket.close();
        console.log("WebSocket connection closed after receiving sessionId.");
      }

      if (data.token) {

        sessionStorage.setItem("fistTime", "true");
        console.log("WebSocket connection closed after receiving token and token is: ", data.token);
        //alert(data.token);
        sessionStorage.setItem("serviceToken", data.token);
        window.location='/dashboard';
        //login(data.token, 'jwt');
        socket.close();

      }



    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bgcolor="background.paper"
      p={3}
    >
      <Typography variant="h4" gutterBottom>
        KopaKwetu Admin
      </Typography>
      <Typography variant="body1" sx={{ textAlign: "center" }} gutterBottom>
        Scan the QR code with your mobile to sign in.
      </Typography>
      <Box position="relative" display="inline-block" mt={2} mb={4}>
        <QRCode value={uuid} size={256} />
       
      </Box>
      <Typography variant="body2" mt={2} sx={{ textAlign: "center" }}>
        Developed by JZA Tech Limited
      </Typography>
    </Box>
  );
};

export default AuthLogin;
