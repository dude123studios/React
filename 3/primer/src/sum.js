export function sumValues(values) {
    return values.reduce((total, value) => total + value, 0);
}

export default function sumOdd(values) {
    return sumValues(values.filter((item, index) => index % 2 === 0));
}
