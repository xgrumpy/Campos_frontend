import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from 'react-responsive-modal'
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { registerAction } from "../../redux/actions/authAction";

const theme = createTheme();

const Register = () => {
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [open, setOpen] = React.useState(false);
  // const [loading] = useAuthState(auth);
  const [registereEmail, setRegisteredEmail] = React.useState("");
  const [agreeStatus, setAgreeStatus] = React.useState<null | boolean>(null);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  // const userLogin = useSelector((state: any) => state.auth);
  // const { loginUser } = userLogin;

  const onOpenModal = () => setOpen(true)
  const onCloseModal = () => setOpen(false)

  // React.useEffect(() => {
  // if (loading) {
  //     <h1 style={{ fontSize: "50px" }}>Loading Please wait</h1>
  //     return;
  // }
  // else 
  // if (loginUser?.token && loginUser?.email) {
  //     navigate("/homepage");
  // }
  // }, [loginUser, loading]);
  // }, [loginUser]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      user_firstname: firstname,
      user_lastname: lastname,
      user_email: email,
      user_password: password
    }

    dispatch(registerAction(data));
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url("/assets/ride-iage.jpg")',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} className="px-5" component={Paper} elevation={6} square>
            <Box sx={{
              my: 8,
              mx: 17,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <div className="logo-left-box">
                <Link to="/" className="logo-box">
                  <img src="/assets/logo-ride.jpg" width="400px" alt='logo' style={{ borderRadius: '45px' }} />
                </Link>
              </div>
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              </Avatar>
              <Typography component="h1" variant="h5"> Sign Up </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="firstname"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  label="First Name"
                  autoComplete="off"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="lastname"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  label="Last Name"
                  autoComplete="off"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email Address"
                  autoComplete="off"
                  autoFocus
                />
                {/* <p style={{ color: "red", fontSize: "14px", marginTop: "0px" }}>{loginUser == "User does not Exist" ? " Email in not exist" : ""}</p> */}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  autoComplete="off"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  id="confirmPassword"
                  autoComplete="off"
                />
                <Button
                  type="submit"
                  fullWidth
                  // disabled={agreeStatus ? false : true}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Register
                </Button>
                <Grid container>
                  <Grid item>
                    <Link to="/login" variant="body2">
                      {"Do you have an account? Sign In"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
      <ToastContainer />
    </>
  );
}

export default Register;