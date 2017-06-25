export const isInteger = num => {
  const parsedNum = parseInt(num, 10)

  if (
    num &&
    !isNaN(parsedNum) &&
    Number(num) === parsedNum &&
    num % 1 === 0
  ) {
    return true
  }

  return false
}

export const isFloat = num => {
  const parsedNum = parseFloat(num)

  if (
    num &&
    !isNaN(parsedNum) &&
    Number(num) === parsedNum &&
    num % 1 !== 0
  ) {
    return true
  }

  return false
}