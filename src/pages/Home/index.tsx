import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import AboutUs from "../../components/AboutUs";
import FAQ from "../../components/FAQ";
import Merchandise from "../../components/Merchandise";
import Footer from "../../components/Footer";
import CustomContent from "../../components/CustomContent";
import styles from "./home.module.scss";
import CustomCalendar from "../../components/CustomCalendar";
import Articles from "../../components/Articles";

const Home = () => {

    return (
        <>
            <section className={styles.hero} >
                <Header />
                <Navbar />
                <CustomContent />
                <div className={styles.redbar} />
                <AboutUs />
                <FAQ />
                <Merchandise />
                <div className={styles.bluebar} />
                {/* <Footer /> */}
            </section>
        </>
    )
}

export default Home;