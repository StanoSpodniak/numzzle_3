import styles from "./Game.module.css";
import { useState, useEffect } from "react";
import { getMathProblem } from "./utils/ProblemGenerator";

function Game() {
    const [problems, setProblems] = useState<
        Array<{
            num1: number;
            num2: number;
            num3: number;
            operator1: string;
            operator2: string;
            result: number;
        }>
    >([]);
    // Generate random math problem when the component is mounted
    useEffect(() => {
        const problems = [];

        while (problems.length < 3) {
            const problem = getMathProblem();

            if (
                problem.result <= 100 &&
                problem.result > 0 &&
                Number.isInteger(problem.result)
            ) {
                problems.push(problem);
            }
        }

        setProblems(problems);
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Numzzle</h1>
            <div className={styles.grid}>
                <button key={0} className={styles.gridItem}>
                    <p className={styles.buttonText}>{problems?.[0]?.num1}</p>
                </button>
                <p className={styles.operator}>
                    {problems?.[0]?.operator1 ?? "Loading..."}
                </p>
                <button key={1} className={styles.gridItem}>
                    <p className={styles.buttonText}>{problems?.[0]?.num2}</p>
                </button>
                <p className={styles.operator}>
                    {problems?.[0]?.operator2 ?? "Loading..."}
                </p>
                <button key={2} className={styles.gridItem}>
                    <p className={styles.buttonText}>{problems?.[0]?.num3}</p>
                </button>
                <p className={styles.operator}>=</p>
                <p className={styles.operator}>{problems?.[0]?.result}</p>
            </div>
            <div className={styles.grid}>
                <button key={2} className={styles.gridItem}>
                    <p className={styles.buttonText}>{problems?.[1]?.num1}</p>
                </button>
                <p className={styles.operator}>
                    {problems?.[1]?.operator1 ?? "Loading..."}
                </p>
                <button key={3} className={styles.gridItem}>
                    <p className={styles.buttonText}>{problems?.[1]?.num2}</p>
                </button>
                <p className={styles.operator}>
                    {problems?.[1]?.operator2 ?? "Loading..."}
                </p>
                <button key={4} className={styles.gridItem}>
                    <p className={styles.buttonText}>{problems?.[1]?.num3}</p>
                </button>
                <p className={styles.operator}>=</p>
                <p className={styles.operator}>{problems?.[1]?.result}</p>
            </div>
            <div className={styles.grid}>
                <button key={5} className={styles.gridItem}>
                    <p className={styles.buttonText}>{problems?.[2]?.num1}</p>
                </button>
                <p className={styles.operator}>
                    {problems?.[2]?.operator1 ?? "Loading..."}
                </p>
                <button key={6} className={styles.gridItem}>
                    <p className={styles.buttonText}>{problems?.[2]?.num2}</p>
                </button>
                <p className={styles.operator}>
                    {problems?.[2]?.operator2 ?? "Loading..."}
                </p>
                <button key={7} className={styles.gridItem}>
                    <p className={styles.buttonText}>{problems?.[2]?.num3}</p>
                </button>
                <p className={styles.operator}>=</p>
                <p className={styles.operator}>{problems?.[2]?.result}</p>
            </div>
        </div>
    );
}

export default Game;
