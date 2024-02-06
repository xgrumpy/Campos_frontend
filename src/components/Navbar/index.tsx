// import React from 'react';
// import { redirect } from "react-router-dom";
import logo from "../../assets/logo-ride.jpg";
import SmallBtn from "../buttons/smallBtn";
import NavItem from "./NavItem";
import styles from "./Navbar.module.scss";
import IconButton from '@mui/material/IconButton';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';

const Navbar = () => {
    return (
        <nav className={styles.nav} >
            <div className={styles.nav_links} >
                <img src={logo} alt="logo" className={styles.nav_logo} />
            </div>
            <div className={styles.navitem_container}>
                <NavItem link="" text="HOME" />
                <NavItem link="" text="SCHEDULE" />
                <NavItem link="" text="FAQ" />
                <NavItem link="" text="SHOP" />
                <NavItem link="" text="PARTNERS" />
                <NavItem link="" text="ABOUT" />
                <NavItem link="" text="CONTACT" />
                <div className={styles.icon_container}>
                    <IconButton size="large" color="secondary" aria-label="add to shopping cart">
                        <SearchIcon className={styles.icon} />
                    </IconButton>
                    <IconButton size="large" color="primary" aria-label="add to shopping cart">
                        <ShoppingCartOutlinedIcon className={styles.icon} />
                    </IconButton>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;