//This function fills in a tieUpGrid from the tieup of a weaveObj
import { defaultColor } from '@/app/resources/constants/weaveDefaults'

export function readTieup(tieupGrid: grid, pattern: number[][] | [number[]]) {

    if (pattern == null || !(pattern.flat().length > 0)) {
        return tieupGrid
    }

    //Safeguarded to handle missmatch between used shafts and tieup
    pattern.forEach((row, index) => {
        if (row.length > 0) {
            row.forEach(cell => {
                if (typeof tieupGrid[index] !== 'undefined') {
                    tieupGrid[index][cell] = defaultColor
                }
            })
        }
    })

    return tieupGrid
}