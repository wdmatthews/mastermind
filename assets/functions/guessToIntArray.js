export default function guessToIntArray(code) {
  const numbersStrings = code.split('')
  const numbers = []
  numbersStrings.forEach(numberString => numbers.push(parseInt(numberString) - 1))
  return numbers
}
