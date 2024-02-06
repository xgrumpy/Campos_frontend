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

import { loginAction } from "../../redux/actions/authAction";

const theme = createTheme();

const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
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
            user_email: email,
            user_password: password
        }

        dispatch(loginAction(data));
        console.log(email + password);
    };

    const forgotPassword = () => {
        const data = { email: registereEmail }
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/Forgot_Password`, data)
            .then((data) => {
                alert(JSON.stringify(data.data.message))
                setOpen(false);
            })
            .catch((error) => alert(error))
    }

    // const signInWithGoogle = async (data: any, provider: string) => {
    //     try {
    //         // const config = {
    //         //     headers: {
    //         //         "Content-Type": "application/json",
    //         //     },
    //         // };

    //         console.log("data = ", data);
    //         console.log("provider = ", provider);

    //         // dispatch(SocialLogin(data));
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

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
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                            <div className="logo-left-box">
                                <Link to="/" className="logo-box">
                                    <img src="/assets/logo-ride.jpg" width="400px" alt='logo' style={{borderRadius: '45px'}} />
                                </Link>
                            </div>
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            </Avatar>
                            <Typography component="h1" variant="h5"> Sign in </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                                {/* <Link onClick={onOpenModal} variant="body2">
                                    Forgot password?
                                </Link>
                                <Modal
                                    open={open}
                                    onClose={onCloseModal}
                                    center
                                    classNames="w-75"
                                >
                                    <div className="p-4 ">
                                        <h5>Lost your password?</h5>
                                        <p>Please enter your registered email address. You will receive a link to create a new password via email..</p>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            type="email"
                                            id="email"
                                            value={registereEmail}
                                            onChange={(e) => setRegisteredEmail(e.target.value)}
                                            label="Email Address"
                                            autoComplete="off"
                                            autoFocus
                                        />
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                            onClick={forgotPassword}
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </Modal> */}
                                {/* <p style={{ color: "red", fontSize: "14px", marginTop: "0px" }}>{loginUser?.message == "Invalid Password" ? "Wrong Password" : ""}</p> */}
                                
                                <Button
                                    type="submit"
                                    fullWidth
                                    // disabled={agreeStatus ? false : true}
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Login
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link onClick={onOpenModal} variant="body2">
                                            Forgot password?
                                        </Link>
                                        <Modal
                                            open={open}
                                            onClose={onCloseModal}
                                            center
                                            className="w-75"
                                        >
                                            <div className="p-4 ">
                                                <h5>Lost your password?</h5>
                                                <p>Please enter your registered email address. You will receive a link to create a new password via email..</p>
                                                <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    type="email"
                                                    id="email"
                                                    value={registereEmail}
                                                    onChange={(e) => setRegisteredEmail(e.target.value)}
                                                    label="Email Address"
                                                    autoComplete="off"
                                                    autoFocus
                                                />
                                                <Button
                                                    type="submit"
                                                    fullWidth
                                                    variant="contained"
                                                    sx={{ mt: 3, mb: 2 }}
                                                    onClick={forgotPassword}
                                                >
                                                    Submit
                                                </Button>
                                            </div>
                                        </Modal>
                                    </Grid>
                                    <Grid item>
                                        <Link to="/register" variant="body2">
                                            {"Don't have an account? Sign Up"}
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

export default Login;