export function collectTieup(tieupGrid: grid) {
    let pattern: number[][] = []

    tieupGrid.forEach(row => {
        let patternRow: number[] = []
        row.forEach((cell, index) => {

            if (cell != '') {
                patternRow.push(index)
            }
        })
        pattern.push(patternRow)
    })
    return pattern
}