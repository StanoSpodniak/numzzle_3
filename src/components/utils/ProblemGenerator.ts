export const getMathProblem = (): {
    num1: number;
    num2: number;
    num3: number;
    operator1: string;
    operator2: string;
    result: number;
} => {
    const operators1 = ["+", "-", "*", "/"];
    const operators2 = ["+", "-", "*"];

    const operator1 = operators1[Math.floor(Math.random() * operators1.length)];
    const operator2 = operators2[Math.floor(Math.random() * operators2.length)];

    const num1 = Math.floor(Math.random() * 21);
    const num2 = Math.floor(Math.random() * 21);
    const num3 = Math.floor(Math.random() * 21);

    const result = eval(num1 + operator1 + num2 + operator2 + num3);

    return { num1, num2, num3, operator1, operator2, result };
};

export const shuffleArray = (array: number[]) => {
    return array.sort(() => Math.random() - 0.5);
};
