import styles from './Merchandise.module.scss';
import shirtImage from '../../assets/shirt.png';
import Button from '@mui/material/Button';

const products = [
    {
        name: 'TSHIRT',
        price: 45,
    },
    {
        name: 'TSHIRT',
        price: 45,
    },
    {
        name: 'TSHIRT',
        price: 45,
    },
    {
        name: 'TSHIRT',
        price: 45,
    }
];

const Merchandise = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>OUR MERCHANDIS</h1>
            <div className={styles.content}>
                {
                    products.map((item, index) => (
                        <div key={index} className={styles.item}>
                            <img className={styles.itemimage} src={shirtImage} alt='shirt' />
                            <h2 className={styles.itemname}>{item.name}</h2>
                            <p className={styles.itemprice}>{`$${item.price}`}</p>
                            <Button className={styles.itembutton} variant='contained'>ADD TO CART</Button>
                        </div>
                    ))
                }
            </div>
            <Button className={styles.morebutton} variant='contained'>MORE ITEMS</Button>
        </div>
    )
}

export default Merchandise;