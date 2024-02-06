import styles from "./NavItem.module.scss";

const NavItem = ({link, text}: {link: string, text: string})=>{


    return(
        <a className={styles.nav_item}  href={link} >{text}</a>
    )
}

export default NavItem;