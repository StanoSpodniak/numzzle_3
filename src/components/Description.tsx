import styles from "./Description.module.css";

function Description() {
    return (
        <div className={styles.descriptionContainer}>
            <h2>How to play?</h2>
            <p>
                Game instructions. Often there is more than one correct
                solution.
            </p>
            <h2>About the Numzzle</h2>
            <p>Game description. Hobby project.</p>
        </div>
    );
}

export default Description;
