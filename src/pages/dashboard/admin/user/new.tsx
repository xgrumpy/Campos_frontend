import * as React from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Container, InputLabel, Input, FormHelperText, TextField, Snackbar } from '@mui/material';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import MuiAlert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import '../../../Auth/dashboard.scss';
import '../../../../assets/admin/plugins/fontawesome-free/css/all.min.css';
import '../../../../assets/admin/dist/css/adminlte.min.css';
import '../../../../assets/admin/dataTables.css';
import '../../../../assets/admin/plugins/jquery/jquery.min.js'; // Import the JavaScript file
import '../../../../assets/admin/plugins/bootstrap/js/bootstrap.bundle.min.js'; // Import the JavaScript file
import '../../../../assets/admin/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js'; // Import the JavaScript file
import '../../../../assets/admin/dist/js/adminlte.js'; // Import the JavaScript file
import '../../../../assets/admin/plugins/jquery-mousewheel/jquery.mousewheel.js'; // Import the JavaScript file
import '../../../../assets/admin/plugins/raphael/raphael.min.js'; // Import the JavaScript file
import '../../../../assets/admin/plugins/jquery-mapael/jquery.mapael.min.js'; // Import the JavaScript file
import '../../../../assets/admin/plugins/jquery-mapael/maps/usa_states.min.js'; // Import the JavaScript file
import '../../../../assets/admin/plugins/chart.js/Chart.min.js'; // Import the JavaScript file
import '../../../../assets/admin/dist/js/demo.js'; // Import the JavaScript file
import '../../../../assets/admin/dist/js/pages/dashboard2.js'; // Import the JavaScript file
import '../../../../assets/admin/dist/js/pages/dashboard2.js'; // Import the JavaScript file
import '../../../../assets/admin/dist/js/dataTables.js'; // Import the JavaScript file
import '../../../../assets/admin/dist/js/custom.js'; // Import the JavaScript file
import axios from 'axios';
import { RootState } from '../../../../redux/reducers';
const New = () => {
    const savedData = useSelector((state:RootState) =>state.authReducer);
    const [searchText, setSearchText] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState('');
    const [message, setMessage] = React.useState('');
    {typeof savedData.auth === 'string' ?  console.log("email",savedData.auth) : null}
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [formData, setFormData] = React.useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role:""
    });
  
    const [errors, setErrors] = React.useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role:""
    });
  
    const validateForm = () => {
      let valid = true;
      const newErrors = { ...errors };
  
      if (formData.firstName.trim() === '') {
        newErrors.firstName = 'First Name is required';
        valid = false;
      } else {
        newErrors.firstName = '';
      }
      if (formData.lastName.trim() === '') {
        newErrors.lastName = 'Last Name is required';
        valid = false;
      } else {
        newErrors.lastName = '';
      }
  
      if (formData.email.trim() === '') {
        newErrors.email = 'Email is required';
        valid = false;
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = 'Invalid email format';
        valid = false;
      } else {
        newErrors.email = '';
      }
      if (formData.password.trim() === '') {
        newErrors.password = 'Password is required';
        valid = false;
      } else {
        newErrors.password = '';
      }
      if (formData.role.trim() === '') {
        newErrors.role = 'Password is required';
        valid = false;
      } else {
        newErrors.role = '';
      }
      setErrors(newErrors);
      return valid;
    };
    const handleClose = () => {
      setOpen(false);
    };

    const handleSubmit = async (e:any) => {
      e.preventDefault();
  
      if (validateForm()) {
        // Process the form data
        console.log('Form submitted:', formData);
        const response = await axios.post('https://api.totalmoto.net/user/register', formData).catch(error => {
          // Check if the error has a status of 500
          if (error.response && error.response.status === 500) {          
            setMessage("error");
            setSeverity("error");
            setOpen(true);
          } else {
            // Handle other types of errors
            console.error('Error:', error.message);
          }
        });
        if(response) {
          if(response.status==201 && response.statusText=='Created'){
            setMessage("success");
            setSeverity("success");
            setOpen(true);
          } else {
            setMessage("success");
            setSeverity("error");
            setOpen(true);
          }
        }
        console.log('API response:', response);
      } else {
        console.log('Form has errors. Please correct them.');
      }
    };
  
    const handleChange = (e:any) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };   
  return (
    <div>
    <Snackbar
      open={open}
      autoHideDuration={6000} // Adjust the duration as needed
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity={message=="success" ? "success" : "error"}
      >
        {message}
      </MuiAlert>
    </Snackbar>
<div className="wrapper">
  <nav className="main-header navbar navbar-expand navbar-white navbar-light">
    <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
      </li>
      <li className="nav-item d-none d-sm-inline-block">
        <a href="index3.html" className="nav-link">Home</a>
      </li>
      <li className="nav-item d-none d-sm-inline-block">
        <a href="#" className="nav-link">Contact</a>
      </li>
    </ul>

    <form className="form-inline ml-3">
      <div className="input-group input-group-sm">
        <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
        <div className="input-group-append">
          <button className="btn btn-navbar" type="submit">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
    </form>

    <ul className="navbar-nav ml-auto">
     
      <li className="nav-item dropdown">
        <a className="nav-link" data-toggle="dropdown" href="#">
        Alexander Pierce <span className="fas fa-user"></span>
        </a>
        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <span className="dropdown-item dropdown-header">My Account</span>
          <div className="dropdown-divider"></div>
          <a href="#" className="dropdown-item">
            <i className="fas fa-sign-out mr-2"></i> Logout
          </a>
          <div className="dropdown-divider"></div>
        </div>
      </li>
    </ul>
  </nav>

  <aside className="main-sidebar sidebar-dark-primary elevation-4">
    <a href="index3.html" className="brand-link">
      <img src="../../assets/logo-ride.jpg" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: ".8"}} />
      <span className="brand-text font-weight-light">RideSmart</span>
    </a>
    <div className="sidebar">  
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <li className="nav-item menu-open">
            <a href="#" className="nav-link active">
              <i className="nav-icon fas fa-users"></i>
              <p>
                Users
                <i className="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <a href="./index.html" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>New User</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="./index2.html" className="nav-link active">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Users List</p>
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-item menu">
            <a href="#" className="nav-link">
              <i className="nav-icon fas fa-newspaper"></i>
              <p>
                Articles
                <i className="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <a href="./index.html" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>New Article</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="./index2.html" className="nav-link active">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Articles List</p>
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <i className="nav-icon fas fa-calendar"></i>
              <p>
                Events
                <i className="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <a href="./index.html" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>New Event</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="./index2.html" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Events List</p>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </aside>

  <div className="content-wrapper">
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0">RideSmart Admin Panel</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active">RideSmart Admin Panel</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <section className="content user-panel">
      <div className="container-fluid">
        <div className='row'>
        <div className="col-3 col-sm-12 col-md-3">
          <div><i className="fas fa-user"></i>  <b>Add New User</b></div>
          </div>
         </div>
        <div className="row">
        <div className="col-12 col-sm-12 col-md-12">
              <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '400px', // Adjust the width as needed
                    margin: 'auto',
                    marginTop: '20px',
                  }}
                >
                  <TextField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName}
                  margin="normal"
                />
                  <TextField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName}
                    margin="normal"
                  />
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                    margin="normal"
                  />
                  <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                  margin="normal"
                />
                <TextField
                label="Roles"
                name="role"
                type="role"
                value={formData.role}
                onChange={handleChange}
                error={Boolean(errors.role)}
                helperText={errors.role}
                margin="normal"
              />


                  <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '20px' }}>
                    Submit
                  </Button>
                </Box>
        </div>

        </div>
      
      </div>
    </section>
  </div>
  <aside className="control-sidebar control-sidebar-dark">
  </aside>

  <footer className="main-footer">
    <strong>Copyright &copy; 2014-2020 <a href="https://adminlte.io">AdminLTE.io</a>.</strong>
    All rights reserved.
    <div className="float-right d-none d-sm-inline-block">
      <b>Version</b> 3.1.0-pre
    </div>
  </footer>
  </div>
  </div>
);
}

export default New;