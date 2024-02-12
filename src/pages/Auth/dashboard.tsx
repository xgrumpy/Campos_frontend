import * as React from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Container, Link, Button, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/index'; // Import your root reducer type
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import LeftNav from '../dashboard/admin/leftNav';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';

import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
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
    width: 110,
    editable: true,
  },
  {
    field: 'role',
    headerName: 'Role',
    width: 200,
    editable: true
  },
  {
    field: '__v',
    headerName: '__v',
    width: 110,
    editable: true,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 200,
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
  },
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

    {typeof savedData.auth === 'string' ?  console.log("email",savedData.auth) : null}
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
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
              <div><i className="fas fa-user"></i>  <b>User Management</b></div>
              </div>
              <div className="col-7 col-sm-12 col-md-7">
                <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ marginBottom: 16 }}
              />
              </div>
              <div className="col-2 col-sm-12 col-md-2">
                <a href="/dashboard/user/new">
                  <Button style={buttonStyle} variant="contained" color="primary">
                    Add New User
                  </Button>
                </a>
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

export default Dashboard;