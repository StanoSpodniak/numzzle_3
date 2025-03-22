import styles from "./Game.module.css";
import { useState, useEffect } from "react";
import { getMathProblem, shuffleArray } from "./utils/ProblemGenerator";

//check Dev.to
//https://kadam.net/en/webmaster - ads
//add functionality check if solution is correct - handle check
//add give up functionality

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
    const [allNumbers, setAllNumbers] = useState<number[]>([]);

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    // Generate random math problem when the component is mounted
    useEffect(() => {
        const problems = [];
        const allNumbers = [];

        while (problems.length < 3) {
            const problem = getMathProblem();

            if (
                problem.result <= 20 &&
                problem.result > 0 &&
                Number.isInteger(problem.result)
            ) {
                problems.push(problem);
                allNumbers.push(problem.num1);
                allNumbers.push(problem.num2);
                allNumbers.push(problem.num3);
            }
        }

        setProblems(problems);
        console.log("Solution: " + allNumbers);

        const shuffledNumbers = shuffleArray(allNumbers);
        setAllNumbers(shuffledNumbers);
    }, []);

    const handleClick = (index: number) => {
        if (selectedIndex === null) {
            // If no number is selected, set the first one as selected
            setSelectedIndex(index);
        } else {
            // Swap the numbers when two indices are selected
            const newNumbers = [...allNumbers];
            const temp = newNumbers[selectedIndex];
            newNumbers[selectedIndex] = newNumbers[index];
            newNumbers[index] = temp;
            setAllNumbers(newNumbers);
            setSelectedIndex(null); // Reset selected index after swap
        }
    };

    const handleCheck = () => {
        let correct = true;

        const firstSolution = problems[0].result;
        const firstResult = eval(
            allNumbers[0] +
                problems[0].operator1 +
                allNumbers[1] +
                problems[0].operator2 +
                allNumbers[2]
        );

        const secondSolution = problems[1].result;
        const secondResult = eval(
            allNumbers[3] +
                problems[1].operator1 +
                allNumbers[4] +
                problems[1].operator2 +
                allNumbers[5]
        );

        const thirdSolution = problems[1].result;
        const thirdResult = eval(
            allNumbers[6] +
                problems[2].operator1 +
                allNumbers[7] +
                problems[2].operator2 +
                allNumbers[8]
        );

        if (
            firstResult === firstSolution ||
            secondResult === secondSolution ||
            thirdResult === thirdSolution
        ) {
            correct = true;
        } else {
            correct = false;
        }

        if (correct) {
            console.log(correct);
        } else {
            console.log(correct);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Numzzle</h1>
            <div className={styles.grid}>
                <button
                    key={0}
                    className={`${styles.numberButton} ${
                        selectedIndex === 0 ? styles.selected : ""
                    }`}
                    onClick={() => handleClick(0)}
                >
                    <p className={styles.buttonText}>{allNumbers[0]}</p>
                </button>
                <p className={styles.operator}>
                    {problems?.[0]?.operator1 ?? "Loading..."}
                </p>
                <button
                    key={1}
                    className={`${styles.numberButton} ${
                        selectedIndex === 1 ? styles.selected : ""
                    }`}
                    onClick={() => handleClick(1)}
                >
                    <p className={styles.buttonText}>{allNumbers[1]}</p>
                </button>
                <p className={styles.operator}>
                    {problems?.[0]?.operator2 ?? "Loading..."}
                </p>
                <button
                    key={2}
                    className={`${styles.numberButton} ${
                        selectedIndex === 2 ? styles.selected : ""
                    }`}
                    onClick={() => handleClick(2)}
                >
                    <p className={styles.buttonText}>{allNumbers[2]}</p>
                </button>
                <p className={styles.operator}>=</p>
                <p className={styles.operator}>{problems?.[0]?.result}</p>
            </div>
            <div className={styles.grid}>
                <button
                    key={3}
                    className={`${styles.numberButton} ${
                        selectedIndex === 3 ? styles.selected : ""
                    }`}
                    onClick={() => handleClick(3)}
                >
                    <p className={styles.buttonText}>{allNumbers[3]}</p>
                </button>
                <p className={styles.operator}>
                    {problems?.[1]?.operator1 ?? "Loading..."}
                </p>
                <button
                    key={4}
                    className={`${styles.numberButton} ${
                        selectedIndex === 4 ? styles.selected : ""
                    }`}
                    onClick={() => handleClick(4)}
                >
                    <p className={styles.buttonText}>{allNumbers[4]}</p>
                </button>
                <p className={styles.operator}>
                    {problems?.[1]?.operator2 ?? "Loading..."}
                </p>
                <button
                    key={5}
                    className={`${styles.numberButton} ${
                        selectedIndex === 5 ? styles.selected : ""
                    }`}
                    onClick={() => handleClick(5)}
                >
                    <p className={styles.buttonText}>{allNumbers[5]}</p>
                </button>
                <p className={styles.operator}>=</p>
                <p className={styles.operator}>{problems?.[1]?.result}</p>
            </div>
            <div className={styles.grid}>
                <button
                    key={6}
                    className={`${styles.numberButton} ${
                        selectedIndex === 6 ? styles.selected : ""
                    }`}
                    onClick={() => handleClick(6)}
                >
                    <p className={styles.buttonText}>{allNumbers[6]}</p>
                </button>
                <p className={styles.operator}>
                    {problems?.[2]?.operator1 ?? "Loading..."}
                </p>
                <button
                    key={7}
                    className={`${styles.numberButton} ${
                        selectedIndex === 7 ? styles.selected : ""
                    }`}
                    onClick={() => handleClick(7)}
                >
                    <p className={styles.buttonText}>{allNumbers[7]}</p>
                </button>
                <p className={styles.operator}>
                    {problems?.[2]?.operator2 ?? "Loading..."}
                </p>
                <button
                    key={8}
                    className={`${styles.numberButton} ${
                        selectedIndex === 8 ? styles.selected : ""
                    }`}
                    onClick={() => handleClick(8)}
                >
                    <p className={styles.buttonText}>{allNumbers[8]}</p>
                </button>
                <p className={styles.operator}>=</p>
                <p className={styles.operator}>{problems?.[2]?.result}</p>
            </div>
            <button onClick={() => handleCheck()}>Check</button>
            <h2>How to play?</h2>
            <p>Game instructions</p>
            <h2>About the Numzzle</h2>
            <p>Game description</p>
        </div>
    );
}

export default Game;
