import styles from './btn.module.scss';
const SmallBtn = ({text, color, clicked}: {text: string, color: string, clicked: any})=>{

    return(
        <button onClick={clicked} className={styles.btn} style={{backgroundColor: color}} >
            {text}
        </button>
    )
}

export default SmallBtn;