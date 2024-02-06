import styles from "./more.module.scss";

const More = ({text}:{text: string})=>{

    return(
        <div className={styles.more_item} >
            <span>{text}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M0 3.88687H15L7.5 11.1131L0 3.88687Z" fill="white"/>
            </svg>
        </div>
    )
}

export default More;