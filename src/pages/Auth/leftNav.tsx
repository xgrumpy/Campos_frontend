// LeftSidebar.jsx
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import MailIcon from '@mui/icons-material/Mail';

import '../../Auth/dashboard.scss';
import '../../../assets/admin/plugins/fontawesome-free/css/all.min.css';
import '../../../assets/admin/dist/css/adminlte.min.css';
import '../../../assets/admin/dataTables.css';
import '../../../assets/admin/plugins/jquery/jquery.min.js'; // Import the JavaScript file
import '../../../assets/admin/plugins/bootstrap/js/bootstrap.bundle.min.js'; // Import the JavaScript file
import '../../../assets/admin/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js'; // Import the JavaScript file
import '../../../assets/admin/dist/js/adminlte.js'; // Import the JavaScript file
import '../../../assets/admin/plugins/jquery-mousewheel/jquery.mousewheel.js'; // Import the JavaScript file
import '../../../assets/admin/plugins/raphael/raphael.min.js'; // Import the JavaScript file
import '../../../assets/admin/plugins/jquery-mapael/jquery.mapael.min.js'; // Import the JavaScript file
import '../../../assets/admin/plugins/jquery-mapael/maps/usa_states.min.js'; // Import the JavaScript file
import '../../../assets/admin/plugins/chart.js/Chart.min.js'; // Import the JavaScript file
import '../../../assets/admin/dist/js/demo.js'; // Import the JavaScript file
import '../../../assets/admin/dist/js/pages/dashboard2.js'; // Import the JavaScript file
import '../../../assets/admin/dist/js/pages/dashboard2.js'; // Import the JavaScript file
import '../../../assets/admin/dist/js/dataTables.js'; // Import the JavaScript file
import '../../../assets/admin/dist/js/custom.js'; // Import the JavaScript file
const leftNav = () => {

    const handleTrashClick = () => {
        // Handle the click event for the "Trash" button
        console.log('Trash clicked');
    };
    return (
        <div>
            <nav className="main-header top-header navbar navbar-expand navbar-white navbar-light">
<ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <a href="/dashboard" className="nav-link">Home</a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <a href="/" className="nav-link">Schedule</a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <a href="/" className="nav-link">FAQ</a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <a href="/" className="nav-link">Shop</a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <a href="/" className="nav-link">Partners</a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <a href="/" className="nav-link">About</a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <a href="/" className="nav-link">Contact</a>
                    </li>



                </ul>

                <ul className="navbar-nav ml-auto">

                    <li className="nav-item dropdown row">
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
                    <img src="../../assets/logo-ride.jpg" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: ".8" }} />
                    <span className="brand-text font-weight-light">RideSmart</span>
                </a>
                <div className="sidebar">
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item menu-open">
                                <a href="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                                    <i className="nav-icon fas fa-users"></i>
                                    <p>
                                        Users
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item menu menu-open">
                                <a href="/dashboard/articles/list" className={`nav-link ${location.pathname === '/dashboard/articles/list' ? 'active' : ''}`}>
                                    <i className="nav-icon fas fa-newspaper"></i>
                                    <p>
                                        Articles
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item menu-open">
                                <a href="/dashboard/events/list" className={`nav-link ${location.pathname === '/dashboard/events/list' ? 'active' : ''}`}>

                                    <i className="nav-icon fas fa-calendar"></i>
                                    <p>
                                        Events
                                    </p>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </div>
    );
};

export default leftNav;
