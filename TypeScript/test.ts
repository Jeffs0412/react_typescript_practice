function divideAnswer(numerator: number, dividend: number) : number {
    if (dividend === 0) {
        throw new Error("CANNOT BE DIVIDED BY ZERO.");
    } else {
        return numerator / dividend;
    }
}

try {
    const result = divideAnswer(2, 0);
    console.log(result);
} catch(error) {
    console.error('An error occurred', error.message);
}

