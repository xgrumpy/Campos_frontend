import styles from './Footer.module.scss';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import LogoImage from '../../assets/logo-ride.jpg';

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.topcontainer}>
                <div className={styles.part1}>
                    <img src={LogoImage} alt="logo" />
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut scelerisque arcu. Maecenas nec libero quis nisl porttitor lobortis et nec velit.</p>
                    <div className={styles.buttonscontainer}>
                        <IconButton color="primary" aria-label="add to shopping cart">
                            <FacebookRoundedIcon />
                        </IconButton>
                        <IconButton color="primary" aria-label="add to shopping cart">
                            <ShareRoundedIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
            <div>
                <p>Copyright (c) Ridesmart 2007-2024 - All Rights Reserved.</p>
                <div>
                    <Button>Legal Info</Button>
                    <Button>Contact Us</Button>
                </div>
            </div>
        </div>
    )
}

export default Footer;