import styles from "./Game.module.css";
import { useState, useEffect } from "react";
import { getMathProblem, shuffleArray } from "./utils/ProblemGenerator";

//check Dev.to
//https://kadam.net/en/webmaster - ads
//mobile phones optimalization

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

    const [buttons, setButtons] = useState([
        {
            id: 1,
            status: "neutral" as
                | "correct"
                | "incorrect"
                | "neutral"
                | "clicked",
        },
        {
            id: 2,
            status: "neutral" as
                | "correct"
                | "incorrect"
                | "neutral"
                | "clicked",
        },
        {
            id: 3,
            status: "neutral" as
                | "correct"
                | "incorrect"
                | "neutral"
                | "clicked",
        },
        {
            id: 4,
            status: "neutral" as
                | "correct"
                | "incorrect"
                | "neutral"
                | "clicked",
        },
        {
            id: 5,
            status: "neutral" as
                | "correct"
                | "incorrect"
                | "neutral"
                | "clicked",
        },
        {
            id: 6,
            status: "neutral" as
                | "correct"
                | "incorrect"
                | "neutral"
                | "clicked",
        },
        {
            id: 7,
            status: "neutral" as
                | "correct"
                | "incorrect"
                | "neutral"
                | "clicked",
        },
        {
            id: 8,
            status: "neutral" as
                | "correct"
                | "incorrect"
                | "neutral"
                | "clicked",
        },
        {
            id: 9,
            status: "neutral" as
                | "correct"
                | "incorrect"
                | "neutral"
                | "clicked",
        },
    ]);

    const [gameText, setGameText] = useState("");
    const [checkButtonText, setCheckButtonText] = useState("Check");

    const [isShowSolutionButtonVisible, setIsShowSolutionButtonVisible] =
        useState(true);
    const [isGiveUpConfirmationVisible, setIsGiveUpConfirmationVisible] =
        useState(false);
    const [isSolutionVisible, setIsSolutionVisible] = useState(false);

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
        if (gameText != "Correct!") {
            if (selectedIndex === null) {
                // If no number is selected, set the first one as selected
                setSelectedIndex(index);

                // Highlight selected number
                const newButtons = [...buttons];
                newButtons[index].status = "clicked";
                setButtons(newButtons);
            } else {
                // Swap the numbers when two indices are selected
                const newNumbers = [...allNumbers];
                const temp = newNumbers[selectedIndex];
                newNumbers[selectedIndex] = newNumbers[index];
                newNumbers[index] = temp;

                // Highlight second selected number
                const newButtons = [...buttons];
                newButtons[index].status = "clicked";
                setButtons(newButtons);

                setAllNumbers(newNumbers);

                // Reset selected index after swap
                setSelectedIndex(null);

                // Undo selected number highlight
                const resetButtons = [...buttons];
                setTimeout(() => {
                    resetButtons.forEach((button) => {
                        button.status = "neutral";
                    });
                    setButtons(resetButtons);
                }, 250);
            }
        }
    };

    const handleCheck = () => {
        if (checkButtonText === "Check") {
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

            const thirdSolution = problems[2].result;
            const thirdResult = eval(
                allNumbers[6] +
                    problems[2].operator1 +
                    allNumbers[7] +
                    problems[2].operator2 +
                    allNumbers[8]
            );

            const newButtons = [...buttons];

            if (firstResult === firstSolution) {
                newButtons[0].status = "correct";
                newButtons[1].status = "correct";
                newButtons[2].status = "correct";
            } else {
                newButtons[0].status = "incorrect";
                newButtons[1].status = "incorrect";
                newButtons[2].status = "incorrect";
            }

            if (secondResult === secondSolution) {
                newButtons[3].status = "correct";
                newButtons[4].status = "correct";
                newButtons[5].status = "correct";
            } else {
                newButtons[3].status = "incorrect";
                newButtons[4].status = "incorrect";
                newButtons[5].status = "incorrect";
            }

            if (thirdResult === thirdSolution) {
                newButtons[6].status = "correct";
                newButtons[7].status = "correct";
                newButtons[8].status = "correct";
            } else {
                newButtons[6].status = "incorrect";
                newButtons[7].status = "incorrect";
                newButtons[8].status = "incorrect";
            }

            setButtons(newButtons);

            if (
                firstResult === firstSolution &&
                secondResult === secondSolution &&
                thirdResult === thirdSolution
            ) {
                setGameText("Correct!");
                setCheckButtonText("New Game");
            } else {
                setTimeout(() => {
                    const resetButtons = [...newButtons];
                    resetButtons.forEach((button) => {
                        button.status = "neutral";
                    });
                    setButtons(resetButtons);
                }, 1000);
            }
        }

        setTimeout(() => {}, 1000);
        if (checkButtonText === "New Game") {
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    };

    const getButtonClass = (
        status: "correct" | "incorrect" | "neutral" | "clicked"
    ) => {
        if (status === "correct") return `${styles.button} ${styles.green}`;
        if (status === "incorrect") return `${styles.button} ${styles.red}`;
        if (status === "clicked") return `${styles.button} ${styles.black}`;
        return `${styles.button} ${styles.gray}`;
    };

    const handleGiveUp = () => {
        setIsShowSolutionButtonVisible(false);
        setIsGiveUpConfirmationVisible(true);
        setIsSolutionVisible(false);
    };

    const handleGiveUpConfirmation = () => {
        setIsShowSolutionButtonVisible(false);
        setIsGiveUpConfirmationVisible(false);
        setIsSolutionVisible(true);
        setCheckButtonText("New Game");
    };

    const handleGoBack = () => {
        setIsShowSolutionButtonVisible(true);
        setIsGiveUpConfirmationVisible(false);
        setIsSolutionVisible(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.gameTextContainer}>
                <h2 className={styles.gameText}>{gameText}</h2>
            </div>
            <div className={styles.grid}>
                <button
                    key={0}
                    className={getButtonClass(buttons[0].status)}
                    onClick={() => handleClick(0)}
                >
                    <p className={styles.buttonText}>{allNumbers[0]}</p>
                </button>
                <p className={styles.operator}>
                    {problems?.[0]?.operator1 ?? "Loading..."}
                </p>
                <button
                    key={1}
                    className={getButtonClass(buttons[1].status)}
                    onClick={() => handleClick(1)}
                >
                    <p className={styles.buttonText}>{allNumbers[1]}</p>
                </button>
                <p className={styles.operator}>
                    {problems?.[0]?.operator2 ?? "Loading..."}
                </p>
                <button
                    key={2}
                    className={getButtonClass(buttons[2].status)}
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
                    className={getButtonClass(buttons[3].status)}
                    onClick={() => handleClick(3)}
                >
                    <p className={styles.buttonText}>{allNumbers[3]}</p>
                </button>
                <p className={styles.operator}>
                    {problems?.[1]?.operator1 ?? "Loading..."}
                </p>
                <button
                    key={4}
                    className={getButtonClass(buttons[4].status)}
                    onClick={() => handleClick(4)}
                >
                    <p className={styles.buttonText}>{allNumbers[4]}</p>
                </button>
                <p className={styles.operator}>
                    {problems?.[1]?.operator2 ?? "Loading..."}
                </p>
                <button
                    key={5}
                    className={getButtonClass(buttons[5].status)}
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
                    className={getButtonClass(buttons[6].status)}
                    onClick={() => handleClick(6)}
                >
                    <p className={styles.buttonText}>{allNumbers[6]}</p>
                </button>
                <p className={styles.operator}>
                    {problems?.[2]?.operator1 ?? "Loading..."}
                </p>
                <button
                    key={7}
                    className={getButtonClass(buttons[7].status)}
                    onClick={() => handleClick(7)}
                >
                    <p className={styles.buttonText}>{allNumbers[7]}</p>
                </button>
                <p className={styles.operator}>
                    {problems?.[2]?.operator2 ?? "Loading..."}
                </p>
                <button
                    key={8}
                    className={getButtonClass(buttons[8].status)}
                    onClick={() => handleClick(8)}
                >
                    <p className={styles.buttonText}>{allNumbers[8]}</p>
                </button>
                <p className={styles.operator}>=</p>
                <p className={styles.operator}>{problems?.[2]?.result}</p>
            </div>
            <button
                className={styles.checkButton}
                onClick={() => handleCheck()}
            >
                {checkButtonText}
            </button>
            {isShowSolutionButtonVisible && (
                <div>
                    <button
                        className={styles.giveUpButton}
                        onClick={() => handleGiveUp()}
                    >
                        Show solution
                    </button>
                </div>
            )}
            {isGiveUpConfirmationVisible && (
                <div className={styles.solutionContainer}>
                    <p>Do you really want to show the solution?</p>
                    <button onClick={() => handleGiveUpConfirmation()}>
                        YES
                    </button>
                    <button onClick={() => handleGoBack()}>NO</button>
                </div>
            )}
            {isSolutionVisible && (
                <div>
                    {problems.map((problem, index) => (
                        <div key={index}>
                            <p>
                                {problem.num1} {problem.operator1}{" "}
                                {problem.num2} {problem.operator2}{" "}
                                {problem.num3} = {problem.result}
                            </p>
                        </div>
                    ))}
                </div>
            )}
            <h2>How to play?</h2>
            <p>Game instructions</p>
            <h2>About the Numzzle</h2>
            <p>Game description</p>
        </div>
    );
}

export default Game;
