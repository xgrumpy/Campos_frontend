import React from 'react';
import Button from '@mui/material/Button';
import styles from './CustomContent.module.scss';

const CustomContent = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>THE WAIT IS OVER...</h1>
            <h2 className={styles.subtitle}>2024 SCHEDULE</h2>
            <p className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a velit<br />venenatis, egestas tortor quis, molestie ipsum.</p>
            <Button className={styles.button} variant="contained">Sign up Today</Button>
        </div>
    )
}

export default CustomContent;