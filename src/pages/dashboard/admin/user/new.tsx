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
import LeftNav from '../leftNav';

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
<LeftNav />
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