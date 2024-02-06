import styles from './AboutUs.module.scss';
import Button from '@mui/material/Button';
import BikerImage from '../../assets/biker.png';

const AboutUs = () => {
    return (
        <div className={styles.container}>
            <img className={styles.image} src={BikerImage} alt='biker image' />
            <div className={styles.leftcontent}>
                <h1 className={styles.title}>RideSmart is a motorcycle<br />rider's school.</h1>
                <p className={styles.subtitle}>Nunc id turpis blandit ipsum porta ullamcorper et sed ligula. Fusce rhoncus sed ante <br />quis lacinia. Morbi eget ullamcorper arcu, non imperdiet tellus. Sed ex lectus, rutrum <br />at justo vel, faucibus commodo erat. In sit amet vehicula lectus. In condimentum velit <br />sed sodales ultrices. Suspendisse magna justo, luctus finibus leo et, molestie dapibus <br />nunc. Pellentesque tristique libero molestie sem porttitor posuere.</p>
                <Button className={styles.button} variant="contained">About Us</Button>
            </div>
        </div>
    )
}

export default AboutUs;