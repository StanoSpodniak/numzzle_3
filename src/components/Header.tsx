import styles from "./Header.module.css";

function Header() {
    return (
        <div className={styles.headerContainer}>
            <a href="/">
                <h1 className={styles.title}>Numzzle</h1>
            </a>
        </div>
    );
}

export default Header;
