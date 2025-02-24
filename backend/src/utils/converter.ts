const romanNumeralMap: { [key: number]: string } = {
  1000: 'M',
  900: 'CM',
  500: 'D',
  400: 'CD',
  100: 'C',
  90: 'XC',
  50: 'L',
  40: 'XL',
  10: 'X',
  9: 'IX',
  5: 'V',
  4: 'IV',
  1: 'I'
}

export function convertToRoman(num: number): string {
  let result = ''
  for (let key of Object.keys(romanNumeralMap)
    .map(Number)
    .sort((a, b) => b - a)) {
    while (num >= key) {
      result += romanNumeralMap[key]
      num -= key
    }
  }
  return result
}