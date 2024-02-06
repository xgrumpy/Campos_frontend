import React from 'react';
import styles from "./Header.module.scss";
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import EmailIcon from '@mui/icons-material/Email';
import MapIcon from '@mui/icons-material/Map';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Button from '@mui/material/Button';

const Header = () => {
    return (
        <div className={styles.container}>
            <div className={styles.headeritem_container}>
                <div className={styles.headeritem}>
                    <PhoneInTalkOutlinedIcon fontSize='small' />
                    <p>1-512-200-9532</p>
                </div>
                <div className={styles.headeritem}>
                    <EmailIcon fontSize='small' />
                    <p>contact@ridesmart.com</p>
                </div>
                <div className={styles.headeritem}>
                    <MapIcon fontSize='small' />
                    <p>PO Box 672 Crypress Texas 77410</p>
                </div>
            </div>
            <div className={styles.headerbutton_container}>
                <Button
                    onClick={() => { window.location.href = '/login' }}
                    className={styles.hearderbutton} startIcon={<AccountCircleIcon />}>
                    My Account
                </Button>
                <Button
                    onClick={() => { window.location.href = '/register' }}
                    className={styles.hearderbutton} startIcon={<PersonAddIcon />}>
                    Sign up
                </Button>
            </div>
        </div>
    )
}

export default Header;