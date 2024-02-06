import styles from './FAQ.module.scss';
import Button from '@mui/material/Button';
import TrackImage from '../../assets/track.png';
import PolicyImage from '../../assets/policy.png';
import RequirementImage from '../../assets/requirement.png';

const FAQ = () => {
    return (
        <div className={styles.container}>
            <div className={styles.topcontent}>
                <div className={styles.centercontent}>
                    <div className={styles.leftcontent}>
                        <h1 className={styles.title}>HAVE QUESTIONS?</h1>
                        <h2 className={styles.subtitle}>SEE IF THEY'RE ALREADY ANSWERED ON OUR FAQ PAGE</h2>
                    </div>
                    <Button className={styles.topbutton} variant="contained">FAQs</Button>
                </div>
            </div>
            <div className={styles.bottomcontent}>
                <div className={styles.content}>
                    <h3 className={styles.bigtitle}>SPECIFICATIONS</h3>
                    <div className={styles.itemcontent}>
                        <div className={styles.item}>
                            <img className={styles.itemimage} src={TrackImage} alt='Track Image' />
                            <h1 className={styles.itemtitle}>THE TRACKS</h1>
                            <p className={styles.itemsubtitle}>Donec faucibus eros eget facilisis pharetra</p>
                            <Button className={styles.itembutton} variant="contained">LEARN MORE</Button>
                        </div>
                        <div className={styles.item}>
                            <img className={styles.itemimage} src={PolicyImage} alt='Track Image' />
                            <h1 className={styles.itemtitle}>OUR POLICY</h1>
                            <p className={styles.itemsubtitle}>Donec faucibus eros eget facilisis pharetra</p>
                            <Button className={styles.itembutton} variant="contained">LEARN MORE</Button>
                        </div>
                        <div className={styles.item}>
                            <img className={styles.itemimage} src={RequirementImage} alt='Track Image' />
                            <h1 className={styles.itemtitle}>EVENT REQUIREMENTS</h1>
                            <p className={styles.itemsubtitle}>Donec faucibus eros eget facilisis pharetra</p>
                            <Button className={styles.itembutton} variant="contained">LEARN MORE</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FAQ;