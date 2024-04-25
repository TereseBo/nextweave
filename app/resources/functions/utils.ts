export function getHighest(sequence: number[]) {
    let number = null
    if (sequence.length > 0) {
        number = Math.max(...sequence)+1;
    }
    return number
}