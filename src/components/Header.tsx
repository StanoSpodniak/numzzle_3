import styles from "./Header.module.css";

function Header() {
    return (
        <div className={styles.headerContainer}>
            <h1 className={styles.title}>Numzzle</h1>
        </div>
    );
}

export default Header;
