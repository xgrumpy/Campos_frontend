import * as React from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Container, Link, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Snackbar } from '@mui/material';
import { RootState } from '../../redux/reducers/index'; // Import your root reducer type
import Box from '@mui/material/Box';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import LeftNav from '../dashboard/admin/leftNav';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import { Context } from "./Context";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { truncateSync } from 'fs';
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 260 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 175,
    editable: true,
  },
  {
    field: 'role',
    headerName: 'Role',
    width: 200,
    editable: true
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 250,
    renderCell: (params) => (
      <div>
        <IconButton onClick={handleMailClick} aria-label="Mail"  style={{ color: 'red' }}>
          <CheckCircleIcon />
        </IconButton>
        <IconButton onClick={handleMailClick} aria-label="Mail"  style={{ color: 'red' }}>
          <EditIcon  />
        </IconButton>
        <IconButton onClick={() => handleDeleteClick(params.row.id)} aria-label="Delete">
          <DeleteIcon />
        </IconButton>
      </div>
    ),
  }
];
const handleMailClick = () => {
  // Handle the click event for the mail button
  console.log('Mail clicked');
};
const handleDeleteClick = (id:any) => {
  // Handle delete action here
  console.log(`Delete clicked for ID: ${id}`);
};
const Dashboard = () => {
    const savedData = useSelector((state:RootState) =>state.authReducer);
    const [searchText, setSearchText] = React.useState('');
    const [opendialog, setOpendialog] = React.useState(false);
    const dialogRef = React.useRef<HTMLDivElement>(null); ;
    const [message, setMessage] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const [eventid, setEventid] = React.useState('');
    const [severity, setSeverity] = React.useState('');
    const [loginresponse, setLoginresponse] = React.useState("");
    {typeof savedData.auth === 'string' ?  console.log("email",savedData.auth) : null}
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [formData, setFormData] = React.useState({
      firstName:"",
      lastName: '',
      email: '',
      password: '',
      phone: '',
      role:''
    });
  
    const [errors, setErrors] = React.useState({
     firstName: '',
     lastName: '',
     email: '',
     password: '',
     phone:'',
     role:''
    });
      const buttonStyle = {
        background: '#283897', // Replace with your desired background style
        color: 'white', // Text color
      };
    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('https://api.totalmoto.net/user/search'); // Replace with your API endpoint
          const jsonArray:any =response.data
          const newArray = jsonArray.map((item:any) => {
            let roles;
            if(item.roles){
              roles=item.roles
              //roles = item.roles.join(', ')
            } else {
              roles="NaN"
            }
            // Create a new object with the modified key
            const newItem = { ...item, id: item._id,role:roles };
            // Remove the old key
            delete newItem._id;
            delete newItem.password;
            delete newItem.roles;
            delete newItem._v;

           // delete newItem.roles;          
            return newItem;
          });   
          console.log("newArray",newArray)      
          setData(newArray);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };  
      fetchData();
      {data.map(item => (
        console.log(item)
      ))}    
    }, []);
    const filteredData = data.filter((row) =>
    Object.values(row).some(
      (value) =>
        value && value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );
  // show modal
  //validations
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
      newErrors.lastName = 'Last name is required';
      valid = false;
    } else {
      newErrors.lastName = '';
    }
   if (formData.email.trim() === '') {
      newErrors.email = 'Email is required';
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
    if (formData.phone.trim() === '') {
      newErrors.phone = 'Phone is required';
      valid = false;
    } else {
      newErrors.phone = '';
    }
    if (formData.role.trim() === '') {
      newErrors.role = 'Role is required';
      valid = false;
    } else {
      newErrors.role = '';
    }
    setErrors(newErrors);
    return valid;
  };
  //HANDLE SUBMIT
  const handleSubmit = async (e:any) => {
    //alert(validateForm());
    if (validateForm()) {
      const data = formData
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
          setOpendialog(false);
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

  const handleClickOpen = () => {
    dialogRef.current && dialogRef.current.classList.add('show');
    setOpendialog(true);
   };
   
   const handleClose = () => {
     setOpen(false);
   };
 
  const handleCancel = () => {
    dialogRef.current && (dialogRef.current.className = dialogRef.current.className.replace(' show', ''));
    setOpendialog(false);

  };
    /*if (loading) {
      return <p>Loading...</p>;
    }*/
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
        severity={message=="success" ? "success" : "error"}      >
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
                  <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
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
              <div><i className="fas fa-user"></i>  <b>User Management </b></div>
              </div>
              <div className="col-7">
                <div><i className='fas fa-search'></i>
                <input
                className='custom-input'
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ marginBottom: 16 }}
              /></div>
              </div>
              <div className="col-2 col-sm-12 col-md-2">
                  <Button onClick={handleClickOpen} style={buttonStyle} variant="contained" color="primary">
                   + Add New User
                   </Button>
                   <Dialog
                    ref={dialogRef}
                        open={opendialog}
                        onClose={handleCancel}
                        PaperProps={{
                          component: 'form',
                          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries((formData as any).entries());
                            const email = formJson.email;
                            console.log(email);
                            handleCancel();
                          },
                        }}
                      >
                        <DialogTitle>New User</DialogTitle>
                        <DialogContent>                          
                          <DialogContentText>
                          </DialogContentText>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="firstName"
                            onChange={handleChange}
                            name="firstName"
                            label="First Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            error={Boolean(errors.lastName)}
                            helperText={errors.lastName}
                          />
                          <TextField
                            autoFocus
                            required
                            onChange={handleChange}
                            margin="dense"
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            type="text"
                            error={Boolean(errors.lastName)}
                            helperText={errors.lastName}
                            fullWidth
                            variant="standard"
                          />
                        <TextField
                            autoFocus
                            required
                            onChange={handleChange}
                            error={Boolean(errors.email)}
                            helperText={errors.email}
                            margin="dense"
                            id="email"
                            name="email"
                            label="Email"
                            type="text"
                            fullWidth
                            variant="standard"
                          />
                          <TextField
                            autoFocus
                            required
                            onChange={handleChange}
                            error={Boolean(errors.password)}
                            helperText={errors.password}
                            margin="dense"
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                            variant="standard"
                          />
                          <TextField
                            autoFocus
                            required
                            onChange={handleChange}
                            error={Boolean(errors.phone)}
                            helperText={errors.phone}
                            margin="dense"
                            id="phone"
                            name="phone"
                            label="Phone"
                            type="phone"
                            fullWidth
                            variant="standard"
                          />
                           <TextField
                            autoFocus
                            required
                            onChange={handleChange}
                            error={Boolean(errors.role)}
                            helperText={errors.role}
                            margin="dense"
                            id="role"
                            name="role"
                            label="Role"
                            type="role"
                            fullWidth
                            variant="standard"
                          />
                        </DialogContent>
                        <DialogActions> 
                          <Button className="custombuttonstyle" onClick={handleCancel}>Cancel</Button>
                          <Button className="custombuttonstyle" onClick={handleSubmit} type="submit">Save</Button>
                        </DialogActions>
                      </Dialog>
              </div>
            </div>
            <div className="row">
            <div className="col-12 col-sm-12 col-md-12">
              <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={filteredData}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
              />
            </Box>
            </div>

            </div>
          
          </div>
        </section>
      </div>
  {/*    <aside className="control-sidebar control-sidebar-dark">
      </aside>

      <footer className="main-footer">
        <strong>Copyright &copy; 2024 .</strong>
        All rights reserved.
        <div className="float-right d-none d-sm-inline-block">
          <b>Version</b> 3.1.0-pre
        </div>
      </footer>
   */}
      </div>
  </div>
);
}

export default Dashboard;