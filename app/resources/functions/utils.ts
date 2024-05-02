export function getHighest(sequence: number[]) {
    let number = null
    if (sequence.length > 0) {
        number = Math.max(...sequence)+1;
    }
    return number
}

//Function accepts a value and lower limits, returns the limit value if value is out of bounds
export function verifyMinValue(value: number, lowerLimit: number): number {

    let checkedValue = value
    if (value < lowerLimit) checkedValue = lowerLimit

    return checkedValue
}