import * as React from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Container, IconButton, Dialog, DialogActions, DialogContent, Button, TextField, DialogContentText, DialogTitle } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reducers/index'; // Import your root reducer type
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import '../../../Auth/dashboard.scss';
import LeftNav from '../leftNav';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

const Events = () => {
  //grid columns
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 300 },
    {
      field: 'name',
      headerName: 'Name',
      width: 203,
      editable: true,
    },
    {
      field: 'totalNumberAvailable',
      headerName: 'Total Number Available',
      width: 150,
      editable: true,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 150,
      editable: true,
    },
    {
      field: 'location',
      headerName: 'Location',
      width: 110,
      editable: true,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 290,
      renderCell: (params) => (
        <div>
          <IconButton onClick={handleMailClick} aria-label="Mail"  style={{ color: 'red' }}>
            <CheckCircleIcon />
          </IconButton>
          <IconButton onClick={() =>handleClickOpen(params.id)} aria-label="Mail"  style={{ color: 'red' }}>
            <EditIcon  />
          </IconButton>
          <IconButton onClick={() => handleDeleteClick(params.row.id)} aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        <Dialog
        open={opendialog}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Update Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <TextField
            autoFocus
            value={params.row.id}
           variant="outlined"
            InputProps={{
              readOnly: true, // Make the input read-only to prevent changes
            }}

            margin="dense"
            id="id"
            name="id"
            label="Id"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            onChange={handleChange}
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            error={Boolean(errors.name)}
            helperText={errors.name}
            fullWidth
            variant="standard"
          />
         <TextField
            autoFocus
            required
            onChange={handleChange}
            error={Boolean(errors.price)}
            helperText={errors.price}
            margin="dense"
            id="price"
            name="price"
            label="Price"
            type="text"
            fullWidth
            variant="standard"
          />
           <TextField
            autoFocus
            required
            onChange={handleChange}
            error={Boolean(errors.location)}
            helperText={errors.location}
            margin="dense"
            id="location"
            name="location"
            label="Location"
            type="text"
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
      ),
    },
  ];
  
  
  const handleMailClick = () => {
    // Handle the click event for the mail button
    console.log('Mail clicked');
  };

    const savedData = useSelector((state:RootState) =>state.authReducer);
    const [searchText, setSearchText] = React.useState('');
    const [eventid, setEventid] = React.useState('');
    const [loginresponse, setLoginresponse] = React.useState("");
    const [opendialog, setOpendialog] = React.useState(false);
    {typeof savedData.auth === 'string' ?  console.log("email",savedData.auth) : null}
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [formData, setFormData] = React.useState({
      id:"",
      name: '',
      price: '',
      location: ''
    });
  
    const [errors, setErrors] = React.useState({
      name: '',
      price: '',
      location: ''
    });
  
    const validateForm = () => {
      let valid = true;
      const newErrors = { ...errors };
      
      if (formData.name.trim() === '') {
        newErrors.name = 'Name is required';
        valid = false;
      } else {
        newErrors.name = '';
      }
      if (formData.price.trim() === '') {
        newErrors.price = 'Price is required';
        valid = false;
      } else {
        newErrors.price = '';
      }
     if (formData.location.trim() === '') {
        newErrors.location = 'Location is required';
        valid = false;
      } else {
        newErrors.location = '';
      }
      setErrors(newErrors);
      return valid;
    };
    const handleCancel = () => {
      //setOpen(false);
    };
      const handleDeleteClick = (id:any) => {
                 // Process the form data
      const loginReqResponse = axios.post("https://api.totalmoto.net/user/login", {
                  "email": "admin@admin.com",
                  "password": "admin@123"
                }).then(response => {
        // Handle the data from the response
         console.log(response.data.token)
         setLoginresponse(response.data.token)
        //console.log('Response Data:', response.data);
      })
         .catch(error => {
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
         console.log('loginResponse:', loginresponse)
        const config = {
                          headers: {
                            'Authorization': `Bearer ${loginresponse}`,
                             'Accept': ' */*',
                            // Other headers if needed
                          },
                        };

                        // Making a DELETE request
                        axios.post(`https://api.totalmoto.net/events/${id}`, config)
                          .then(response => {
                            // Handle the response
                            alert('Record deleted successfully:', response.data);
                          })
                          .catch(error => {
                            // Handle errors
                            console.error('Error deleting record:', error);
                          });
        // Handle delete action here
        console.log(`https://api.totalmoto.net/events/${id}`);
      };
    const handleSubmit = async (e:any) => {
      e.preventDefault();
      if (validateForm()) {
        // Process the form data
          const loginReqResponse =await axios.post("https://api.totalmoto.net/user/login", {
                  "email": "admin@admin.com",
                  "password": "admin@123"
                })
      .then(response => {
        // Handle the data from the response
         console.log(response.data.token)
         setLoginresponse(response.data.token)
        //console.log('Response Data:', response.data);
      })
         .catch(error => {
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
         console.log('loginResponse:', loginresponse)
        let reqheader=  {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+loginresponse
              }
            };
        const response =await axios.put("https://api.totalmoto.net/events/" + eventid, {
        "date": "2024-02-24",
        "name": "NEW JERSEY THUNDERBOLT",
        "totalNumberAvailable": {
          "novice": 5,
          "intermediate": 5,
          "experienced": 3,
          "advanced": 4
        },
        "price": 250,
        "location": "New Jersey, 8000 Dividing Creek Road, Millville, NJ"
      },reqheader)
        .then(response => {
        // Handle the data from the response
          console.log(response.data)
        //console.log('Response Data:', response.data);
         })
          .catch(error => {
      
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
       // console.log('API response:', response);
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


    const handleClickOpen = (id:any) => {
     setOpendialog(true);
     setEventid(id)
    };
    
    const handleClose = () => {
      setOpendialog(false);
    };
    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('https://api.totalmoto.net/events'); // Replace with your API endpoint
          const jsonArray:any =response.data
          const newArray = jsonArray.map((item:any) => {
            let roles;
            let totalNumberAvailable:any;
            const commaseparatedtotalNumberAvailable=  JSON.stringify(item.totalNumberAvailable);
            //const commaseparatedtotalNumberAvailable = totalNumberAvailable.join(', ');

            if(item.roles){
              roles=item.roles
              //roles = item.roles.join(', ')
            } else {
              roles="NaN"
            }
            // Create a new object with the modified key
            const newItem = { ...item, id: item._id,role:roles,totalNumberAvailable:commaseparatedtotalNumberAvailable };
            // Remove the old key
            delete newItem._id;
            delete item.totalNumberAvailable
           // delete newItem.roles;          
            return newItem;
          });         
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
    if (loading) {
      return <p>Loading...</p>;
    }
  return (
    <div>
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
          <div><i className="fas fa-calendar"></i>  <b>Events</b></div>
          </div>
          <div className="col-5">
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

  </div>
  </div>
);
}

export default Events;