import * as React from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/index'; // Import your root reducer type
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import './dashboard.scss';
import '../../assets/admin/plugins/fontawesome-free/css/all.min.css';
import '../../assets/admin/dist/css/adminlte.min.css';
import '../../assets/admin/dataTables.css';
import '../../assets/admin/plugins/jquery/jquery.min.js'; // Import the JavaScript file
import '../../assets/admin/plugins/bootstrap/js/bootstrap.bundle.min.js'; // Import the JavaScript file
import '../../assets/admin/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js'; // Import the JavaScript file
import '../../assets/admin/dist/js/adminlte.js'; // Import the JavaScript file
import '../../assets/admin/plugins/jquery-mousewheel/jquery.mousewheel.js'; // Import the JavaScript file
import '../../assets/admin/plugins/raphael/raphael.min.js'; // Import the JavaScript file
import '../../assets/admin/plugins/jquery-mapael/jquery.mapael.min.js'; // Import the JavaScript file
import '../../assets/admin/plugins/jquery-mapael/maps/usa_states.min.js'; // Import the JavaScript file
import '../../assets/admin/plugins/chart.js/Chart.min.js'; // Import the JavaScript file
import '../../assets/admin/dist/js/demo.js'; // Import the JavaScript file
import '../../assets/admin/dist/js/pages/dashboard2.js'; // Import the JavaScript file
import '../../assets/admin/dist/js/pages/dashboard2.js'; // Import the JavaScript file
import '../../assets/admin/dist/js/dataTables.js'; // Import the JavaScript file
import '../../assets/admin/dist/js/custom.js'; // Import the JavaScript file
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
    field: 'password',
    headerName: 'Password',
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
    width: 110,
    editable: true,
  }
];

const Dashboard = () => {
    const savedData = useSelector((state:RootState) =>state.authReducer);
    const [searchText, setSearchText] = React.useState('');

    {typeof savedData.auth === 'string' ?  console.log("email",savedData.auth) : null}
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
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
          <div><i className="fas fa-user"></i>  <b>User Management</b></div>
          </div>
          <div className="col-9 col-sm-12 col-md-9">
            <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: 16 }}
          />
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