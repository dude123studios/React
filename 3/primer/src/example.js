import oddOnly, * as o from "./sum";
import * as ops from "./operations";

const values = [10, 20, 30, 40];
const total = o.sumValues(values);
const odds = oddOnly(values);
console.log(`Total: ${total}, Odd Total: ${odds}`);
console.log(`Multiply: ${ops.multiply(values)}`);
console.log(`Subtract: ${ops.subtract(1000, values)}`);
